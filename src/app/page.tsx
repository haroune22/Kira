"use client"
import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/useLogout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data, isLoading } = useCurrent();
  const router = useRouter()
  const { mutate } = useLogout()

  useEffect(() => {
    if(!data && !isLoading) {
      router.push("/sign-in")
    }
  }, [data, isLoading, router]);

  return (
    <div className="flex gap-4">
      visible to authorized users
      <Button onClick={() => mutate()}>
        Logout
      </Button>
    </div>
  );
}
