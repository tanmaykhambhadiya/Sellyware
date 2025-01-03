import React, { useState } from 'react'
import Sidebar from '../scenes/global/Sidebar'
import { Outlet } from 'react-router-dom';
import Topbar from '../scenes/global/Topbar';

const User = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  )
}

export default User
