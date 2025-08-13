import React, { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { SidebarProvider } from "@/components/ui/sidebar.jsx";
import TopBar from "@/components/Topbar.jsx";
import { AppSidebar } from "@/components/AppSidebar.jsx";

// Custom hook for media queries (detects screen size changes)
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Create a context for sharing sidebar state
export const SidebarContext = createContext({
  isSidebarOpen: true,
});

const Layout = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)'); // lg breakpoint for desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(isLargeScreen); // Open by default on large, closed on small

  // Auto-adjust sidebar open state based on screen size
  useEffect(() => {
    setIsSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider>
      <SidebarContext.Provider value={{ isSidebarOpen }}>
        <div className="h-screen flex flex-col">
          <TopBar onToggleSidebar={toggleSidebar} isLargeScreen={isLargeScreen} /> {/* Pass isLargeScreen for hamburger */}
          <div className="flex flex-1 pt-12 sm:pt-14 md:pt-16"> {/* Responsive pt to account for fixed Topbar height */}
            <AppSidebar 
              isOpen={isSidebarOpen} 
              className={`
                ${isSidebarOpen ? 'w-48 sm:w-60 md:w-64' : 'w-0'} 
                overflow-hidden transition-all duration-300 
                lg:w-64 lg:block 
                ${!isLargeScreen && isSidebarOpen ? 'fixed top-12 sm:top-14 md:top-16 left-0 h-[calc(100vh-3rem)] sm:h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] z-50 bg-white shadow-lg' : ''}
                ${!isLargeScreen && !isSidebarOpen ? 'hidden' : 'block'}
              `}
            />
            <main 
              className="flex-1 transition-all duration-300"
            >
              <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] py-4 sm:py-5 md:py-6">
                <Outlet />
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </SidebarContext.Provider>
    </SidebarProvider>
  );
};

export default Layout;
