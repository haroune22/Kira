
import { getCurrent } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/SignUpCard";
import { redirect } from "next/navigation";


const SignUpPage = async () => {
  const user = await getCurrent()
  // console.log(user)
  if(user) redirect("/")
  return <SignUpCard />;
};

export default SignUpPage;
