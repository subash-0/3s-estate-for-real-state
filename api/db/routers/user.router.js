import { Router } from "express";
import { updateUser,deleteUser } from "../controllers/user.controller.js";
import { verifyUser } from "../../security/verifyUser.js";
const router = Router();
router.put('/user/update/:id' ,verifyUser,updateUser);
router.delete('/user/delete/:id' ,verifyUser,deleteUser);


export default router;