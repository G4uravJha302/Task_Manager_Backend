import bcrypt from "bcrypt";
import {usermodle} from "../../Models/User_Model.js";
import { Sendmail } from "../../Mailer/SendMail.service.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await usermodle.findOne({ email });

    if (user) return res.status(409).json({ message: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new usermodle({
      ...req.body,
      password: hashedPassword,
      otp,
      otpVerified: otpExpires,
      
    });

    await newUser.save();
    await Sendmail(`Your OTP is ${otp}`, email);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
