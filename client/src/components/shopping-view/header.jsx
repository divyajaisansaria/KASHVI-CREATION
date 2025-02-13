import { LogOut, Menu, ShoppingCart, Search, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import logo from "../../assets/logo.jpg";
import axios from "axios";


// Updated MenuItems with dropdowns and hover functionality with animation
function MenuItems({ isColumn = false }) {
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <nav className={`flex ${isColumn ? "flex-col gap-4" : "justify-center gap-6"} py-4 bg-[#F8F4F0] border-t shadow-sm`}>
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <div key={menuItem.id} className="group relative">
          {/* Main Menu Item */}
          <div
            onClick={() => handleItemClick(menuItem.path)}
            className="text-sm font-semibold text-gray-700 cursor-pointer transition-all duration-200 hover:text-[#b2996c] hover:scale-105"
          >
            {menuItem.label}
          </div>

          {/* Dropdown Menu for Submenu Items */}
          {menuItem.subMenu && (
            <div
              className="absolute left-0 w-56 bg-[#F8F4F0] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out transform origin-top"
            >
              <div className="py-2">
                {menuItem.subMenu.map((subItem) => (
                  <div
                    key={subItem.id}
                    onClick={() => handleItemClick(subItem.path)}
                    className="hover:bg-[#b2996c] hover:text-white px-4 py-2 cursor-pointer transition-all duration-200"
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

// HeaderRightContent for user and cart
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // import axios from "axios";

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {}, // Empty body
        { withCredentials: true } // ✅ Ensure cookies are sent
      );
  
      console.log(response.data.message); // Debugging
  
      // ✅ Clear token from localStorage (if stored there)
      localStorage.removeItem("token");
  
      // ✅ Redirect user after logout
      window.location.href = "/shop/home";
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };
  
  

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex items-center gap-4">
      {/* Shopping Cart */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems?.items?.length}
            </span>
          )}
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      {/* User Account Dropdown */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black transition-colors duration-200 cursor-pointer">
              <AvatarFallback className="text-white font-extrabold">
                {user?.userName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 bg-[#F8F4F0]">
            <DropdownMenuLabel className="text-[#b2996c]">Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")} className="hover:bg-[#b2996c] hover:text-white">
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="hover:bg-[#b2996c] hover:text-white">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 border border-[#0a373b] text-[#0a373b] hover:bg-[#085b60] hover:text-white transition-colors duration-200"
        >
          <UserCog className="h-4 w-4" />
          Login
        </Button>
      )}
    </div>
  );
}

// Main ShoppingHeader component
function ShoppingHeader() {
  const [searchQuery, setSearchQuery] = useState(""); // Manage search query
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchQuery) {
      navigate(`/shop/search?q=${searchQuery}`); // Navigate to search page with query
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          
          {/* Logo */}
          <Link to="/shop/home" className="flex items-center ml-4">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-110 md:h-14"
            />
          </Link>

          {/* Search Bar (Visible on Medium+ Screens) */}
          <div className="hidden sm:flex flex-1 align-center px-4">
            <div className="relative w-full mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery} // Controlled input
                onChange={(e) => setSearchQuery(e.target.value)} // Update query on change
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
                         transition-all duration-200
                         focus:ring-2 focus:ring-[#b2996c] focus:border-[#b2996c]
                         hover:border-[#b2996c] hover:shadow-md"
                style={{
                  '--tw-ring-color': '#b2996c',
                  '--tw-ring-opacity': '0.5'
                }}
              />
            </div>
          </div>

          {/* Right Content (Icons) - Hidden on Mobile */}
          <div className="hidden lg:flex">
            <HeaderRightContent />
          </div>

          {/* Search Button - Trigger Search */}
          <button
            onClick={handleSearchClick}
            className="lg:hidden p-2 bg-[#b2996c] text-white rounded-full"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="lg:hidden hover:border-[#b2996c] transition-all duration-200"
              >
                <Menu className="h-6 w-6 text-gray-600 hover:text-[#b2996c]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-[#F8F4F0]">
              <div className="flex flex-col gap-6 p-4">
                {/* Menu Items in Column */}
                <MenuItems isColumn />
                {/* Icons in Sidebar */}
                <HeaderRightContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Menu Bar Below Header - Hidden on Small Screens */}
      <div className="hidden lg:block">
        <MenuItems />
      </div>
    </>
  );
}

export default ShoppingHeader;
