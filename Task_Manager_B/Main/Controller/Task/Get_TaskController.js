import { Task } from "../../Models/Task_Model.js";

export const getTasks = async (req, res) => {
  const userId = req.user_id;
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json({ message: "Tasks fetched", tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};