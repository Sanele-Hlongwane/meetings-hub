// app/sign-up/[[...sign-up]]/page.tsx
"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import SignupForm from "@/components/SignupForm";
import VerifyForm from "@/components/VerifyForm";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
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
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });
      // Example: Call your API to save the role
      // await fetch('/api/assign-role', { method: 'POST', body: JSON.stringify({ emailAddress, role }) });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (err: any) {
      setClerkError(err.errors?.[0]?.message || "An error occurred.");
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        console.log("Verification failed:", completeSignUp);
      }
    } catch (err: any) {
      console.log("Error:", err);
      setClerkError("Verification failed. Please try again.");
    }
  };

  return (
    <>
      {!verifying ? (
        <SignupForm signUpWithEmail={signUpWithEmail} clerkError={clerkError} />
      ) : (
        <VerifyForm handleVerify={handleVerify} code={code} setCode={setCode} />
      )}
    </>
  );
};

export default Signup;
