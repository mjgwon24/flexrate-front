import Header from '@/components/admin/Header/Header';

import Sidebar from '../Sidebar/Sidebar';

import { AdminBody, AdminWrapper } from './AdminLayout.style';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminWrapper>
      <Header />
      <AdminBody>
        <Sidebar />
        {children}
      </AdminBody>
    </AdminWrapper>
  );
};

export default AdminLayout;
