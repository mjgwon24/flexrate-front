import dynamic from 'next/dynamic';

const MypageEditFunnel = dynamic(
  () => import('@/components/MypageEditFunnel/MypageEditFunnel'),
  { ssr: false }
);

const EditEmailPage = () => {
  return <MypageEditFunnel />;
};

export default EditEmailPage;
