import express from 'express';
import { 
  createMessage, 
  getMessages, 
  deleteMessage, 
  updateMessage 
} from '../controllers/message.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createMessage);
router.get('/messages', getMessages);
router.delete('/delete/:messageId', verifyToken, deleteMessage);
router.put('/update/:messageId', verifyToken, updateMessage);

export default router;