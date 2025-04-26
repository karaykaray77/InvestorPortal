import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Resource } from "@shared/schema";

export default function ResourcesPage() {
  const [resourceType, setResourceType] = useState<string>("all");
  
  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/resources"],
  });

  const resourceCategories = [
    { value: "all", label: "All Resources" },
    { value: "templates", label: "Templates" },
    { value: "guides", label: "Guides & Best Practices" },
    { value: "whitepapers", label: "Whitepapers" },
    { value: "presentations", label: "Presentations" },
    { value: "compliance", label: "Compliance Materials" }
  ];

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return { icon: 'description', bgColor: 'bg-blue-100', textColor: 'text-primary' };
      case 'pptx':
      case 'presentation':
        return { icon: 'table_chart', bgColor: 'bg-amber-100', textColor: 'text-amber-600' };
      case 'video':
        return { icon: 'play_circle', bgColor: 'bg-purple-100', textColor: 'text-purple-600' };
      case 'doc':
      case 'docx':
        return { icon: 'article', bgColor: 'bg-sky-100', textColor: 'text-sky-600' };
      default:
        return { icon: 'insert_drive_file', bgColor: 'bg-neutral-100', textColor: 'text-neutral-600' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Resources</h1>
        <p className="text-neutral-600 mt-1">Access IR templates, whitepapers, and best practices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Resource Types</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {resourceCategories.map((category) => (
                  <Button 
                    key={category.value} 
                    variant={resourceType === category.value ? "default" : "ghost"} 
                    className="justify-start w-full"
                    onClick={() => setResourceType(category.value)}
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
                  <span className="material-icons mr-2 text-sm">trending_up</span>
                  Most Downloaded
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">new_releases</span>
                  Recently Added
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">bookmark</span>
                  Saved Resources
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">cloud_upload</span>
                  My Uploads
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex-row justify-between items-center pb-2 border-b">
              <CardTitle>IR Resources</CardTitle>
              <Button>Upload Resource</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="library" className="w-full">
                <div className="px-6 pt-4 border-b">
                  <TabsList className="grid w-60 grid-cols-2">
                    <TabsTrigger value="library">Resource Library</TabsTrigger>
                    <TabsTrigger value="news">IR News</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="library" className="m-0">
                  <div className="p-6">
                    <Input 
                      className="mb-6" 
                      placeholder="Search resources..." 
                      icon="search"
                      prefixIcon={<span className="material-icons text-neutral-400 absolute left-3 top-2.5">search</span>}
                    />
                    
                    {isLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <Skeleton key={i} className="h-40 rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <>
                        {resources && resources.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map((resource: Resource) => {
                              const { icon, bgColor, textColor } = getResourceIcon(resource.resourceType);
                              return (
                                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition">
                                  <div className="flex h-full">
                                    <div className={`${bgColor} ${textColor} p-6 flex items-center justify-center`}>
                                      <span className="material-icons text-3xl">{icon}</span>
                                    </div>
                                    <div className="p-4 flex-1">
                                      <h3 className="font-medium text-neutral-800">{resource.title}</h3>
                                      <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{resource.description}</p>
                                      <div className="mt-3 flex items-center text-xs text-neutral-500">
                                        <span className="flex items-center">
                                          <span className="material-icons text-sm mr-1">description</span>
                                          {resource.resourceType.toUpperCase()}
                                        </span>
                                        {resource.fileSize && (
                                          <span className="flex items-center ml-3">
                                            <span className="material-icons text-sm mr-1">sd_card</span>
                                            {resource.fileSize}
                                          </span>
                                        )}
                                        <span className="flex items-center ml-3">
                                          <span className="material-icons text-sm mr-1">download</span>
                                          {resource.downloadCount}
                                        </span>
                                      </div>
                                      <Button size="sm" variant="outline" className="mt-3">
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-neutral-500">
                            <span className="material-icons text-5xl mb-2">folder_open</span>
                            <p>No resources found</p>
                            <Button variant="outline" className="mt-4">
                              Upload your first resource
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="news" className="m-0">
                  <div className="p-6 text-center text-muted-foreground">
                    IR News section is coming soon.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex-row justify-between items-center pb-2 border-b">
              <CardTitle>Featured Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">2023 IR Benchmarking Report</h3>
                <p className="text-sm text-neutral-700 mb-4">
                  Discover how top companies are evolving their IR strategies in 2023. This comprehensive report includes 
                  insights from over 200 IR professionals across industries.
                </p>
                <Button>
                  <span className="material-icons mr-2">download</span>
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
