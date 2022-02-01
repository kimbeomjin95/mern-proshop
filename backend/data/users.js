import bycrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bycrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: '이덕희',
    email: 'dh@example.com',
    password: bycrypt.hashSync('123456', 10),
  },
  {
    name: '이덕희2',
    email: 'dh2@example.com',
    password: bycrypt.hashSync('123456', 10),
  },
];

export default users;
