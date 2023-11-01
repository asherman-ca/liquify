"use client";

import { Button } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL;
  // ?? // Set this to your site URL in production env.
  // process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
  // "http://localhost:3000/";

  // Make sure to include https:// when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing /.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
  };

  return (
    <div className="flex justify-center pt-32">
      <div className="flex flex-col gap-8 rounded-md border-1 border-gray-300 p-8">
        <h1 className="text-2xl font-semibold text-blue-500">liquify</h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Sign in to Liquify</h2>
          <p>Not your device? Use a private or incognito window to sign in.</p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="flex w-full gap-4">
            <Button onClick={handleSignIn} color="primary" className="flex-1">
              Sign in
            </Button>
            <Button onClick={handleSignUp} color="primary" className="flex-1">
              Sign up
            </Button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <p className="bg-white p-2 text-center text-sm">OR</p>
          <div className="absolute left-0 top-[50%] -z-10 w-full border-b-1 border-gray-300"></div>
        </div>
        <Button
          variant="ghost"
          onClick={handleGoogleSignIn}
          className="mx-auto"
        >
          <Image
            src="/googleIcon.png"
            alt="Google Icon"
            width={48}
            height={48}
            className="h-5 w-5"
          />
          <p>Sign in with Google</p>
        </Button>
      </div>
    </div>
  );
}
