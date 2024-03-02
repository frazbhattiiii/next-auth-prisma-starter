'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthTabs() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fullName === '' || email === '' || password === '') {
      toast.error('Please fill all the fields');
      return;
    }
    //  registering the user
    try {
      const response = await axios.post('/api/auth/register', {
        fullName,
        email,
        password,
      });
      if (response.status === 200) {
        toast.success('Account created successfully');
        console.log('Account created successfully');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        toast.error(error.response?.data.error);
      } else {
        // Something happened in setting up the request that triggered an Error.
        toast.error('Something went wrong. Please try again later');
        console.error('Error:', (error as Error).message);
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Please fill all the fields');
      return;
    }
    //  logging in the user with next-auth signIn function
    signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };
  return (
    <div>
      <Toaster />
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 rounded-xl px-2">
          <TabsTrigger value="login" className="rounded-xl">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="rounded-xl">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="rounded-xl bg-white">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-[8rem] bg-gray-500 hover:bg-gray-700"
                >
                  Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create new account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSignupSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-gray-600 hover:bg-gray-700">
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
