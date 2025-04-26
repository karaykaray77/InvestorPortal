import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function ProfileCompletion() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const profileCompletion = user.profileCompleted || 0;
  const remainingItems = [];
  
  if (!user.certifications || (user.certifications as string[]).length === 0) {
    remainingItems.push({ label: "Add your certifications", icon: "add", href: "/profile" });
  }
  
  if (!user.company) {
    remainingItems.push({ label: "Add your company", icon: "add", href: "/profile" });
  }
  
  if (!user.bio) {
    remainingItems.push({ label: "Complete your bio", icon: "add", href: "/profile" });
  }
  
  // Limit to 3 items
  const displayItems = remainingItems.slice(0, 3);
  
  return (
    <Card>
      <CardHeader className="pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">{profileCompletion}% complete</span>
          <span className="text-xs text-primary font-medium">{remainingItems.length} item{remainingItems.length !== 1 ? 's' : ''} left</span>
        </div>
        <Progress value={profileCompletion} className="h-2.5" />
        
        <div className="mt-4 space-y-3">
          {displayItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <a className="flex items-center text-sm font-medium text-neutral-700 hover:text-primary transition">
                <span className="material-icons text-neutral-400 mr-2 text-lg">{item.icon}</span>
                {item.label}
              </a>
            </Link>
          ))}
        </div>
        
        <Link href="/profile">
          <Button className="mt-4 w-full" variant="outline">
            Complete Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
