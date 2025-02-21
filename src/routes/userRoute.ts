import express, { Request, Response } from "express";
import User from "../models/user"; // Ensure correct model import

const userRouter = express.Router();
//@ts-ignore
userRouter.post("/bfhl", async (req: Request, res: Response) => {
  console.log("here");
  try {
    const { username, email, rollNumber, numbers, alphabets } = req.body;

    if (!username || !email || !rollNumber) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }

    const newUser = new User({
      username,
      email,
      rollNumber,
      numbers,
      alphabets,
    });

    await newUser.save();

    return res.status(201).json({
      status: "success",
      userId: newUser._id,
      collegeEmail: newUser.email,
      collegeRollNumber: newUser.rollNumber,
      numbers: newUser.numbers || [],
      alphabets: newUser.alphabets || [],
    });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
});

//@ts-ignore
userRouter.get("/bfhl", (req: Request, res: Response) => {
  return res.status(200).json({
    operation_code: 1,
  });
});

//@ts-ignore
userRouter.post("/annexure", (req, res) => {
  const { data, filter } = req.body;

  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));
  const highest_alphabet = alphabets.length
    ? [alphabets.sort((a, b) => b.localeCompare(a))[0]]
    : [];

  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_alphabet,
  };

  res.json(response);
});

export default userRouter;
