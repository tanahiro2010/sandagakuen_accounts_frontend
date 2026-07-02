import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      setErrorMsg(error)
    } else {
      navigate('/')
    }
  }, [searchParams, navigate])

  const handleGoBack = () => {
    navigate('/_auth/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(135deg,#f3f3f3_0%,#fafafa_100%)]">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-[480px] text-center">
          <h2 className="m-0 mb-4 text-3xl text-error">認証エラーが発生しました</h2>

          <div className="mb-8 mt-6 rounded-r border-l-[3px] border-brand bg-[#faf6f6] p-4 text-left">
            <h3 className="mb-1.5 text-[13px] font-bold text-brand">エラー詳細</h3>
            <p className="m-0 break-all font-mono text-xs leading-relaxed text-muted">
              {errorMsg || '不明なエラーが発生しました。'}
            </p>
          </div>

          <p className="mb-8 text-sm leading-relaxed text-muted">
            認証連携処理中に問題が発生しました。学園配布の正しいGoogleアカウントを使用しているか、またはネットワーク環境を確認してください。
          </p>

          <button onClick={handleGoBack} className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded border-none bg-brand px-7 py-3.5 text-[15px] font-bold text-white no-underline shadow-[0_4px_14px_rgba(159,24,35,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_6px_20px_rgba(159,24,35,0.35)] active:translate-y-0.5">
            ログイン画面へ戻る
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AuthCallback
