import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Header() {
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/community", label: "Community" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/resources", label: "Resources" },
    { href: "/events", label: "Events" },
  ];
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">IR</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-primary hidden md:block">IR Connect</span>
              </a>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-10 space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className="text-neutral-600 font-medium hover:text-primary transition">
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Right section */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Search IR Connect..."
                  className="w-64 pl-10 pr-4 py-2 text-sm"
                />
                <span className="material-icons absolute left-3 top-2 text-neutral-400 text-sm">search</span>
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="material-icons">notifications</span>
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </div>
              
              {/* Messages */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="material-icons">chat</span>
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </div>
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 rounded-full">
                    <div className="flex items-center text-sm">
                      <img 
                        src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`}
                        alt="Profile" 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="hidden md:block ml-2 text-sm font-medium text-neutral-700">
                        {user.fullName}
                      </span>
                      <span className="material-icons text-neutral-500 ml-1">keyboard_arrow_down</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <a className="cursor-pointer w-full">My Profile</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <a className="cursor-pointer w-full">Settings</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="cursor-pointer"
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Log out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="material-icons">
                  {mobileMenuOpen ? "close" : "menu"}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden",
        mobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a 
                className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-neutral-200">
            <div className="mt-3 px-2 space-y-1">
              <Link href="/profile">
                <a 
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </a>
              </Link>
              <Link href="/settings">
                <a 
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </a>
              </Link>
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
