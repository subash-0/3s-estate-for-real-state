import expres from 'express'
import { signup } from '../controllers/auth.controller.js';
const router = expres.Router();

router.post("/auth/signup",signup);

export default router;