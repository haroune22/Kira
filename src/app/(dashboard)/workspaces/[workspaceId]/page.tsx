import { getCurrent } from '@/features/auth/actions'
import { redirect } from 'next/navigation'
import React from 'react'

const WorkSpaceIdPage = async() => {
  const user = await getCurrent()
  if(!user) redirect("/sign-in")

  return (
    <div>WorkSpaceIdPage</div>
  )
}

export default WorkSpaceIdPage