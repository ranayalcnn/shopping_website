import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedWrapper from "../components/AnimatedWrapper";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) return toast.error("Please enter a valid email.");
    if (pass.length < 6) return toast.error("Password must be at least 6 characters.");

    toast.success("Logged in (demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
      <AnimatedWrapper className="w-full max-w-lg">
        <div className="
          p-10 rounded-2xl bg-white dark:bg-slate-900
          border border-slate-300 dark:border-slate-700
          shadow-xl
        ">

          {/* HEADER */}
          <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-slate-100">
            Welcome Back
          </h1>
          <p className="text-center text-slate-500 dark:text-slate-400 mt-2 mb-8">
            Sign in to continue your shopping journey
          </p>

          {/* GOOGLE LOGIN */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3 mb-6
                       border border-slate-300 dark:border-slate-700
                       bg-white dark:bg-slate-800 rounded-lg
                       hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />
            OR
            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="
                  w-full px-4 py-2 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  text-slate-900 dark:text-slate-100
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="
                    w-full px-4 py-2 pr-10 rounded-lg
                    bg-slate-100 dark:bg-slate-800
                    border border-slate-300 dark:border-slate-700
                    text-slate-900 dark:text-slate-100
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700
                         text-white font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm mt-6 text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default LoginPage;
