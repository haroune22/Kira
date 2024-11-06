"use client"

import { useGetWorkspaces } from "@/features/workspaces/api/use_workspaces"
import { RiAddCircleFill } from "react-icons/ri"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { WorkSpaceAvatar } from "@/features/workspaces/components/workSpaceAvatar"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"

export const WorkSpaceSwitcher = () => {

    const workspaceId = useWorkspaceId();
    const { open  } = useCreateWorkspaceModal() 
    const { data } = useGetWorkspaces();
    const router = useRouter();

    const onSelect = (id: string) => {
        router.push(`/workspaces/${id}`)
    };

  return (
    <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
            <p className="text-xs uppercase text-neutral-500">
                Workspaces
            </p>
            <RiAddCircleFill onClick={open}  className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
        </div>
        <Select onValueChange={onSelect} value={workspaceId}>
            <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                <SelectValue placeholder="No workspace selected"/>
            </SelectTrigger>
            <SelectContent>
                {data?.documents.map((workspace) => (
                    <SelectItem key={workspace.$id} value={workspace.$id}>
                        <div className="flex justify-start items-center gap-3 font-medium">
                            <WorkSpaceAvatar
                                name={workspace.name}
                                image={workspace.imageUrl}
                            />
                            <span className="truncate">
                                {workspace.name}
                            </span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}
