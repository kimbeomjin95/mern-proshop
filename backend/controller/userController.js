import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

/*
 * @desc     Auth user & get token
 * @route    POST /api/users/login
 * @access   Public
 */
const authUser = asyncHandler(async (req, res) => {
  console.log(req);
  const { email, password } = req.body;

  const user = await User.findOne({ email }); // key value가 같은경우 단일처리가능

  // 일치
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmon: user.isAdmon,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { authUser };
