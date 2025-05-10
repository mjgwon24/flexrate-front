import Header from '@/components/admin/Header/Header';
import { AdminBody, AdminWrapper } from './AdminLayout.style';
import Sidebar from '../Sidebar/Sidebar';

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
