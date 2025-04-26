import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Person {
  id: number;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  connections: number;
}

interface NetworkSuggestionsProps {
  suggestions: Person[];
}

export default function NetworkSuggestions({ suggestions }: NetworkSuggestionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">People You May Know</CardTitle>
        <Link href="/network">
          <Button variant="link" className="text-sm font-medium text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-2">
        {suggestions.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No suggestions found.
          </div>
        ) : (
          suggestions.map((person) => (
            <div key={person.id} className="p-4 hover:bg-neutral-50 rounded-lg transition">
              <div className="flex items-center">
                <img src={person.avatarUrl} alt={person.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-neutral-800">{person.name}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{person.title} • {person.company}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{person.connections} mutual connection{person.connections !== 1 ? 's' : ''}</p>
                </div>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-3 py-1 h-auto text-xs">
                  Connect
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
