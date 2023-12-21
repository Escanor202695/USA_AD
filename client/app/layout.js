"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "./components/footer";
import MobileHeader from "./components/mobileHeader";
import Modal from "react-modal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Modal />
        <ToastContainer/>
        <Footer/>
      </body>
    </html>
  );
}
