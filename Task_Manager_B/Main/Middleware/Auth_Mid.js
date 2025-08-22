import jwt from "jsonwebtoken";

export const tokenVerify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.id;
    next();
  } catch (err) {
    const errorMessage = { message: "Invalid token" };
    res.status(401).json(errorMessage);
  }
};