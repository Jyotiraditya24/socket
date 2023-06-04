import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      res.status(400).json({ error: "Cannot find the user" });
    }
    //checking password
    const checkpass = await bcrypt.compare(password, findUser.password);
    if (!checkpass) res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
    //deleting so not to send password to the frontend
    const userWithoutPassword = { ...findUser.toObject(), password: undefined };
    //sending back token and the email
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
