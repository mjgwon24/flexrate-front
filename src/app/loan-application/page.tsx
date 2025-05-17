import dynamic from 'next/dynamic';

const LoanApplicationFunnel = dynamic(
  () => import('@/components/loanApplicationFunnel/LoanApplicationFunnel'),
  { ssr: false }
);

const LoanApplicaton = () => {
  return <LoanApplicationFunnel />;
};

export default LoanApplicaton;
