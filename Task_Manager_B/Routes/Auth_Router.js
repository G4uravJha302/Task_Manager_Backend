import { Router } from "express";
import { signup } from "../Controller/Auth/Reg_Controller.js";
import { login } from "../Controller/Auth/Log_Controller.js";
import { Otpverify} from "../Middleware/Otp_Validate.js";

const Auth_router = Router();
Auth_router.post("/signup", signup);
Auth_router.post("/verify-otp", Otpverify);
// Auth_router.post("/resend-otp", resendOtp);
Auth_router.post("/login", login);
// Auth_router.post("/logout", logout);

export default Auth_router;
