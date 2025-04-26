import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export default function MarketplacePage() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["/api/jobs"],
  });

  const jobTypes = [
    { value: "all", label: "All Types" },
    { value: "full-time", label: "Full-time" },
    { value: "contract", label: "Contract" },
    { value: "part-time", label: "Part-time" },
    { value: "consulting", label: "Consulting" }
  ];

  const industries = [
    { value: "all", label: "All Industries" },
    { value: "tech", label: "Technology" },
    { value: "finance", label: "Financial Services" },
    { value: "health", label: "Healthcare" },
    { value: "energy", label: "Energy" },
    { value: "consumer", label: "Consumer Goods" }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Marketplace</h1>
        <p className="text-neutral-600 mt-1">Find job opportunities or offer your IR services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Search</h3>
                <Input placeholder="Keywords..." />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Job Type</h3>
                <div className="space-y-1">
                  {jobTypes.map((type) => (
                    <div key={type.value} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`type-${type.value}`}
                        className="rounded text-primary focus:ring-primary"
                        defaultChecked={type.value === "all"}
                      />
                      <label 
                        htmlFor={`type-${type.value}`}
                        className="ml-2 text-sm text-neutral-700"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Industry</h3>
                <div className="space-y-1">
                  {industries.map((industry) => (
                    <div key={industry.value} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`industry-${industry.value}`}
                        className="rounded text-primary focus:ring-primary"
                        defaultChecked={industry.value === "all"}
                      />
                      <label 
                        htmlFor={`industry-${industry.value}`}
                        className="ml-2 text-sm text-neutral-700"
                      >
                        {industry.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">bookmark</span>
                  Saved Jobs
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">history</span>
                  Recently Viewed
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">description</span>
                  My Applications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex-row justify-between items-center pb-2 border-b">
              <CardTitle>Job Opportunities</CardTitle>
              <Button>Post a Job</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="jobs" className="w-full">
                <div className="px-6 pt-4 border-b">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="jobs">Job Listings</TabsTrigger>
                    <TabsTrigger value="services">IR Services</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="jobs" className="m-0">
                  {isLoading ? (
                    <div className="space-y-4 p-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <Skeleton className="h-12 w-12 rounded" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex space-x-2">
                              <Skeleton className="h-4 w-20" />
                              <Skeleton className="h-4 w-20" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-200">
                      {jobs && jobs.length > 0 ? (
                        jobs.map((job) => (
                          <div key={job.id} className="p-6">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-12 w-12 rounded bg-neutral-100 flex items-center justify-center">
                                <span className="text-neutral-600 font-bold">
                                  {job.company.substring(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-base font-medium text-neutral-800">{job.title}</h3>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-green-600">{job.salary}</span>
                                    <button className="text-neutral-400 hover:text-neutral-600">
                                      <span className="material-icons">bookmark_border</span>
                                    </button>
                                  </div>
                                </div>
                                <p className="text-sm font-medium text-neutral-600 mt-0.5">
                                  {job.company} • {job.location}
                                </p>
                                <p className="text-sm text-neutral-600 mt-2">{job.description}</p>
                                <div className="mt-3 flex items-center space-x-3 flex-wrap">
                                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                                    {job.jobType}
                                  </Badge>
                                  <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">
                                    {job.industry}
                                  </Badge>
                                  {job.tags && job.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                                      {tag}
                                    </Badge>
                                  ))}
                                  <span className="text-xs text-neutral-500 ml-auto">
                                    Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                                  </span>
                                </div>
                                <div className="mt-4">
                                  <Button size="sm" variant="outline">View Details</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-muted-foreground">
                          No job listings found.
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="services" className="m-0">
                  <div className="p-6 text-center text-muted-foreground">
                    This section is coming soon. IR professionals will be able to advertise their consulting services here.
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
