import React from 'react';

import AuthTabs from '@/components/features/auth/auth-tabs';

const AuthPage = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-4 ">
      <p className="mb-8 text-4xl font-bold text-gray-600">
        Food <span className="font-bold text-gray-800"> Donation</span>
      </p>
      <AuthTabs />
    </div>
  );
};

export default AuthPage;
