import React from 'react';
import { CiSearch } from "react-icons/ci";
import { Input } from './ui/input';
import { cn } from "@/lib/utils";

const SearchBox = ({ className }) => {
  return (
    // The main container needs to be relative
    <div className={cn("relative max-w-md", className)}>
      <Input
        placeholder='Search here...'
        // Add more padding-right (pr-12) to make space for the button
        className="h-10 rounded-full bg-white border border-gray-200 shadow-sm pl-4 pr-12 w-[500px]"
      />

      {/* This is the button that wraps the icon */}
      <button
        type="submit"
        className="
          absolute left-[455px] top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-500
          hover:bg-gray-100 hover:text-gray-800
          active:scale-95
          transition-all duration-150 ease-in-out
        "
      >
        <CiSearch className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBox;