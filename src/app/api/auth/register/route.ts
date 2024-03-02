// app/api/auth/register.ts
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';

import prisma from '@/lib/prisma'; // Adjust the import path as necessary

async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { fullName, email, password } = await req.json();
  console.log(fullName, email);

  // if the user already exists then return an error message with saying that the user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return new Response(
      JSON.stringify({ error: 'User already exists. Please try to login' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

  try {
    // Use Prisma to create a new user
    const newUser = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    // Exclude password from the response for security
    const { password, ...userWithoutPassword } = newUser;

    return new Response(JSON.stringify(userWithoutPassword), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to create user:', error);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export { handler as POST };
