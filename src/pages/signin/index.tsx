import { useState } from "react";
import { useRouter } from "next/router";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { auth } from "@/api/auth";
import { LOCAL_TOKEN_KEY } from "@/api/axios";

function signin() {
  const [lid, setLid] = useState("");
  const [lpass, setLpass] = useState("");
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const router = useRouter();

  const supabase = createBrowserSupabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  async function handleSignInWithPassword() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: lid,
      password: lpass,
    });

    if (error) {
      console.log(error);
      router.push("/signin");
      alert("The password was incorrect.");
    } else {
      const res = await auth(data.session?.access_token ?? "");
      localStorage.setItem(LOCAL_TOKEN_KEY, res.data.payload.token);
      router.push("/create");
    }
  }

  const handleRememberMeChange = () => {
    setIsRememberMeChecked(!isRememberMeChecked);
  };

  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover">
      <div className="flex h-screen justify-center items-center">
        <div className="text-center">
          <h1 className="font-font-mast text-5xl text-white font-semibold mb-8">
            Sign in
          </h1>
          <p className="text-white text-xl mb-3 w-80">
            Sign in and get started
          </p>
          <div className="w-80">
            <input
              type="text"
              placeholder="sign-in"
              className="w-full rounded-lg h-10 text-xl pl-6 mb-4 text-white bg-sky-900"
              value={lid}
              name="id"
              onChange={(e) => setLid(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg h-10 text-xl pl-6 mb-4 text-white bg-sky-900"
              value={lpass}
              name="pass"
              onChange={(e) => setLpass(e.target.value)}
            />
            <div className="flex w-full items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                value={isRememberMeChecked ? "checked" : ""}
                className="mr-2"
                onChange={handleRememberMeChange}
              />
              <label htmlFor="rememberMe" className="text-gray-300">
                Remember me
              </label>
              <p className="text-yellow-400 ml-auto">Forgot Password</p>
            </div>

            <button
              onClick={handleSignInWithPassword}
              className="w-full mt-4 h-10 text-xl font-semibold text-center bg-yellow-500 text-blue-900 rounded-lg"
            >
              signin
            </button>

            <div className="flex mb-12 mt-3">
              <p className="text-white">Don't have an account?</p>
              <Link
                href="/signup"
                className="ml-3 blur-1 text-yellow-500 font-bold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signin;
