// src/app/auth/login/page.tsx
// 로그인 Funnel 페이지 컴포넌트
// @author 윤영찬
// @since 2025-05-13

'use client'
import React from 'react'
import { useFunnel } from '@use-funnel/browser'
import { LoginSelector } from './components/LoginSelector'
import { LoginEmail } from './components/LoginEmail'
import { LoginPassword } from './components/LoginPassword'
import { LoginComplete } from './components/LoginComplete'

type Steps = {
  selector: {}
  email: { email: string }
  password: { email: string; password: string }
  complete: { email: string }
}

export default function LoginPage() {
  const funnel = useFunnel<Steps>({
    id: 'login',
    initial: { step: 'selector', context: {} }
  })

  return (
    <funnel.Render
      selector={funnel.Render.with({
        render: () => (
          <LoginSelector
            onSelectEmail={() => funnel.history.push('email', prev => ({ ...prev, email: '' }))}
            onSelectFace={() => {/* Face ID flow */}}
            onSelectPassword={() => funnel.history.push('password', prev => ({ ...prev, email: '' , password: '' }))}
          />
        )
      })}

      email={funnel.Render.with({
        render: ({ context }) => (
          <LoginEmail
            defaultEmail={context.email ?? ''}
            onNext={(email) => funnel.history.push('password', prev => ({ ...prev, email, password: '' }))}
          />
        )
      })}

      password={funnel.Render.with({
        render: ({ context }) => (
          <LoginPassword
            email={context.email}
            onSubmit={(password) => funnel.history.push('complete', prev => ({ email: context.email }))}
          />
        )
      })}

      complete={({ context }) => (
        <LoginComplete email={context.email} />
      )}
    />
  )
}
