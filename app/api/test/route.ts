import User from '@/database/models/User';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Connecting to database...');

  await dbConnect();

  console.log('Database connected. Creating user...');

  const user = new User({
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123',
  });

  await user.save();

  console.log('User created. Finding user...');

  const foundUser = await User.findOne({ username: 'johndoe' });

  console.log('User found:', foundUser);

  return NextResponse.json(foundUser);
}
