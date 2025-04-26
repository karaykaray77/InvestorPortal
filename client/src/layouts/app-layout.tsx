import React, { ReactNode } from "react";
import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import Footer from "@/components/ui/footer";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-neutral-50">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
