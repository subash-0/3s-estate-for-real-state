import expres from 'express'
import { signin, signup,google } from '../controllers/auth.controller.js';
const router = expres.Router();

router.post("/auth/signup",signup);
router.post("/auth/signin",signin);
router.post("/auth/google",google);

export default router;