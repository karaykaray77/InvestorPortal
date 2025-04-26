import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import StatsOverview from "@/components/dashboard/stats-overview";
import UpcomingEvents from "@/components/dashboard/upcoming-events";
import CommunityDiscussions from "@/components/dashboard/community-discussions";
import RecentJobs from "@/components/dashboard/recent-jobs";
import ProfileCompletion from "@/components/dashboard/profile-completion";
import ResourceHighlights from "@/components/dashboard/resource-highlights";
import NetworkSuggestions from "@/components/dashboard/network-suggestions";
import IndustryNews from "@/components/dashboard/industry-news";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { user } = useAuth();
  
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const stats = [
    {
      label: "Profile Views",
      value: 248,
      change: 12,
      icon: "visibility",
      iconBg: "bg-blue-100",
      iconColor: "text-primary"
    },
    {
      label: "New Messages",
      value: 14,
      change: 5,
      icon: "chat",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      label: "Job Matches",
      value: 7,
      change: -3,
      icon: "work",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      label: "Resources Downloaded",
      value: 32,
      change: 9,
      icon: "download",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    }
  ];
  
  // Sample network suggestions
  const networkSuggestions = [
    {
      id: 1,
      name: "Michael Chen",
      title: "VP of Investor Relations",
      company: "FinTech Solutions",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
      connections: 12
    },
    {
      id: 2,
      name: "Aisha Washington",
      title: "IR Director",
      company: "Global Retail Group",
      avatarUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=100&auto=format&fit=crop",
      connections: 8
    },
    {
      id: 3,
      name: "James Norris",
      title: "IR Consultant",
      company: "Energy Sector Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
      connections: 5
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">
          Welcome back, {user?.fullName?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-neutral-600 mt-1">Here's what's happening in your IR world today.</p>
      </div>
      
      <StatsOverview stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <>
              <Skeleton className="w-full h-[250px] rounded-lg" />
              <Skeleton className="w-full h-[350px] rounded-lg" />
              <Skeleton className="w-full h-[350px] rounded-lg" />
            </>
          ) : (
            <>
              <UpcomingEvents events={dashboardData?.events || []} />
              <CommunityDiscussions discussions={dashboardData?.discussions || []} />
              <RecentJobs jobs={dashboardData?.jobs || []} />
            </>
          )}
        </div>
        
        <div className="space-y-6">
          <ProfileCompletion />
          
          {isLoading ? (
            <>
              <Skeleton className="w-full h-[250px] rounded-lg" />
              <Skeleton className="w-full h-[350px] rounded-lg" />
              <Skeleton className="w-full h-[250px] rounded-lg" />
            </>
          ) : (
            <>
              <ResourceHighlights resources={dashboardData?.resources || []} />
              <NetworkSuggestions suggestions={networkSuggestions} />
              <IndustryNews news={dashboardData?.news || []} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
