import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const createMessage = async (req, res, next) => {
  console.log('Create message request received');
  try {
    console.log('Authenticated User:', req.user);
    const { content } = req.body;
    
    if (!content) {
      return next(errorHandler(400, 'Message content is required'));
    }

    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const newMessage = new Message({
      content,
      user: req.user.id,
    });

    console.log('New message before save:', newMessage);

    const savedMessage = await newMessage.save();
    console.log('Message saved to DB:', savedMessage);

    const populatedMessage = await savedMessage.populate('user', 'username profilePicture');
    console.log('Populated message:', populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Create message error:', error);
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await Message.find()
      .populate('user', 'username profilePicture')
      .sort({ createdAt: 1 }) // Changed to ascending order for chronological loading
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Message.countDocuments();
    
    res.status(200).json({
      messages,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMessages: total
    });
  } catch (error) {
    next(error);
  }
};
// message.controller.js (update deleteMessage)
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);
    
    if (!message) {
      return next(errorHandler(404, 'Message not found'));
    }

    // Allow deletion if user is owner or admin
    if (!message.user.equals(req.user.id) && !req.user.isAdmin) {
      return next(errorHandler(403, 'Unauthorized to delete this message'));
    }

    await Message.findByIdAndDelete(req.params.messageId);
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add to message.controller.js
export const updateMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);
    
    if (!message) {
      return next(errorHandler(404, 'Message not found'));
    }

    if (!message.user.equals(req.user.id)) {
      return next(errorHandler(403, 'Unauthorized to edit this message'));
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.messageId,
      { content: req.body.content },
      { new: true, runValidators: true }
    ).populate('user', 'username profilePicture');

    res.status(200).json(updatedMessage);
  } catch (error) {
    next(error);
  }
};

