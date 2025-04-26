import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Community", href: "/community", icon: "forum" },
  { label: "Marketplace", href: "/marketplace", icon: "storefront" },
  { label: "Resources", href: "/resources", icon: "library_books" },
  { label: "Events", href: "/events", icon: "event" },
];

const personalNavItems: NavItem[] = [
  { label: "My Profile", href: "/profile", icon: "person" },
  { label: "Messages", href: "/messages", icon: "mail", badge: 3 },
  { label: "My Network", href: "/network", icon: "group" },
  { label: "Saved Items", href: "/saved", icon: "bookmark" },
];

const utilityNavItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: "settings" },
  { label: "Help Center", href: "/help", icon: "help" },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <aside className="hidden md:block w-64 bg-sidebar border-r border-neutral-200 pt-6 flex flex-col h-full">
      <div className="px-4 mb-6">
        <div className="flex items-center">
          <img 
            src={user.profileImage || "https://via.placeholder.com/48?text=" + user.fullName.charAt(0)}
            alt="Profile" 
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-neutral-800">{user.fullName}</p>
            <p className="text-xs text-neutral-500">
              {user.title} {user.company ? `• ${user.company}` : ""}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="mt-2 flex-1 overflow-y-auto">
        <div className="px-4 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Main
        </div>
        {mainNavItems.map((item) => (
          <NavLink 
            key={item.href} 
            item={item} 
            isActive={location === item.href}
          />
        ))}
        
        <div className="px-4 mt-6 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Personal
        </div>
        {personalNavItems.map((item) => (
          <NavLink 
            key={item.href} 
            item={item} 
            isActive={location === item.href}
          />
        ))}
      </nav>
      
      <div className="mt-auto pb-6 px-4">
        {utilityNavItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className="flex items-center px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-primary rounded-md transition">
              <span className="material-icons text-neutral-500 mr-3 text-xl">{item.icon}</span>
              {item.label}
            </a>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function NavLink({ item, isActive }: { item: NavItem, isActive: boolean }) {
  return (
    <Link href={item.href}>
      <a className={cn(
        "flex items-center px-4 py-2 text-sm font-medium transition",
        isActive 
          ? "text-primary bg-primary-light/10 border-l-2 border-primary" 
          : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
      )}>
        <span className={cn(
          "material-icons mr-3 text-xl",
          isActive ? "text-primary" : "text-neutral-500"
        )}>
          {item.icon}
        </span>
        {item.label}
        {item.badge && (
          <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </a>
    </Link>
  );
}
