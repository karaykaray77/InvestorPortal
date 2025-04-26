import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export default function CommunityPage() {
  const { data: discussions, isLoading } = useQuery({
    queryKey: ["/api/discussions"],
  });

  const categories = [
    { value: "all", label: "All Topics" },
    { value: "earnings", label: "Earnings" },
    { value: "esg", label: "ESG" },
    { value: "compliance", label: "Compliance" },
    { value: "events", label: "Events" },
    { value: "careers", label: "Careers" }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Community</h1>
        <p className="text-neutral-600 mt-1">Join discussions with other IR professionals and share your insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button 
                    key={category.value} 
                    variant={category.value === "all" ? "default" : "ghost"} 
                    className="justify-start w-full"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">star</span>
                  Popular Threads
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">bolt</span>
                  Hot Topics
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">bookmark</span>
                  Saved Discussions
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">person</span>
                  My Contributions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex-row justify-between items-center pb-2 border-b">
              <CardTitle>Discussions</CardTitle>
              <Button>Start a Discussion</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="recent" className="w-full">
                <div className="px-6 pt-4 border-b">
                  <TabsList className="grid w-60 grid-cols-2">
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="recent" className="m-0">
                  {isLoading ? (
                    <div className="space-y-4 p-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-200">
                      {discussions && discussions.length > 0 ? (
                        discussions.map((discussion) => (
                          <div key={discussion.id} className="p-6">
                            <div className="flex items-start">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(discussion.author?.fullName || 'User')}&background=random`} 
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
                                <p className="text-sm text-neutral-600 mt-1">{discussion.content}</p>
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
                      ) : (
                        <div className="p-6 text-center text-muted-foreground">
                          No discussions found. Be the first to start a discussion!
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="popular" className="m-0">
                  <div className="p-6 text-center text-muted-foreground">
                    Popular discussions will appear here.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
