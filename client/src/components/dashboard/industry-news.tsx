import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { News } from "@shared/schema";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

interface IndustryNewsProps {
  news: News[];
}

export default function IndustryNews({ news }: IndustryNewsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">IR Industry News</CardTitle>
        <Link href="/resources/news">
          <Button variant="link" className="text-sm font-medium text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-0 py-0 divide-y divide-neutral-200">
        {news.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No news found.
          </div>
        ) : (
          news.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 hover:bg-neutral-50 transition"
            >
              <h3 className="text-sm font-medium text-neutral-800">{item.title}</h3>
              <p className="text-xs text-neutral-500 mt-1">{item.summary}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-neutral-600">{item.source}</span>
                <span className="text-xs text-neutral-500">
                  {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                </span>
              </div>
            </a>
          ))
        )}
      </CardContent>
    </Card>
  );
}
