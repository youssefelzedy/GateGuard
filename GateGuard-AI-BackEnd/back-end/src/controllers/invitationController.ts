import { Admin } from '../models/adminModel';
import IAdmin from '../interfaces/intAdmin';
import { Garage } from '../models/garageModel';
import IGarage from '../interfaces/intGarage';
import { Invitation } from '../models/invitaionModel';
import IInvitation from '../interfaces/intInvitation';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../utils/appError';
import sendEmail from '../utils/email';
import { User } from '../models/userModel';
import IUser from '../interfaces/intUser';
import { Request, Response, NextFunction } from 'express';
import { signToken } from './authController';
import { checkPrime } from 'crypto';

// Send an invitation to a new admin (Observer role)

const invitationController = {
  createInvitationForAdmin: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const garage: IGarage | null = await Garage.findById(req.user!.garage);
      if (!garage) return next(new AppError('Garage not found', 404));

      const { email } = req.body;
      if (!email)
        return next(new AppError('Please provide an email address', 400));

      const existingAdmin: IAdmin | null = await Admin.findOne({ email });
      if (existingAdmin)
        return next(
          new AppError('This email already belongs to an admin', 400),
        );

      const existingInvitation = await Invitation.findOne({
        email,
        garage: garage._id,
        accepted: false,
        expires: { $gt: new Date() },
      });

      if (existingInvitation)
        return next(new AppError('An invitation has already been sent', 400));

      const invitation = await Invitation.create({
        email,
        garage: garage._id,
        invitedBy: req.user!._id,
        type: 'admin', // Add this line
      });

      const invitationURL = `${req.protocol}://${req.get('host')}/api/v1/invitations/accept/${invitation.token}`;
      const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">GateGuard Invitation</h2>
        <p>Hello,</p>
        <p>You have been invited to join <strong>${garage.garageName}</strong> as an Observer admin.</p>
        <p>Please click the button below to accept the invitation:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${invitationURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Accept Invitation</a>
        </div>
        <p>This invitation link will expire in 7 days.</p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="background-color: #f7f7f7; padding: 10px; word-break: break-all;">${invitationURL}</p>
        <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
          &copy; ${new Date().getFullYear()} GateGuard. All rights reserved.
        </p>
      </div>
    `;

      try {
        await sendEmail({
          email: invitation.email,
          subject: `Invitation to join ${garage.garageName} as admin`,
          message: `You have been invited. Visit ${invitationURL} to accept the invitation.`,
          html: htmlMessage,
        });

        res.status(201).json({
          status: 'success',
          message: 'Invitation sent successfully',
          invitation: {
            email: invitation.email,
            garage: invitation.garage,
            invitationType: invitation.type,
            invitedBy: invitation.invitedBy,
            expires: invitation.expires,
          },
        });
      } catch (err) {
        await Invitation.findByIdAndDelete(invitation._id);
        return next(new AppError('Error sending the invitation email', 500));
      }
    },
  ),

  createInvitationForUser: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const garage: IGarage | null = await Garage.findById(req.user!.garage);
      if (!garage) return next(new AppError('Garage not found', 404));

      const { email } = req.body;
      if (!email)
        return next(new AppError('Please provide an email address', 400));

      const existingUser: IUser | null = await User.findOne({ email });
      if (existingUser)
        return next(new AppError('This email already belongs to a user', 400));

      const existingInvitation: IInvitation | null = await Invitation.findOne({
        email,
        garage: garage._id,
        accepted: false,
        expires: { $gt: new Date() },
      });

      if (existingInvitation)
        return next(new AppError('An invitation has already been sent', 400));

      const invitation: IInvitation = await Invitation.create({
        email,
        garage: garage._id,
        invitedBy: req.user!._id,
        type: 'user', // Add this line
      });
      const invitationURL = `${req.protocol}://${req.get('host')}/api/v1/invitations/accept/${invitation.token}`;
      const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">GateGuard Invitation</h2>
        <p>Hello,</p>
        <p>You have been invited to join <strong>${garage.garageName}</strong> as a user.</p>
        <p>Please click the button below to accept the invitation:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${invitationURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Accept Invitation</a>
        </div>
        <p>This invitation link will expire in 7 days.</p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="background-color: #f7f7f7; padding: 10px; word-break: break-all;">${invitationURL}</p>
        <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
          &copy; ${new Date().getFullYear()} GateGuard. All rights reserved.
        </p>
      </div>
    `;
      try {
        await sendEmail({
          email: invitation.email,
          subject: `Invitation to join ${garage.garageName} as user`,
          message: `You have been invited. Visit ${invitationURL} to accept the invitation.`,
          html: htmlMessage,
        });

        res.status(201).json({
          status: 'success',
          message: 'Invitation sent successfully',
          invitation: {
            email: invitation.email,
            garage: invitation.garage,
            invitationType: invitation.type,
            invitedBy: invitation.invitedBy,
            expires: invitation.expires,
          },
        });
      } catch (err) {
        await Invitation.findByIdAndDelete(invitation._id);
        return next(new AppError('Error sending the invitation email', 500));
      }
    },
  ),
  // maka a route or middleware to make the frontend get the details of the invitation based on the token
  checkInvitation: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { token } = req.params;
      // Find the invitation by token, ensuring it's valid and not expired
      const invitation = await Invitation.findOne({
        token,
        expires: { $gt: new Date() },
        accepted: false,
      });
      if (!invitation) {
        return next(new AppError('Invalid or expired invitation token', 400));
      }
      // Fetch the associated garage
      const garage = await Garage.findById(invitation.garage);
      if (!garage) {
        return next(new AppError('Associated garage not found', 404));
      }
      // Check if the user is already registered
      const existingUser = await User.findOne({ email: invitation.email });
      if (existingUser) {
        return next(
          new AppError('This email is already registered as a user', 400),
        );
      }
      // Check if the admin is already registered
      const existingAdmin = await Admin.findOne({ email: invitation.email });
      if (existingAdmin) {
        return next(
          new AppError('This email is already registered as an admin', 400),
        );
      }

      // Send back the data of the invitation
      res.status(200).json({
        status: 'success',
        data: {
          email: invitation.email,
          garage: garage,
          type: invitation.type,
          expires: invitation.expires,
        },
      });
    },
  ),

  acceptInvitation: expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { token } = req.params;

      // Find the invitation by token, ensuring it's valid and not expired
      const invitation = await Invitation.findOne({
        token,
        expires: { $gt: new Date() },
        accepted: false,
      });

      if (!invitation) {
        return next(new AppError('Invalid or expired invitation token', 400));
      }

      // Fetch the associated garage
      const garage = await Garage.findById(invitation.garage);
      if (!garage) {
        return next(new AppError('Associated garage not found', 404));
      }

      // Check if we need to create a user or an admin based on invitation type
      if (invitation.type === 'user') {
        // For user invitations
        const { name, phoneNumber, nationalSecurityNumber, carPlate } =
          req.body;

        // Validate required fields for user registration
        if (!name || !phoneNumber || !nationalSecurityNumber || !carPlate) {
          return next(
            new AppError('Please provide all required user information', 400),
          );
        }

        // Check if this email is already registered
        const existingUser = await User.findOne({ email: invitation.email });
        if (existingUser) {
          return next(new AppError('This email is already registered', 400));
        }

        // Check if the car plate is already in use
        const existingCarPlate = await User.findOne({ carPlate });
        if (existingCarPlate) {
          return next(
            new AppError('This car plate is already registered', 400),
          );
        }

        // Create the new user
        const newUser = await User.create({
          name,
          email: invitation.email,
          phoneNumber,
          nationalSecurityNumber,
          garage: invitation.garage,
          carPlate,
        });

        // Mark invitation as accepted
        invitation.accepted = true;
        await invitation.save();

        res.status(201).json({
          status: 'success',
          message: 'User Added successfully',
          data: {
            user: {
              name: newUser.name,
              email: newUser.email,
              carPlate: newUser.carPlate,
              garage: garage.garageName,
            },
          },
        });
        return;
      } else if (invitation.type === 'admin') {
        // For admin invitations
        const {
          name,
          password,
          passwordConfirm,
          phoneNumber,
          nationalSecurityNumber,
        } = req.body;

        // Validate required fields for admin registration
        if (
          !name ||
          !password ||
          !passwordConfirm ||
          !phoneNumber ||
          !nationalSecurityNumber
        ) {
          return next(
            new AppError('Please provide all required admin information', 400),
          );
        }

        // Check if this email is already registered
        const existingAdmin = await Admin.findOne({ email: invitation.email });
        if (existingAdmin) {
          return next(new AppError('This email is already registered', 400));
        }

        // Create the new admin with Observer role
        const newAdmin = await Admin.create({
          name,
          email: invitation.email,
          password,
          passwordConfirm,
          phoneNumber,
          nationalSecurityNumber,
          role: 'Observer', // Default role for invited admins
          garage: invitation.garage,
        });

        // Mark invitation as accepted
        invitation.accepted = true;
        await invitation.save();

        // Generate authentication token for newly created admin
        const token = signToken(newAdmin._id.toString());

        res.status(201).json({
          status: 'success',
          message: 'Admin account created successfully',
          token,
          data: {
            user: {
              name: newAdmin.name,
              email: newAdmin.email,
              role: newAdmin.role,
              garage: garage.garageName,
            },
          },
        });
        return;
      } else {
        return next(new AppError('Invalid invitation type', 400));
      }
    },
  ),

  getInvitations: expressAsyncHandler(async (req: Request, res: Response) => {
    const invitations: IInvitation[] = await Invitation.find();
    res.status(200).json({
      status: 'success',
      data: {
        data: invitations,
      },
    });
  }),
};

export default invitationController;
