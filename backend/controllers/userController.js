import User from '../models/User.js';


export const saveUsername = async (req, res) => {
  try {
    let { username } = req.body;

  
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

  
    username = username.trim().toLowerCase();

  
    let user = await User.findOne({ username });

    if (user) {
      return res.status(200).json({
        userId: user._id,
        username: user.username,
        message: "User already exists"
      });
    }

  
    user = await User.create({ username });

    return res.status(201).json({
      userId: user._id,
      username: user.username
    });

  } catch (error) {
    console.error("Error in saveUsername:", error);

  
    if (error.code === 11000 || error.message.includes("duplicate key")) {
      return res.status(409).json({ message: "Username already exists" });
    }

    return res.status(500).json({ message: error.message });
  }
};



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
    return res.status(500).json({ message: error.message });
  }
};