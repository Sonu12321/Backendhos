import ErrorHandler from "../middleware/Error.js";
import { catchAsyncErrors } from "../middleware/asyncerror.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message, nic } = req.body;
    
    // Basic required fields check
    if (!firstName || !lastName || !email || !phone || !message || !nic) {
        return next(new ErrorHandler("Please fill all fields!", 400));
    }

    // Validate phone number (assuming it should be exactly 10 digits)
    if (phone.length !== 10 ) {
        return next(new ErrorHandler("Phone number should be exactly 10 digits.", 400));
    }

    // Validate NIC (assuming it should be exactly 13 characters)
    if (nic.length !== 13 ) {
        return next(new ErrorHandler("NIC should be exactly 13 digits.", 400));
    }

    // Create the message if all validations pass
    await Message.create({ firstName, lastName, email, phone, message, nic });

    // Respond with success message
    res.status(200).json({
        success: true,
        message: "Message Sent!",
    });
});


export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});
