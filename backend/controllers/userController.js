import User from '../models/User.js';

// @desc    Save username (create or reuse user)
// @route   POST /api/users/username
export const saveUsername = async (req, res) => {
  try {
    let { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    username = username.trim().toLowerCase();

    try {
      // 🔥 Direct create
      const user = await User.create({ username });

      return res.status(201).json({
        userId: user._id,
        username: user.username
      });

    } catch (err) {
      // 🔥 Handle ALL duplicate cases
      if (
        err.code === 11000 ||
        err.message?.includes("duplicate key") ||
        err.message?.includes("E11000")
      ) {
        const existingUser = await User.findOne({ username });

        return res.status(200).json({
          userId: existingUser._id,
          username: existingUser.username,
          message: "User already exists"
        });
      }

      throw err;
    }

  } catch (error) {
    console.error("saveUsername ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// @desc    Save password
// @route   PUT /api/users/:id/password
export const savePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || !password.trim()) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: password.trim() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      userId: user._id,
      username: user.username
    });

  } catch (error) {
    console.error("savePassword ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};