import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";

export const createMessage = async (req, res, next) => {
  try {
    const { content, postId } = req.body;
    const userId = req.user.id;

    if (!content.trim()) {
      return next(errorHandler(400, "Message content cannot be empty"));
    }
    if (content.length > 500) {
      return next(
        errorHandler(400, "Message content cannot exceed 500 characters")
      );
    }

    const newMessage = new Message({
      content,
      postId,
      userId,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getPostMessages = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const messages = await Message.find({ postId })
      .sort({ createdAt: -1 })
      .populate("userId", "username profilePicture");

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const likeMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findById(messageId);
    if (!message) return next(errorHandler(404, "Message not found"));

    const userIndex = message.likes.indexOf(userId);
    if (userIndex === -1) {
      message.likes.push(userId);
      message.numberOfLikes += 1;
    } else {
      message.likes.splice(userIndex, 1);
      message.numberOfLikes -= 1;
    }

    await message.save();
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const editMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content.trim()) {
      return next(errorHandler(400, "Message content cannot be empty"));
    }
    if (content.length > 500) {
      return next(
        errorHandler(400, "Message content cannot exceed 500 characters")
      );
    }

    const message = await Message.findById(messageId);
    if (!message) return next(errorHandler(404, "Message not found"));

    if (message.userId.toString() !== userId) {
      return next(
        errorHandler(403, "You are not allowed to edit this message")
      );
    }

    message.content = content;
    await message.save();

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findById(messageId);
    if (!message) return next(errorHandler(404, "Message not found"));

    if (message.userId.toString() !== userId) {
      return next(
        errorHandler(403, "You are not allowed to delete this message")
      );
    }

    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: "Message has been deleted" });
  } catch (error) {
    next(error);
  }
};
