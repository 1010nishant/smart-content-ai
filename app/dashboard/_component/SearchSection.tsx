import { Search } from "lucide-react";
import React from "react";

function SearchSection({ onSearchInput }: any) {
  return (
    <div className="flex items-center justify-center p-10 from-purple-500 via-purple-700 to-blue-600 bg-gradient-to-br flex-col text-white">
      <h2 className="text-3xl font-bold">Browse all Templates</h2>
      <p>What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md w-[50%] bg-white my-5">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full outline-none text-black"
            onChange={(e) => onSearchInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
