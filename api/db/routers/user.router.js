import { Router } from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../../security/verifyUser.js";
const router = Router();
router.put('/user/update/:id' ,verifyUser,updateUser);


export default router;