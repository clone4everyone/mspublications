import React from 'react';
import AuthorManagement from './AuthorManagement';

const AuthorManagementPage = () => {
   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 p-8">
        <div className="">
          <AuthorManagement />
        </div>
      </div>
    );
}

export default AuthorManagementPage;
