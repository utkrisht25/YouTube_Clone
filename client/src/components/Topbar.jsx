import logo from "@/assets/images/logo-dark.png"
import SearchBox from './SearchBox'
import { Button } from './ui/button';
import { Link , useNavigate } from 'react-router-dom';
import { CgMenu } from "react-icons/cg"; // Hamburger menu icon
import { FaRegUserCircle } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri"; // Icon for 'Create'
import { IoMdNotificationsOutline } from "react-icons/io"; // Icon for 'Notifications'
import { RouteSignIn , RouteIndex} from "@/helpers/RouteName";
import { useDispatch, useSelector } from 'react-redux';
import {IoLogOutOutline } from 'react-icons/io5';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/user.png'
import { FaPlus, FaRegUser } from 'react-icons/fa';
<<<<<<< HEAD
import { IoMdSettings } from "react-icons/io";
=======
>>>>>>> e67257f1e75d7194b2b0fadd90e28b4fa5eef8f6
import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import { removeUser } from '@/redux/user/user.slice';

const TopBar = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const handleLogout = async() =>{
      try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/logout`, {
                method: 'get',
                credentials: 'include',
                // creadentials include is neccessary to take the cookie and send it to backend
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispatch(removeUser())
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
  }
<<<<<<< HEAD
=======
  console.log('User state:', user);
>>>>>>> e67257f1e75d7194b2b0fadd90e28b4fa5eef8f6
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
        {!user.isLoggedIn ?   
        <Button asChild className='bg-transparent font-bold text-blue-600 rounded-full border hover:bg-blue-100 flex items-center gap-x-2 px-3 py-2'>
            <Link to={RouteSignIn} >
                <FaRegUserCircle size={20} />
                <span className="hidden sm:block">Sign In</span>
            </Link>
        </Button> 
        : <DropdownMenu>
<<<<<<< HEAD
                        <DropdownMenuTrigger className="mr-3">
                            <Avatar>
                                <AvatarImage src={user.user.avatar || usericon} />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72 mr-3">
                            <div className="flex items-center gap-x-3 p-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={user.user.avatar || usericon} />
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="font-semibold">{user.user.username}</p>
                                    <p className="text-sm text-gray-500">{user.user.email}</p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem asChild className="focus:bg-gray-100">
                                <Link to='' className="flex items-center gap-x-3 py-2">
                                    <FaRegUser className="text-xl" />
                                    <span>Your channel</span>
                                </Link>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem asChild className="focus:bg-gray-100">
                                <Link to='' className="flex items-center gap-x-3 py-2">
                                    <FaPlus className="text-xl" />
                                    <span>YouTube Studio</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild className="focus:bg-gray-100">
                                <Link to='' className="flex items-center gap-x-3 py-2">
                                    <FaRegUserCircle className="text-xl" />
                                    <div className="flex flex-col">
                                        <span>Switch account</span>
                                        <span className="text-xs text-gray-500">All your YouTube content</span>
                                    </div>
=======
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user.user.avatar || usericon } />
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <p>{user.user.username}</p>
                                <p className='text-sm'>{user.user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link to=''>
                                    <FaRegUser />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link to=''>
                                    <FaPlus />
                                    Create Blog
>>>>>>> e67257f1e75d7194b2b0fadd90e28b4fa5eef8f6
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

<<<<<<< HEAD
                            <DropdownMenuItem className="focus:bg-gray-100">
                                <div className="flex items-center gap-x-3 py-2">
                                    <IoMdSettings className="text-xl" />
                                    <span>Settings</span>
                                </div>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={handleLogout} className="focus:bg-gray-100 text-red-600">
                                <div className="flex items-center gap-x-3 py-2">
                                    <IoLogOutOutline className="text-xl" />
                                    <span>Sign out</span>
                                </div>
=======
                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                <IoLogOutOutline color='red' />
                                Logout
>>>>>>> e67257f1e75d7194b2b0fadd90e28b4fa5eef8f6
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
        
        }

      </div>
     </div>
  )
}

export default TopBar;