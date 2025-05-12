'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AdminLayout from '@/components/admin/AdminLayout/AdminLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AdminLayout>{children}</AdminLayout>
    </QueryClientProvider>
  );
};

export default Layout;
