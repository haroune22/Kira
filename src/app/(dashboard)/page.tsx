import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";



export default async function Home() {

  const user = await getCurrent()
  // console.log(user)
  if(!user) redirect("/sign-in")

  return (
    <div className="flex gap-4 p-6">
     This is home page
    </div>
  );
}
