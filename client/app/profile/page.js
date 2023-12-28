"use client"
import React, { useEffect } from 'react'
import Sidebar from '../components/sidebarAdmin'
import { useRouter } from 'next/navigation';

function Profile() {

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    //
  }, []);
  return (
    <div className='w-full '>
      <Sidebar />
    </div>
  )
}

export default Profile