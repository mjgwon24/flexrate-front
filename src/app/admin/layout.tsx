'use client';

import React from 'react';

import AdminLayout from '@/components/admin/AdminLayout/AdminLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
