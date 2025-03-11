const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Garage = require('../models/Garage');
const Invitation = require('../models/Invitation');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const { signToken } = require('./authController');

// Send an invitation to a new admin (Observer role)
exports.createInvitation = catchAsync(async (req, res, next) => {
  // 1. Check if the current user is an Owner
  // if (req.user.role !== 'Owner') {
  //   return next(
  //     new AppError('Only garage owners can invite other admins', 403),
  //   );
  // }

  // 2. Get the garage of the current admin
  const garage = await Garage.findById(req.user.garage);
  if (!garage) {
    return next(new AppError('Garage not found', 404));
  }

  // 3. Check if email is provided
  const { email } = req.body;
  if (!email) {
    return next(new AppError('Please provide an email address', 400));
  }

  // 4. Check if the email already exists as an admin
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) { 
    return next(new AppError('This email already belongs to an admin', 400));
  }

  // 5. Check if an invitation already exists for this email and garage
  const existingInvitation = await Invitation.findOne({
    email,
    garage: garage._id,
    accepted: false,
    expires: { $gt: Date.now() },
  });

  if (existingInvitation) {
    return next(
      new AppError('An invitation has already been sent to this email', 400),
    );
  }

  // 6. Create a new invitation
  const invitation = await Invitation.create({
    email,
    garage: garage._id,
    invitedBy: req.user._id,
  });

  // 7. Send an email with the invitation link
  const invitationURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/invitations/accept/${invitation.token}`;

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
      message: `You have been invited to join ${garage.garageName} as an Observer admin. Please visit ${invitationURL} to accept the invitation. This link will expire in 7 days.`,
      html: htmlMessage,
    });

    res.status(201).json({
      status: 'success',
      message: 'Invitation sent successfully',
      data: {
        invitation: {
          id: invitation._id,
          email: invitation.email,
          expires: invitation.expires,
        },
      },
    });
  } catch (err) {
    // If sending email fails, delete the created invitation
    await Invitation.findByIdAndDelete(invitation._id);
    return next(
      new AppError('There was an error sending the invitation email', 500),
    );
  }
});

// Get all invitations for the garage of the current admin
exports.getInvitations = catchAsync(async (req, res, next) => {
  // 1. Get the garage of the current admin
  const garage = req.user.garage;

  // 2. Get all invitations for this garage
  const invitations = await Invitation.find({ garage })
    .populate('invitedBy', 'name email')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: invitations.length,
    data: {
      invitations,
    },
  });
});

// Accept an invitation and create a new admin with Observer role
exports.acceptInvitation = catchAsync(async (req, res, next) => {
  // 1. Get token from the URL
  const { token } = req.params;

  // 2. Find the invitation by token
  const invitation = await Invitation.findOne({
    token,
    accepted: false,
    expires: { $gt: Date.now() },
  }).populate('garage');

  if (!invitation) {
    return next(new AppError('Invalid or expired invitation token', 400));
  }

  // 3. Check if all required fields are provided
  const {
    name,
    password,
    passwordConfirm,
    phoneNumber,
    nationalSecurityNumber,
  } = req.body;

  if (
    !name ||
    !password ||
    !passwordConfirm ||
    !phoneNumber ||
    !nationalSecurityNumber
  ) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // 4. Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 5. Create a new admin with Observer role
    const admin = await Admin.create(
      [
        {
          name,
          email: invitation.email,
          password,
          passwordConfirm,
          phoneNumber,
          nationalSecurityNumber,
          role: 'Observer',
          garage: invitation.garage._id,
        },
      ],
      { session },
    );

    // 6. Mark the invitation as accepted
    invitation.accepted = true;
    await invitation.save({ session });

    // 7. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // 8. Generate a token and send response
    const token = signToken(admin[0]._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        admin: admin[0],
      },
    });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();

    // Check for duplicate key error
    if (error.code === 11000) {
      return next(
        new AppError(
          'This email or national security number is already registered',
          400,
        ),
      );
    }

    return next(error);
  }
});

// Delete an invitation (cancel)
exports.deleteInvitation = catchAsync(async (req, res, next) => {
  // 1. Check if the current user is an Owner
  if (req.user.role !== 'Owner') {
    return next(new AppError('Only garage owners can cancel invitations', 403));
  }

  // 2. Get the invitation
  const invitation = await Invitation.findById(req.params.id);

  if (!invitation) {
    return next(new AppError('Invitation not found', 404));
  }

  // 3. Check if the invitation belongs to the garage of the current admin
  if (invitation.garage.toString() !== req.user.garage.toString()) {
    return next(
      new AppError('You can only cancel invitations for your garage', 403),
    );
  }

  // 4. Delete the invitation
  await Invitation.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
