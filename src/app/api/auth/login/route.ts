// app/api/auth/login.ts
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

  const { email, password } = await req.json();
  console.log(password, email);

  // if the user already exists then return an error message with saying that the user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  if (userExists && userExists.password === hashedPassword) {
    return new Response(JSON.stringify('User Logged In'), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify('Invalid Credentials'), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export { handler as POST };
