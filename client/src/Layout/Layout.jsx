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
    //navbar
    <SidebarProvider>
      <TopBar onToggleSidebar={toggleSidebar} />
      <AppSidebar isOpen={isSidebarOpen} />
      <main className="w-full">
        <div className="w-full min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
