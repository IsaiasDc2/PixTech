import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AccountPage from "@/pages/AccountPage";
import BuilderPage from "@/pages/BuilderPage";
import AdminPage from "@/pages/AdminPage";
import { AboutPage, ContactPage, NotFoundPage, PaymentResultPage } from "@/pages/InfoPages";

export default function App() {
  return <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="productos" element={<CatalogPage />} />
      <Route path="producto/:id" element={<ProductDetailPage />} />
      <Route path="carrito" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="cuenta" element={<AccountPage />} />
      <Route path="armar" element={<BuilderPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="acerca" element={<AboutPage />} />
      <Route path="contactanos" element={<ContactPage />} />
      <Route path="pago-exito" element={<PaymentResultPage tipo="exito" />} />
      <Route path="pago-pendiente" element={<PaymentResultPage tipo="pendiente" />} />
      <Route path="pago-fallido" element={<PaymentResultPage tipo="fallido" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>;
}
