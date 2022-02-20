import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/*
 * @desc     로그인(사용자 토큰 인증 & 토큰 조회)
 * @route    POST /api/users/login
 * @access   Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }); // key value가 같은경우 단일처리가능

  // 일치
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('이메일 또는 비밀번호를 다시 확인해주세요.');
  }
});

/*
 * @desc     회원가입
 * @route    POST /api/users
 * @access   Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email }); // key value가 같은경우 단일처리가능

  if (userExists) {
    res.status(400);
    throw new Error('이미 등록되어 있는 계정입니다.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // 201: 요청이 성공적으로 처리되어서 리소스가 만들어졌음을 의미
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('잘못된 회원정보 입니다.');
  }
});

/*
 * @desc     사용자 프로필 조회
 * @route    GET /api/users/profile
 * @access   private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('등록되어 있지 않은 회원입니다.');
  }
});

/*
 * @desc     사용자 프로필 수정
 * @route    GET /api/users/profile
 * @access   private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    // save: 최종적으로 컬렉션에 저장
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error('등록되어 있지 않은 회원입니다.');
  }
});

/*
 * @desc     사용자 목록 조회
 * @route    GET /api/users
 * @access   Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers };
