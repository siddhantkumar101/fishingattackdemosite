import User from '../models/User.js';

// @desc    Save username (login + signup)
// @route   POST /api/users/username
export const saveUsername = async (req, res) => {
  try {
    let { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    username = username.trim().toLowerCase();

    // 🔥 STEP 1: Check if user exists
    let user = await User.findOne({ username });

    if (user) {
      // 👉 LOGIN FLOW
      return res.status(200).json({
        userId: user._id,
        username: user.username,
        message: "User already exists (login)"
      });
    }

    // 🔥 STEP 2: Create new user
    user = await User.create({ username });

    return res.status(201).json({
      userId: user._id,
      username: user.username,
      message: "User created successfully"
    });

  } catch (error) {
    console.error("saveUsername ERROR:", error);

    // 🔥 Fallback duplicate handling (race condition)
    if (
      error.code === 11000 ||
      error.message?.includes("duplicate key") ||
      error.message?.includes("E11000")
    ) {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(200).json({
          userId: existingUser._id,
          username: existingUser.username,
          message: "User already exists (race condition handled)"
        });
      }

      return res.status(409).json({
        message: "Username already exists"
      });
    }

    return res.status(500).json({ message: error.message });
  }
};