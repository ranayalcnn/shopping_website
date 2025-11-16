import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedWrapper from "../components/AnimatedWrapper";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

const strength = (p) => {
  if (!p) return { w: "w-0", c: "" };
  if (p.length < 6) return { w: "w-1/3", c: "bg-red-500" };
  if (p.length < 8) return { w: "w-2/3", c: "bg-amber-500" };
  return { w: "w-full", c: "bg-emerald-500" };
};

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
    confirm: "",
    s1: false,
    s2: false,
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();

    if (!form.name) return toast.error("Name required.");
    if (!form.email.includes("@")) return toast.error("Invalid email.");
    if (form.pass.length < 6) return toast.error("Password too short.");
    if (form.pass !== form.confirm)
      return toast.error("Passwords do not match.");

    toast.success("Account created (demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <AnimatedWrapper className="w-full max-w-lg">
        <div className="
          p-10 rounded-2xl bg-white dark:bg-slate-900
          border border-slate-300 dark:border-slate-700
          shadow-xl
        ">

          {/* HEADER */}
          <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-slate-100">
            Create Account
          </h1>
          <p className="text-center text-slate-500 dark:text-slate-400 mt-2 mb-8">
            Join us and explore new styles
          </p>

          {/* GOOGLE BUTTON */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3 mb-6
                       border border-slate-300 dark:border-slate-700
                       bg-white dark:bg-slate-800 rounded-lg
                       hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />
            OR
            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="
                  w-full px-4 py-2 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                "
                value={form.name}
                onChange={change}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="
                  w-full px-4 py-2 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                "
                value={form.email}
                onChange={change}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={form.s1 ? "text" : "password"}
                  name="pass"
                  placeholder="••••••••"
                  className="
                    w-full px-4 py-2 pr-10 rounded-lg
                    bg-slate-100 dark:bg-slate-800
                    border border-slate-300 dark:border-slate-700
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                  value={form.pass}
                  onChange={change}
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, s1: !form.s1 })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {form.s1 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.pass && (
                <div className="h-1 mt-2 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`${strength(form.pass).w} ${strength(form.pass).c} h-full`} />
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={form.s2 ? "text" : "password"}
                  name="confirm"
                  placeholder="Repeat password"
                  className="
                    w-full px-4 py-2 pr-10 rounded-lg
                    bg-slate-100 dark:bg-slate-800
                    border border-slate-300 dark:border-slate-700
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                  value={form.confirm}
                  onChange={change}
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, s2: !form.s2 })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {form.s2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* SIGNUP BUTTON */}
            <button
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700
                         text-white font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm mt-6 text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default RegisterPage;
