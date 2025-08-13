import { Link, useNavigate } from "react-router-dom";
import SearchBox from './SearchBox';
import { Button } from './ui/button';
import { CgMenu } from "react-icons/cg"; // Hamburger menu icon
import { FaRegUserCircle } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri"; // Icon for 'Create'
import { IoMdNotificationsOutline } from "react-icons/io"; // Icon for 'Notifications'
import { RouteSignIn, RouteIndex, RouteCreateChannel } from "@/helpers/RouteName";
import { useDispatch, useSelector } from 'react-redux';
import { IoLogOutOutline } from 'react-icons/io5';
import logo from "@/assets/images/logo-dark.png"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from '@/assets/images/user.png';
import { FaPlus, FaRegUser } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";

import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import { removeUser } from '@/redux/user/user.slice';

const TopBar = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/logout`, {
        method: 'get',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return showToast('error', data.message);
      }
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  };

  // Debug logs to check the user data structure (comment out in production)
  // console.log('Full user state:', user);
  // console.log('User channels:', user.user?.channels);
  
  // Get last channel safely with optional chaining
  const lastChannel = user.user?.channels?.[user.user?.channels?.length - 1];

  return (
    // Main container: Responsive height, padding, and fixed positioning
    <div className='flex justify-between items-center h-12 sm:h-14 md:h-16 px-2 sm:px-4 md:px-6 fixed bg-white w-full z-20 border-b'>
      
      {/* LEFT SECTION: Hamburger + Logo - Compact on small screens */}
      <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-4">
        {/* --- HAMBURGER TOGGLE BUTTON --- */}
        <Button onClick={onToggleSidebar} variant="ghost" size="icon" className="rounded-full p-1 sm:p-2">
          <CgMenu size={18} className="sm:size-3 md:size-5" />
        </Button>
        <Link to={RouteIndex}>
          <img src={logo} alt="Logo" className="w-16 sm:w-20 md:w-28 mt-2 mb-2 ml-1 sm:ml-2 md:ml-4" />
        </Link>
      </div>

      {/* MIDDLE SECTION: Search Box - Full width on small, capped on large */}
      <div className='flex-grow flex justify-center px-1 sm:px-2 md:px-4 ml-2 sm:ml-4 md:ml-14'>
        <div className='w-full max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-xl'>
          <SearchBox />
        </div>
      </div>

      {/* RIGHT SECTION: Action Buttons - Icons shrink/hide on small screens */}
      <div className='flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 flex-shrink-0'>
        
        {/* --- 1. CHANNELS BUTTON - Hidden on small, visible on md+ --- */}
        <Button asChild variant="ghost" className='hidden md:flex items-center gap-1 sm:gap-2 rounded-full border px-2 sm:px-3 md:px-4'>
          <Link to="/channels">
            <RiVideoAddLine size={16} className="sm:size-2 md:size-5" />
            <span className="font-semibold hidden md:block text-sm md:text-base">Channels</span>
          </Link>
        </Button>

        {/* --- 2. NOTIFICATIONS BUTTON - Smaller on small screens --- */}
        <Button variant="ghost" size="icon" className="relative rounded-full p-1 sm:p-2">
          {/* Notification Dot */}
          <span className="absolute top-0.5 sm:top-1 md:top-2 right-0.5 sm:right-1 md:right-2 w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-red-600 rounded-full"></span>
          <IoMdNotificationsOutline size={18} className="sm:size-2 md:size-4" />
        </Button>

        {/* --- 3. SIGN IN / PROFILE BUTTON - Icon-only on small, full on large --- */}
        {!user.isLoggedIn ? 
          <Button asChild className='bg-transparent font-bold text-blue-600 rounded-full border hover:bg-blue-100 flex items-center gap-x-1 sm:gap-x-2 px-2 sm:px-3 py-1 sm:py-2'>
            <Link to={RouteSignIn}>
              <FaRegUserCircle size={16} className="sm:size-3 md:size-6" />
              <span className="hidden sm:block text-sm md:text-base">Sign In</span>
            </Link>
          </Button> 
          : <DropdownMenu>
            <DropdownMenuTrigger className="mr-1 sm:mr-2 md:mr-3">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                <AvatarImage src={user.user.avatar || usericon} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 sm:w-60 md:w-72 mr-1 sm:mr-2 md:mr-3">
              <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 p-1 sm:p-2 md:p-3">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <AvatarImage src={user.user.avatar || usericon} />
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold text-xs sm:text-sm md:text-base">{user.user.username}</p>
                  <p className="text-xs text-gray-500">{user.user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild className="focus:bg-gray-100">
                <Link 
                  to={lastChannel?._id 
                    ? `/channel/${lastChannel._id}`
                    : RouteCreateChannel} 
                  className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 p-1 sm:p-1.5 md:py-2 text-xs sm:text-sm md:text-base"
                >
                  <FaRegUser className="text-base sm:text-lg md:text-xl" />
                  <span>Your channel</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild className="focus:bg-gray-100">
                <Link to='' className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 p-1 sm:p-1.5 md:py-2 text-xs sm:text-sm md:text-base">
                  <FaPlus className="text-base sm:text-lg md:text-xl" />
                  <span>YouTube Studio</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="focus:bg-gray-100">
                <Link to='' className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 p-1 sm:p-1.5 md:py-2 text-xs sm:text-sm md:text-base">
                  <FaRegUserCircle className="text-base sm:text-lg md:text-xl" />
                  <div className="flex flex-col">
                    <span>Switch account</span>
                    <span className="text-xs text-gray-500">All your YouTube content</span>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="focus:bg-gray-100">
                <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 p-1 sm:p-1.5 md:py-2 text-xs sm:text-sm md:text-base">
                  <IoMdSettings className="text-base sm:text-lg md:text-xl" />
                  <span>Settings</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLogout} className="focus:bg-gray-100 text-red-600">
                <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 p-1 sm:p-1.5 md:py-2 text-xs sm:text-sm md:text-base">
                  <IoLogOutOutline className="text-base sm:text-lg md:text-xl" />
                  <span>Sign out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  );
};

export default TopBar;
