"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userEmailState } from "../state/state";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(status === "loading");
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);

  useEffect(() => {
    if (session) {
      const handleRegistration = async () => {
        try {
          const response = await fetch("/api/users/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: session.user?.email,
              username: session.user?.name,
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setUserEmail(session.user?.email);
          const data = await response.json();
          console.log(data);
          router.push("/");
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        } finally {
          setIsLoading(false);
        }
      };

      setIsLoading(true);
      handleRegistration();
    }
  }, [session, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn();
      if (result?.error) {
        setError("Sign-in error: " + result.error);
        console.error("Sign-in error:", result.error);
      }
    } catch (error) {
      setError("Error during sign-in");
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <button onClick={handleSignIn} className="shadow-primary w-56 h-16 rounded-xl bg-white border-0 text-black text-3xl active:scale-[0.99] m-6" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center">
            <span className="loader mr-2"></span> Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
