"use client";

import { useState, useEffect } from "react";
import axios from "../../utils/axios.ts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NavBar from "../components/navbar.js";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
    //
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post("/auth/local/login", {
        email,
        password,
      });
      console.log(response.data);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      toast.success("Login Successful!");
      if (token) {
        router.push("/home");
      }
      setError(null);
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.response.data.error);
      toast.error("Email or password wrong!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-full bg-[#101827] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/user/forgot-password"
                    className="font-semibold text-[#F04D99]  hover:text-[#bd7ee5]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-[#F04D99]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#bd7ee5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600 ">{error}</p>
          )}

          <p className="mt-10 text-center text-sm text-white">
            Not a member?{" "}
            <a
              href="/user/signup"
              className="font-semibold leading-6 text-[#F04D99]   hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
