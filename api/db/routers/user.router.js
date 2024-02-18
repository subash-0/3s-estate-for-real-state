import { Router } from "express";
import { updateUser,deleteUser,getUserListing } from "../controllers/user.controller.js";
import { verifyUser } from "../../security/verifyUser.js";
const router = Router();
router.put('/user/update/:id' ,verifyUser,updateUser);
router.delete('/user/delete/:id' ,verifyUser,deleteUser);
router.delete('/user/showlisting/:id' ,verifyUser,getUserListing);


export default router;