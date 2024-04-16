import React from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="mt-10" style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
