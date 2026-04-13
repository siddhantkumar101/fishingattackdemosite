import User from '../models/User.js';

// @desc    Save username (create or reuse user)
// @route   POST /api/users/username
export const saveUsername = async (req, res) => {
  try {
    let { username } = req.body;

    // ✅ Normalize input
    username = username?.trim().toLowerCase();

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // ✅ Check if user already exists
    let user = await User.findOne({ username });

    if (user) {
      return res.status(200).json({
        userId: user._id,
        username: user.username,
        message: "User already exists"
      });
    }

    // ✅ Create new user
    user = await User.create({ username });

    return res.status(201).json({
      userId: user._id,
      username: user.username
    });

  } catch (error) {
    console.error("Error in saveUsername:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Save password for an existing user
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
    console.error("Error in savePassword:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};