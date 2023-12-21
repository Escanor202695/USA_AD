import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-[#f04d99] py-6   w-full">
      <div className="container mx-auto flex justify-center items-center">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/reset-password" className="hover:underline">Reset Password</a>
            </li>
            <li>
              <a href="/login" className="hover:underline">Login</a>
            </li>
            <li>
              <a href="/register" className="hover:underline">Register Account</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact Us</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
