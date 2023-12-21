import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-100 text-gray-900 p-4 py-12">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <img
          src="/logo1.png"  // Replace with the path to your logo
          alt="Logo"
          className="mb-4"
          style={{ width: '100px', height: '50px',objectFit:"contain" }}  // Adjust the size as needed
        />

        {/* Contact Info */}
        <div className="text-center">
          <p className="mb-2">Email: NorahFAlfayez@gmail.com</p>
          <p className="mb-4">Phone: +966566492006</p>
          <p className="mb-4">Ext. 59806</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
