import expres from 'express'
import { signin,signout, signup,google } from '../controllers/auth.controller.js';
const router = expres.Router();

router.post("/auth/signup",signup);
router.post("/auth/signin",signin);
router.get("/auth/signout",signout);
router.post("/auth/google",google);

export default router;