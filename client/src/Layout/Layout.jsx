import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const Layout = () => {
  return (
    //navbar
    <SidebarProvider>
      <TopBar />
      <AppSidebar />
      <main>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
