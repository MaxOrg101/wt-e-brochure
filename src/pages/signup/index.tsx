import { useState } from "react";
import { useRouter } from "next/router";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

function Signup() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const router = useRouter();

  const supabase = createBrowserSupabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  async function signUp() {
    try {
      const { error } = await supabase.auth.signUp({
        email: id,
        password: pass,
      });

      if (error) {
        console.log(error);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRememberMeChange = () => {
    setRememberMeChecked(!rememberMeChecked);
  };

  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover">
      <div className="flex h-screen justify-center items-center">
        <div className="p-5 rounded-3xl text-center">
          <h1 className="font-font-mast text-5xl text-white font-semibold mb-8">
            Sign up
          </h1>
          <p className="text-white mb-3 text-xl w-80">
            Sign up with email and password
          </p>
          <div className="w-80 text-center">
            <input
              type="text"
              placeholder="Email id"
              className="w-full rounded-lg h-10 text-xl pl-6 mb-4 text-white bg-sky-900"
              value={id}
              name="id"
              onChange={(e) => setId(e.target.value)}
            />

            <br />
            <input
              type="password"
              placeholder="Create Password"
              className="mx-auto w-full rounded-lg h-10 text-xl pl-6 mb-4 text-white bg-sky-900"
              value={pass}
              name="pass"
              onChange={(e) => setPass(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              className="mx-auto w-full rounded-lg h-10 text-xl pl-6 mb-4 text-white bg-sky-900"
              value={cpass}
              name="cpass"
              onChange={(e) => setCpass(e.target.value)}
            />
            <div className="flex w-full items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMeChecked}
                className="mr-2"
                onChange={handleRememberMeChange}
              />
              <label htmlFor="rememberMe" className="text-gray-300">
                Remember me
              </label>
            </div>

            <button
              onClick={signUp}
              className="w-full mt-4 h-10 text-xl font-semibold text-center bg-yellow-500 text-blue-900 rounded-lg"
            >
              Create account
            </button>
            <p className="text-white mt-3 mb-3 text-xl">
              Sign up with social media
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
