import { Link, useNavigate } from "react-router-dom";
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
  SidebarGroupLabel,
} from "../components/ui/sidebar.jsx";
import { useSelector } from "react-redux";
import { RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import logo from "@/assets/images/logo-dark.png";
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
import { cn } from "@/lib/utils.js";

// Helper component to keep the main code clean
const SidebarNavItem = ({ isOpen, icon, to = "/", children }) => {
  const Icon = icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          // Base styles for the button
          "flex items-center w-full rounded-lg text-gray-700 hover:bg-gray-100",
          // Conditional styles based on 'isOpen'
          isOpen
            ? "gap-x-2 sm:gap-x-3 p-1.5 sm:p-2" // When OPEN: horizontal layout with padding
            : "h-14 sm:h-18 flex-col justify-center gap-y-0.5 sm:gap-y-1 p-0.5 sm:p-1" // When COLLAPSED: vertical layout
        )}
      >
        <Link to={to}>
          <Icon size={18} className="sm:hidden flex-shrink-0" />
          <Icon size={22} className="hidden sm:block flex-shrink-0" />
          <span
            className={cn(
              // Conditional styles for the text
              isOpen 
                ? "text-xs sm:text-sm font-medium" 
                : "text-[8px] sm:text-[9px]"
            )}
          >
            {children}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar({ isOpen }) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Handles sign in click and ensures redirect back to current page
  const handleSignInClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath !== "/sign-in") {
      sessionStorage.setItem("redirectAfterLogin", currentPath);
    }
    navigate(RouteSignIn);
  };

  return (
    <Sidebar
      className={cn(
        "left-0 top-16 h-[calc(100vh-64px)] transition-all duration-300 ease-in-out bg-white z-10",
        isOpen ? "w-48 sm:w-60" : "w-16 sm:w-[72px]"
      )}
    >
      <SidebarHeader className="bg-white">
        <Link to={RouteIndex}>
          <img src={logo} alt="logo image" className="w-24 sm:w-32 md:w-[120px]" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* Using the new, cleaner component */}
            <SidebarNavItem isOpen={isOpen} icon={FaHome} to={RouteIndex}>
              Home
            </SidebarNavItem>
            <SidebarNavItem isOpen={isOpen} icon={SiYoutubeshorts} to="/shorts">
              Shorts
            </SidebarNavItem>
            <SidebarNavItem
              isOpen={isOpen}
              icon={MdOutlineSubscriptions}
              to="/subscriptions"
            >
              Subscriptions
            </SidebarNavItem>

            <SidebarSeparator className={cn(!isOpen && "my-1")} />

            <SidebarNavItem isOpen={isOpen} icon={FaUserCircle} to="/you">
              You
            </SidebarNavItem>
            <SidebarNavItem isOpen={isOpen} icon={FaHistory} to="/history">
              History
            </SidebarNavItem>
          </SidebarMenu>
        </SidebarGroup>
        {isOpen && !isLoggedIn && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm m-4">
                Sign in to like videos, comments and subscribe.
              </SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="bg-transparent ">
                    <Button
                      onClick={handleSignInClick}
                      className="cursor-pointer bg-transparent font-bold text-blue-600 rounded-full border hover:bg-blue-200 flex items-center gap-x-2"
                    >
                      <FaRegUserCircle size={20} />
                      <span>Sign in</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-black text-base sm:text-lg px-2">
                Explore
              </SidebarGroupLabel>
              <SidebarMenu className="text-sm sm:text-base">
                <SidebarMenuItem>
                  <SidebarMenuButton className="p-1.5 sm:p-2">
                    <FiShoppingBag className="text-lg sm:text-xl" />
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
            </SidebarGroup>{" "}
          </>
        )}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
