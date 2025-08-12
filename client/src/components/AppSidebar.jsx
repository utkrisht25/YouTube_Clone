import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroupLabel
} from "../components/ui/sidebar.jsx";
import logo from "@/assets/images/logo-dark.png"
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdMusicalNotes } from "react-icons/io";
import { PiFilmSlateDuotone } from "react-icons/pi";
import { MdLiveTv } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineNewspaper } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { FaGraduationCap } from "react-icons/fa";
import { GiHanger } from "react-icons/gi";
import { MdOutlinePodcasts } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegFlag } from "react-icons/fa6";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { Button } from "./ui/button.jsx";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='bg-white'>
        <img src={logo} alt="logo image" width={120} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <FaHome />
                        <Link to="/">Home</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <SiYoutubeshorts />
                        <Link to="/">Shorts</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <MdOutlineSubscriptions />
                        <Link to="/">Subscriptions</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <FaUserCircle />
                        <Link to="/">You</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <FaHistory />
                        <Link to="/">History</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarGroupLabel className='text-sm m-4'>
               Sign in to like videos, comments and subscribe.
            </SidebarGroupLabel>
            <SidebarMenu>
             <SidebarMenuItem>
                    <SidebarMenuButton className='bg-transparent '>
                       
                        <Button className='cursor-pointer bg-transparent text-blue-600 rounded-full border hover:bg-blue-200' >
                             <FaRegUserCircle />
                            sign in
                        </Button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
            <SidebarGroupLabel className='text-black text-lg'>
                Explore
            </SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <FiShoppingBag />
                        <Link to="/">Shopping</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoMdMusicalNotes />
                        <Link to="/">Music</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <PiFilmSlateDuotone />
                        <Link to="/">Films</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <MdLiveTv />
                        <Link to="/">Live</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoGameControllerOutline />
                        <Link to="/">Gaming</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <MdOutlineNewspaper />
                        <Link to="/">News</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <GoTrophy />
                        <Link to="/">Sport</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <FaGraduationCap />
                        <Link to="/">Courses</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <GiHanger />
                        <Link to="/">Fashion & Beauty</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <MdOutlinePodcasts />
                        <Link to="/">Podcast</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
         <SidebarSeparator />
         <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoSettingsSharp />
                        <Link to="/">Settings</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton>
                        <FaRegFlag />
                        <Link to="/">Report History</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton>
                        <IoMdHelpCircleOutline />
                        <Link to="/">Help</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton>
                        <RiFeedbackLine />
                        <Link to="/">Send feedback</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
         </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}