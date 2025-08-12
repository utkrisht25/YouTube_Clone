import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { SidebarProvider } from "@/components/ui/sidebar.jsx";
import TopBar from "@/components/Topbar.jsx";
import { AppSidebar } from "@/components/AppSidebar.jsx";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
       setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col">
        <TopBar onToggleSidebar={toggleSidebar} />
        <div className="flex flex-1 pt-16"> {/* pt-16 to account for fixed Topbar height */}
          <AppSidebar isOpen={isSidebarOpen} />
          <main 
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? 'ml-60' : 'ml-20'
            }`}
          >
            <div className="min-h-[calc(100vh-64px)] px-4 py-6">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
