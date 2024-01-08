import React from "react";

function Loader() {
  return (
    <div
      role="status"
      className="flex h-[100vh] bg-black justify-center items-center "
    >
<div className="h-10 w-10 rounded-full border-b-4 border-pink-500 animate-spin">
</div>
    </div>
  );
}

export default Loader;
