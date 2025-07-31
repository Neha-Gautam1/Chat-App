import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    if(newUser){
        // Generate token for the new user
        generateToken(newUser._id,res);
        res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email
        }
      });
    }
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate token for the user
    generateToken(user._id, res);
    res.status(201).json({ message: "Login successful", user:{
      id: user._id,
      name: user.name,
      email: user.email
    },
   });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error during logout:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getUserProfile = async(req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser} }).select("-password"); // Exclude password field
    res.status(201).json({ filteredUsers });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}