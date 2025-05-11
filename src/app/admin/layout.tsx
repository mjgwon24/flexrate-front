'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout/AdminLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AdminLayout>{children}</AdminLayout>
    </QueryClientProvider>
  );
}
