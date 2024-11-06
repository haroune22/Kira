import { UserButton } from '@/features/auth/components/userButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface StandAloneLayoutProps {
    children: React.ReactNode;

}
const StandAloneLayout = ({
    children
}: StandAloneLayoutProps) => {
  return (
    <main className='bg-neutral-100 min-h-screen'>
        <div className="mx-auto max-w-screen-2xl p-4">
            <nav className='flex justify-between items-center h-[73px] '>
                <Link href="/">
                    <Image src="/logo.svg" alt='logo' width={56} height={152}/>
                </Link>
                <UserButton />
            </nav>
            <div className="flex flex-col items-center justify-center py-4">
                {children}
            </div>
        </div>
    </main>
  )
}

export default StandAloneLayout