import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Resource } from "@shared/schema";
import { Link } from "wouter";

interface ResourceHighlightsProps {
  resources: Resource[];
}

export default function ResourceHighlights({ resources }: ResourceHighlightsProps) {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">Popular Resources</CardTitle>
        <Link href="/resources">
          <Button variant="link" className="text-sm font-medium text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-2">
        {resources.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No resources found.
          </div>
        ) : (
          resources.map((resource) => {
            const { icon, bgColor, textColor } = getResourceIcon(resource.resourceType);
            return (
              <Link key={resource.id} href={`/resources/${resource.id}`}>
                <a className="block p-4 hover:bg-neutral-50 rounded-lg transition">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 ${bgColor} ${textColor} rounded-lg flex items-center justify-center`}>
                      <span className="material-icons">{icon}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-neutral-800">{resource.title}</h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        {resource.resourceType.toUpperCase()} 
                        {resource.fileSize ? ` • ${resource.fileSize}` : ''} 
                        {` • ${resource.downloadCount.toLocaleString()} download${resource.downloadCount !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
