import Navbar from "@/components/layout/Navbar";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Footer from "@/components/layout/Footer";
import FloatingCart from "@/components/layout/FloatingCart";
import CartDrawer from "@/components/layout/CartDrawer";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <div className="pt-[72px]">
            <CategoryNavbar />
            <main>{children}</main>
          </div>
          <Footer />
          <FloatingCart />
          <CartDrawer />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
