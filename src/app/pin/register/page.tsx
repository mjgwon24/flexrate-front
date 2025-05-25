'use client'

import { useRouter } from 'next/navigation'
import PinRegisterPage from '@/components/login/PinLogin/PinRegisterPage/PinRegisterPage'

export default function RegisterPage() {
  const router = useRouter()
  const handleBack = () => router.back()

  return <PinRegisterPage onBack={handleBack} />
}
