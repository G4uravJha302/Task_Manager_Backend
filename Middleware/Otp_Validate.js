import {usermodle} from "../Models/User_Model.js";
import jwt from "jsonwebtoken";

export const Otpverify = async (req, res) => {
  try {
    const data = req.body;
    console.log("Request body:", data);
    const user = await usermodle.findOne({ email: data.email, otp: data.otp });

    console.log("User found:", user);

    if (!user) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpVerified < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    if (user.otp !== data.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otp = null;
    user.otpVerified = null;
    await user.save();

    console.log("User after OTP null:", user);

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "16d" });
    console.log("Generated JWT:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 16 * 24 * 60 * 60 * 1000,
    });
    console.log("Cookie set with token");
    return res.status(200).json({ message: "OTP verified successfully", isLogin: true, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


