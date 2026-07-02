import React from 'react'

interface HeaderProps {
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => (
  <header className="flex items-center justify-between border-b-4 border-brand bg-white px-8 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
    <div className="flex items-center gap-3.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-lg font-bold text-white shadow-[0_3px_6px_rgba(159,24,35,0.25)]">三</div>
      <div className="flex flex-col">
        <h1 className="m-0 leading-tight tracking-[0.08em] text-dark" style={{ fontSize: '21px', fontWeight: 700 }}>三田学園 中学校・高等学校</h1>
        <span className="m-0 text-[11px] font-medium tracking-[0.12em] text-muted">SANDA GAKUEN ACCOUNTS</span>
      </div>
    </div>
    {children}
  </header>
)

export default Header
