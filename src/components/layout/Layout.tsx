import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import SupportWidget from "@/components/layout/SupportWidget";

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  return <div className="app">
    <Header onSearch={() => setSearchOpen(true)} />
    <main id="top"><Outlet /></main>
    <Footer />
    <CartDrawer />
    {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    <SupportWidget />
  </div>;
}
