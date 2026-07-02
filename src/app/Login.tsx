import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const Login: React.FC = () => {
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
    window.location.href = `${apiUrl}/oauth`
  }

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(135deg,#f3f3f3_0%,#fafafa_100%)]">
      <Header />

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="flex w-full max-w-[960px] flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:flex-row" style={{ minHeight: '560px' }}>
          <div className="relative flex-[1.3] bg-cover bg-center" style={{ backgroundImage: 'url(/sanda_building.png)' }}>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-[rgba(38,38,38,0.4)] to-[rgba(159,24,35,0.3)] p-10 text-white">
              <h2 className="m-0 mb-2 text-2xl font-bold tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>伝統と未来をつなぐ学び舎</h2>
              <p className="m-0 text-[13px] opacity-90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                三田学園 統合認証システムへようこそ。<br />
                共通のアカウントで、各教育デジタルサービスへ安全にアクセスできます。
              </p>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col justify-center p-12 before:absolute before:left-0 before:right-0 before:top-0 before:h-1 before:bg-brand before:content-['']">
            <div className="mb-8">
              <h2 className="m-0 mb-2 text-2xl font-bold text-dark">統合ログイン</h2>
              <p className="m-0 text-sm leading-relaxed text-muted">
                学園の認証システムにログインします。<br />
                お持ちのGoogleアカウント（学園配布のもの）を使用してサインインしてください。
              </p>
            </div>

            <div className="mb-4 mt-8">
              <button onClick={handleGoogleLogin} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded border border-[#dcdcdc] bg-white px-6 py-3 text-[15px] font-bold text-[#333] shadow-sm transition-all duration-200 hover:border-[#c6c6c6] hover:bg-[#f7f7f7] hover:shadow-md">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Googleアカウントでログイン
              </button>
            </div>

            <div className="mt-8 rounded-r border-l-[3px] border-brand bg-[#faf6f6] p-4">
              <h3 className="mb-1.5 text-[13px] font-bold text-brand">セキュリティに関するご注意</h3>
              <p className="m-0 text-xs leading-relaxed text-muted">
                共有または公共の端末を使用している場合は、ブラウザを閉じる前に必ずログアウトしてください。パスワードや認証情報を保存しないようご注意ください。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
