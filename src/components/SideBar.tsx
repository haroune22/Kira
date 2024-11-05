import { DottedSeparator } from '@/components/dotted-separator'
import { Navigation } from '@/components/Navigation'
import Image from 'next/image'
import Link from 'next/link'
import { WorkSpaceSwitcher } from './WorkSpaceSwitcher'


export const SideBar = () => {
  return (
    <aside className='h-full w-full p-4 bg-neutral-100'>
        <Link className='flex items-center justify-start' href="/">
            <Image src="/logo.svg" alt='logo' width={154} height={40} />
        </Link>
        <DottedSeparator className='my-4'/>
        <WorkSpaceSwitcher />
        <DottedSeparator className='my-4'/>
        <Navigation />
    </aside>
  )
}
