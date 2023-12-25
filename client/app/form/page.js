"use client"
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import ViewForm from "./ViewForm";

export default function FormPage() {
  return (
    <>
    <div className="bg-[#101827] flex flex-col h-auto min-h-[100vh] overflow-scroll overflow-x-hidden">
    <NavBar/>
    <ViewForm />
    <Footer/>
    </div>
    </>
  )
}