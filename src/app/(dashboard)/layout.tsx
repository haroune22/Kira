import { Navbar } from '@/components/Navbar'
import { SideBar } from '@/components/SideBar'
import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal'
import React from 'react'

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex w-full h-full'>
        <CreateWorkspaceModal />
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
            <SideBar />
        </div>
        <div className="lg:pl-[264px] w-full">
            <div className="mx-auto max-w-screen-2xl h-full">
                <Navbar />
                <main className='h-full py-8 px-6 flex flex-col'>
                    {children}
                </main>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout