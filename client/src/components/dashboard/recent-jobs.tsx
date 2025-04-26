import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@shared/schema";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

interface RecentJobsProps {
  jobs: Job[];
}

export default function RecentJobs({ jobs }: RecentJobsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">Recent Job Opportunities</CardTitle>
        <Link href="/marketplace">
          <Button variant="link" className="text-sm font-medium text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-0 py-0 divide-y divide-neutral-200">
        {jobs.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No job opportunities found.
          </div>
        ) : (
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
                  <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{job.description}</p>
                  <div className="mt-3 flex items-center space-x-3 flex-wrap">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                      {job.jobType}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">
                      {job.industry}
                    </Badge>
                    {job.tags && job.tags.slice(0, 1).map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                        {tag}
                      </Badge>
                    ))}
                    <span className="text-xs text-neutral-500 ml-auto">
                      Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                    </span>
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
