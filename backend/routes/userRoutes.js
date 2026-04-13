import express from 'express';
import { saveUsername, savePassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/username', saveUsername);
router.put('/:id/password', savePassword);

export default router;
