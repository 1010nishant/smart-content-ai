import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className=" flex justify-between p-5 shadow-sm bg-white border-b-2 items-center">
      <div className=" flex gap-2 items-center border p-2 rounded-md max-w-lg bg-white">
        <Search />
        <input type="text" size={35} placeholder="Search..." className="outline-none" />
      </div>
      <div>
        <h2 className="bg-primary p-1 rounded-full text-xs text-white px-2 ">
          {/* 🔥Join Membership just for $9.99/Month */}
          🔥Generate High Quailty Content With AI
        </h2>
      </div>
    </div>
  );
}

export default Header;
