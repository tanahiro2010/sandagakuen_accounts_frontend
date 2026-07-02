import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface UserInfo {
  id: string
  username: string
  name: string | null
  email: string | null
  role: 'user' | 'student: junior' | 'student: high' | 'teacher' | 'staff' | 'admin'
  status: 'enrolled' | 'graduated' | 'transferred' | 'withdrawn' | 'suspended'
  avatarUrl: string | null
  permissionBitfield: string
  createdAt: string
}

const roleMap: Record<string, string> = {
  'user': '一般ユーザー',
  'student: junior': '中学生',
  'student: high': '高校生',
  'teacher': '教員',
  'staff': '職員',
  'admin': '管理者'
}

const statusMap: Record<string, string> = {
  'enrolled': '在籍・有効',
  'graduated': '卒業',
  'transferred': '転校',
  'withdrawn': '退学',
  'suspended': '一時停止中'
}

const Home: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
        const res = await fetch(`${apiUrl}/me`, {
          credentials: 'include'
        })

        if (!res.ok) {
          throw new Error('Not authenticated')
        }

        const data = await res.json()
        if (data && !data.error && data.data) {
          const userData = data.data.user || data.data
          setUser(userData)
        } else {
          throw new Error('Invalid user payload')
        }
      } catch (e) {
        console.warn('Session fetching failed, redirecting to login', e)
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const handleLogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
      await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      console.error('Logout error', e)
    } finally {
      navigate('/_auth/login')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[linear-gradient(135deg,#f3f3f3_0%,#fafafa_100%)]">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center px-5 py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand/10 border-t-brand"></div>
          <p className="mt-4 text-muted">アカウント情報を確認中...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) return null

  const displayName = user.name || user.username
  const firstLetter = displayName.charAt(0)

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(135deg,#f3f3f3_0%,#fafafa_100%)]">
      <Header>
        <button onClick={handleLogout} className="inline-flex cursor-pointer items-center justify-center gap-3 rounded border border-[#e0e0e0] bg-transparent px-7 py-3.5 text-[15px] font-bold text-dark no-underline shadow-none transition-all duration-200 hover:border-brand hover:bg-[#f5f5f5] hover:text-brand">
          ログアウト
        </button>
      </Header>

      <main className="mx-auto my-10 w-full max-w-[800px] px-5">
        <div className="relative overflow-hidden rounded-xl border border-black/5 bg-white p-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] before:absolute before:left-0 before:right-0 before:top-0 before:h-[5px] before:bg-brand before:content-['']">
          <div className="mb-8 flex items-center gap-6 border-b border-[#eee] pb-8">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={displayName} className="h-20 w-20 rounded-full border-2 border-white bg-gray-100 object-cover shadow-md" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-3xl font-bold text-white shadow-[0_4px_10px_rgba(159,24,35,0.2)]">{firstLetter}</div>
            )}
            <div className="flex flex-col gap-1">
              <h2 className="m-0 text-2xl font-bold text-dark">{displayName}</h2>
              <p className="m-0 text-sm text-muted">{user.email || user.username}</p>
              <span className={`mt-1 inline-block self-start rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${user.role.includes('admin') ? 'bg-red-50 text-red-700' : user.status === 'suspended' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>
                {roleMap[user.role] || user.role}
              </span>
            </div>
          </div>

          <h3 className="mb-8 pb-2 text-lg font-bold text-dark" style={{ borderBottom: '2px solid #f0f0f0' }}>アカウント詳細情報</h3>

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">アカウントID (UID)</span>
              <span className="font-mono text-sm font-medium text-dark">{user.id}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">ログインユーザー名</span>
              <span className="text-[15px] font-medium text-dark">{user.username}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">在籍ステータス</span>
              <span className={`text-[15px] font-medium ${user.status === 'suspended' ? 'font-bold text-error' : 'text-dark'}`}>
                {statusMap[user.status] || user.status}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">権限値 (Bitfield)</span>
              <span className="font-mono text-[15px] font-medium text-dark">{user.permissionBitfield}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">アカウント作成日</span>
              <span className="text-[15px] font-medium text-dark">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('ja-JP') : '-'}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">認証プロバイダ</span>
              <span className="text-[15px] font-medium text-dark">Google OAuth (OIDC)</span>
            </div>
          </div>

          <div className="mt-6 rounded-r border-l-4 border-dark bg-[#f9f9f9] p-4">
            <h3 className="mb-1.5 text-xs font-bold text-dark">接続済み学園システム</h3>
            <p className="m-0 text-xs leading-relaxed text-muted">
              この共通アカウントは、授業支援クラウド、学外連絡用システム、および学内図書館ポータルなどで共通してログイン時に利用可能です。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
