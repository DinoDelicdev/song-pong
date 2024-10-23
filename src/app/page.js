"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import HomePage from "./components/HomePage";
import RecoilContextProvider from "./providers/RecoilContextProvider";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (!session) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading) {
    return <p>Loading...</p>; // or a spinner component
  }

  return (
    // <RecoilContextProvider>
    <HomePage session={session} signOut={signOut} />
    // </RecoilContextProvider>
  );
}
