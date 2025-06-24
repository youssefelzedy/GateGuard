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
        type: 'admin',
      });

      // https://localhost:5173/inviteUser/:token
      const invitationURL = `https://gateguard.me/invite-admin/${invitation.token}`;
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
      const invitationURL = `https://gateguard.me:5173/invite-user/${invitation.token}`;
      const htmlMessage = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GateGuard Invitation</title>
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");
            body {
                background: #f8fafc;
                margin: 0;
                padding: 0;
            }
            .gg-card {
                font-family: "Poppins", Arial, sans-serif;
                max-width: 480px;
                margin: 32px auto;
                background: #fff;
                border-radius: 18px;
                border: 1px solid #e5e7eb;
                box-shadow: 0 4px 24px rgba(30, 41, 59, 0.07);
                overflow: hidden;
            }
            .gg-header {
                background: linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%);
                padding: 32px 0 20px 0;
                text-align: center;
            }
            .gg-header img {
                height: 80px;
                margin-bottom: 10px;
            }
            .gg-header h2 {
                color: #fff;
                font-size: 1.6rem;
                font-weight: 700;
                margin: 0;
                letter-spacing: 0.01em;
            }
            .gg-content {
                padding: 28px 28px 18px 28px;
            }
            .gg-content p {
                color: #334155;
                font-size: 1.05rem;
                margin: 0 0 14px 0;
            }
            .gg-content strong {
                color: #2563eb;
                font-weight: 600;
            }
            .gg-content .role {
                color: #0ea5e9;
                font-weight: 500;
            }
            .gg-btn-wrap {
                text-align: center;
                margin: 30px 0;
            }
            .gg-btn {
                display: inline-block;
                background: linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%);
                color: #fff;
                padding: 13px 36px;
                border-radius: 7px;
                font-weight: 600;
                font-size: 1.08rem;
                text-decoration: none;
                box-shadow: 0 2px 8px rgba(16, 30, 54, 0.1);
                letter-spacing: 0.01em;
                transition: background 0.2s;
            }
            .gg-note {
                color: #64748b;
                font-size: 0.98rem;
                margin-bottom: 8px;
            }
            .gg-url {
                background: #f1f5f9;
                color: #2563eb;
                padding: 12px;
                border-radius: 6px;
                font-size: 0.93rem;
                word-break: break-all;
                margin-bottom: 18px;
            }
            .gg-footer {
                font-size: 0.85rem;
                color: #94a3b8;
                margin-top: 32px;
                text-align: center;
                padding-bottom: 18px;
            }
        </style>
    </head>
    <body>
        <div class="gg-card">
            <div class="gg-header">
                <img
                    src="https://gateguard.me/Logo_light.svg"
                    alt="GateGuard Logo" />
                <h2>GateGuard Invitation</h2>
            </div>
            <div class="gg-content">
                <p>Hello,</p>
                <p>
                    You have been invited to join
                    <strong>${garage.garageName}</strong>
                    as a
                    <span class="role">User</span>
                    .
                </p>
                <p>Please click the button below to accept the invitation:</p>
                <div class="gg-btn-wrap">
                    <a href="${invitationURL}" class="gg-btn">
                        Accept Invitation
                    </a>
                </div>
                <p class="gg-note">
                    This invitation link will expire in
                    <strong>7 days</strong>
                    .
                </p>
                <p>
                    If the button doesn't work, copy and paste this URL into
                    your browser:
                </p>
                <div class="gg-url">${invitationURL}</div>
                <div class="gg-footer">
                    &copy; ${new Date().getFullYear()} GateGuard. All rights
                    reserved.
                </div>
            </div>
        </div>
    </body>
</html>

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
