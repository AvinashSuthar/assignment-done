"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user")); // Ensure correct model import
const userRouter = express_1.default.Router();
//@ts-ignore
userRouter.post("/bfhl", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here");
    try {
        const { username, email, rollNumber, numbers, alphabets } = req.body;
        if (!username || !email || !rollNumber) {
            return res
                .status(400)
                .json({ status: "error", message: "Missing fields" });
        }
        const newUser = new user_1.default({
            username,
            email,
            rollNumber,
            numbers,
            alphabets,
        });
        yield newUser.save();
        return res.status(201).json({
            status: "success",
            userId: newUser._id,
            collegeEmail: newUser.email,
            collegeRollNumber: newUser.rollNumber,
            numbers: newUser.numbers || [],
            alphabets: newUser.alphabets || [],
        });
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}));
//@ts-ignore
userRouter.get("/bfhl", (req, res) => {
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
exports.default = userRouter;
