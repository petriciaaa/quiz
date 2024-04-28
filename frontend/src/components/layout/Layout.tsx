import React from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Header />
      <main className="mt-20" style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
