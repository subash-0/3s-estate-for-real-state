import expres from 'express'
import { signin, signup } from '../controllers/auth.controller.js';
const router = expres.Router();

router.post("/auth/signup",signup);
router.post("/auth/signin",signin);

export default router;