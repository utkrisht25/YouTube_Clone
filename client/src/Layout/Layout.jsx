import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { SidebarProvider } from "@/components/ui/sidebar.jsx";
import TopBar from "@/components/Topbar.jsx";
import { AppSidebar } from "@/components/AppSidebar.jsx";

// Create a context for sharing sidebar state
export const SidebarContext = createContext({
  isSidebarOpen: true,
});

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider>
      <SidebarContext.Provider value={{ isSidebarOpen }}>
        <div className="h-screen flex flex-col">
          <TopBar onToggleSidebar={toggleSidebar} />
          <div className="flex flex-1 pt-16"> {/* pt-16 to account for fixed Topbar height */}
            <AppSidebar 
              isOpen={isSidebarOpen} 
              className={`${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden transition-all duration-300`}
            />
            <main 
              className="flex-1 transition-all duration-300"
            >
              <div className="min-h-[calc(100vh-100px)] py-6">
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
