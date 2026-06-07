import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="ml-[434px] flex-1 min-h-screen relative overflow-hidden">
        {/* Background image for admin content */}
        <img
          alt=""
          className="absolute inset-0 object-cover opacity-60 pointer-events-none size-full"
          src="/admin/admin_bg.png"
        />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
