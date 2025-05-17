import dynamic from 'next/dynamic';

const LoanApplicationFunnel = dynamic(
  () => import('@/components/loanApplicationFunnel/LoanApplicationFunnel'),
  { ssr: false }
);

const LoanApplication = () => {
  return <LoanApplicationFunnel />;
};

export default LoanApplication;
