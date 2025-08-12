import logo from "@/assets/images/logo-dark.png"
import SearchBox from './SearchBox'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { CgMenu } from "react-icons/cg"; // Hamburger menu icon
import { FaRegUserCircle } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri"; // Icon for 'Create'
import { IoMdNotificationsOutline } from "react-icons/io"; // Icon for 'Notifications'
import { RouteSignIn } from "@/helpers/RouteName";


const TopBar = ({ onToggleSidebar }) => {
  return (
     // Main container: Keeps everything in a row, spaced out
     <div className='flex justify-between items-center h-16 px-4 fixed bg-white w-full z-20 border-b'>

      {/* LEFT SECTION: Logo + hamsburg */}
      <div className="flex items-center gap-x-4">
        {/* --- HAMBURGER TOGGLE BUTTON --- */}
        <Button onClick={onToggleSidebar} variant="ghost" size="icon" className="rounded-full">
          <CgMenu size={24} />
        </Button>
        <button>
          <img src={logo} alt="Logo" className="w-28 ml-8 mt-3 mb-3" />
        </button>
      </div>

      {/* MIDDLE SECTION: Search Box */}
      {/* This container will grow and shrink, but not more than the max-width */}
      <div className='flex-grow flex justify-center px-4 ml-14'>
        <div className='w-full max-w-lg'>
          <SearchBox />
        </div>
      </div>

      {/* RIGHT SECTION: Action Buttons */}
      <div className='flex items-center gap-x-3 flex-shrink-0'>

        {/* --- 1. CREATE BUTTON --- */}
        <Button variant="ghost" className='hidden md:flex items-center gap-2 rounded-full border px-4'>
          <RiVideoAddLine size={22} />
          <span className="font-semibold">Create</span>
        </Button>

        {/* --- 2. NOTIFICATIONS BUTTON --- */}
        <Button variant="ghost" size="icon" className="relative rounded-full">
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
          <IoMdNotificationsOutline size={24} />
        </Button>

        {/* --- 3. SIGN IN / PROFILE BUTTON --- */}
        <Button asChild className='bg-transparent font-bold text-blue-600 rounded-full border hover:bg-blue-100 flex items-center gap-x-2 px-3 py-2'>
            <Link to={RouteSignIn} >
                <FaRegUserCircle size={20} />
                <span className="hidden sm:block">Sign In</span>
            </Link>
        </Button>

      </div>
     </div>
  )
}

export default TopBar;