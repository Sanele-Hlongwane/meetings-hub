// app/sign-up/[[...sign-up]]/page.tsx
"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import SignupForm from "@/components/SignupForm";
import VerifyForm from "@/components/VerifyForm";

const Signup = () => {
  const {isLoaded, signUp, setActive} = useSignUp();
  const [clerkError, setClerkError] = useState("");
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const signUpWithEmail = async ({
    emailAddress,
    password,
    role,
  }: {
    emailAddress: string;
    password: string;
    role: string;
  }) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });
      // Store the role in your database here using an API call or directly if Prisma is used
      // Example: await saveUserRole({ emailAddress, role });

      await signUp.prepareEmailAddressVerification({strategy: "email_code"});

      setVerifying(true);
    } catch (err: any) {
      setClerkError(err.errors[0].message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({session: completeSignUp.createdSessionId});
        router.push("/");
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      {!verifying ?
        (<SignupForm signUpWithEmail={signUpWithEmail} clerkError={clerkError} />) :
        (<VerifyForm handleVerify={handleVerify} code={code} setCode={setCode} />)
      }
    </>
  )
};

export default Signup;
