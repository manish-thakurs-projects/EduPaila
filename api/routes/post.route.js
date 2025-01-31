import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost, upload } from '../controllers/post.controller.js';

const router = express.Router();

// Apply upload middleware to routes that need file handling
router.post('/create', verifyToken, upload, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, upload, updatepost);

export default router;