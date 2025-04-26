import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Discussion, User } from "@shared/schema";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

interface CommunityDiscussionsProps {
  discussions: Array<Discussion & { author?: User }>;
}

export default function CommunityDiscussions({ discussions }: CommunityDiscussionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">Latest Discussions</CardTitle>
        <Link href="/community">
          <Button variant="link" className="text-sm font-medium text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-0 py-0 divide-y divide-neutral-200">
        {discussions.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No discussions found.
          </div>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion.id} className="p-6">
              <div className="flex items-start">
                <img 
                  src={discussion.author?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(discussion.author?.fullName || 'User')}&background=random`} 
                  alt="Avatar" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-neutral-800">{discussion.title}</h3>
                    <span className="text-xs text-neutral-500">
                      {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{discussion.content}</p>
                  <div className="mt-3 flex items-center space-x-4 flex-wrap">
                    <span className="inline-flex items-center text-xs font-medium text-neutral-500">
                      <span className="material-icons text-sm mr-1">forum</span>
                      {discussion.replyCount} replies
                    </span>
                    {discussion.isHot && (
                      <span className="inline-flex items-center text-xs font-medium text-neutral-500">
                        <span className="material-icons text-sm mr-1">trending_up</span>
                        Hot topic
                      </span>
                    )}
                    {discussion.tags && discussion.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
