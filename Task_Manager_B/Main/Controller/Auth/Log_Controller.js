import bcrypt from "bcrypt";
import {usermodle} from "../../Models/User_Model.js";

import { Sendmail } from "../../Mailer/SendMail.service.js";

export const login = async (req, res) => {
  try {
    const data = req.body;
    console.log("my data is this :", data.email);
    const user = await usermodle.findOne({ email: data.email });
    console.log("user:", user);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpVerified = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpVerified = otpVerified;

    await user.save();
    await Sendmail(`Please verify your email with this OTP: ${otp}`);

    res.status(200).json({ message: "OTP sent to your email" });

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
