// app/sign-up/[[...sign-up]]/page.tsx
"use client";
import { useState, FormEvent } from "react"; // Add FormEvent import
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
      console.log("Verification code:", code); // Debugging line
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      console.log("Complete sign-up response:", completeSignUp); // Debugging line
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        setClerkError("Verification failed. Please check your code.");
      }
    } catch (err: any) {
      console.log("Error during verification:", err); // Debugging line
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
