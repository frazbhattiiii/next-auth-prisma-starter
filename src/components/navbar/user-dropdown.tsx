'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UserDropdown = ({ session }: { session: Session }) => {
  const getInitials = (name: string) => {
    const namesArray = name.split(' ').filter(Boolean); // Split name and remove empty strings
    let initials = '';

    if (namesArray.length === 1) {
      // If only one name is present, take first two letters
      initials = namesArray[0].substring(0, 2);
    } else if (namesArray.length >= 2) {
      // If two or more names are present, take first letter of first and last name
      initials = namesArray[0][0] + namesArray[namesArray.length - 1][0];
    }

    return initials.toUpperCase(); // Convert initials to uppercase
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            {getInitials(session.user?.name as string)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut()}>
          <Icons.logOut className="mr-2 size-4" /> <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
