import User from '../models/User.js';

// @desc    Save username, create new user
// @route   POST /api/users/username
export const saveUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username is required' });

    const user = await User.create({ username });
    res.status(201).json({ userId: user._id, username: user.username });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save password for an existing user
// @route   PUT /api/users/:id/password
export const savePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password is required' });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
