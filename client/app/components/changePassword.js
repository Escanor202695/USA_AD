// Import statements
import { useState } from "react";
import axios from "../../utils/axios.ts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Eye from "./svg/eye.js";
import ClosedEye from "./svg/closedEye.js";
// ... (other import statements)

// ChangePassword component
export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      if (newpassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await axios.post("/auth/local/changepassword", { password, newpassword });
      // Add logic to send a request to change the password
      // You can use axios.postlo or any other method to send the request

      // Simulating a successful password change
      toast.success("Password changed successfully!");
      setError(null);
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full bg-[#101827] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Change your password
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordField
              id="newpassword"
              label="New Password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <PasswordField
              id="confirmPassword"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div>
              <button
                type="submit"
                onClick={handleChangePassword}
                className="flex w-full justify-center rounded-md bg-[#F04D99] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#bd7ee5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change password
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}

// PasswordField component
function PasswordField({ id, label, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-white focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <ClosedEye /> : <Eye />}
        </button>
      </div>
    </div>
  );
}
