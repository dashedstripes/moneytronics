import Nav from '@/components/Nav';
import { useAuth } from '@/utils/AuthContext';
import React from 'react';

export default function Profile() {
  const { user } = useAuth();

  if(!user) {
    return (
      <div className='container mx-auto px-8'>
        <Nav/>
        <div>You do not have a profile</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-8'>
      <Nav/>
      <h1 className='font-bold text-2xl'>{user?.email}</h1>
    </div>
  );
};