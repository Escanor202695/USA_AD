"use client";

import { useState, useEffect } from "react";
import axios from "../../../utils/axios.ts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const sendCode = async () => {
    try {
      setIsCodeSending(true);
      // Make a POST request to send the code
      const response = await axios.post("/auth/local/forgetPassword", {
        email,
      });
      console.log(response.data);
      toast.success(response.data.message);
      setIsCodeSent(true);
    } catch (error) {
      console.error("Sending code failed:", error.response.data.error);
      toast.error("Failed to send code. Please check your email.");
    } finally {
      setIsCodeSending(false);
    }
  };

  const resetPassword = async () => {
    try {
      setIsResetting(true);
      // Make a POST request to reset the password
      const response = await axios.post("/auth/local/receiveotp", {
        email: email,
        otp: code,
      });
      toast.success(response.data.message);
      setOtpVerified(true);
    } catch (error) {
      console.error("Password reset failed:", error.response.data.error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  const handleNewPassword = async () => {
    try {
      setIsResetting(true);
      const response = await axios.post("/auth/local/newpassword", {
        email: email,
        otp: code,
        newpassword: newPassword,
      });
      toast.success(response.data.message);
      router.push("/");
    } catch (error) {
      console.error("Password reset failed:", error.response.data.error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <div className="flex bg-black min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Forgot Password
          </h2>
        </div>

        {!otpVerified && (
          <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {isCodeSent ? (
                <>
                  <form className="space-y-6" action="#" method="POST">
                    <div>
                      <label
                        htmlFor="code"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Verification Code
                      </label>
                      <div className="mt-2">
                        <input
                          id="code"
                          name="code"
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={resetPassword}
                        disabled={isResetting}
                        className="flex w-full justify-center rounded-md bg-[#F04D99] hover:bg-[#bd7ee5]   px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Verify Otp
                      </button>
                    </div>

                    <p className="text-center">
                      Didn&apos;t receieve?{" "}
                      <span
                        onClick={sendCode}
                        className="flex w-full justify-center rounded-md bg-[#F04D99] hover:bg-[#bd7ee5]   px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Resend
                      </span>
                    </p>
                  </form>
                </>
              ) : (
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={sendCode}
                      disabled={isCodeSending}
                      className="flex w-full justify-center rounded-md bg-[#F04D99] hover:bg-[#bd7ee5]  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd7ee5]"
                    >
                      {isCodeSending ? "Sending Code..." : "Send Code"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}

        {otpVerified && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="newPassword"
                    autoComplete="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleNewPassword}
                  className="flex w-full justify-center rounded-md bg-[#F04D99] hover:bg-[#bd7ee5]    px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
