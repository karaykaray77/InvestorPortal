import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@shared/schema";
import { Link } from "wouter";
import { formatRelative, format } from "date-fns";

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
        <Link href="/events">
          <Button variant="link" className="text-sm font-medium text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-0 py-0 divide-y divide-neutral-200">
        {events.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No upcoming events found.
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="p-6 flex">
              <div className="flex-shrink-0 w-14 text-center">
                <p className="text-sm font-medium text-neutral-500">
                  {format(new Date(event.startDate), "MMM").toUpperCase()}
                </p>
                <p className="text-xl font-bold text-neutral-800">
                  {format(new Date(event.startDate), "dd")}
                </p>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-base font-medium text-neutral-800">{event.title}</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {event.isVirtual ? "Virtual " : ""} 
                  {event.location ? `• ${event.location} • ` : ""}
                  {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a z")}
                </p>
                <div className="mt-3 flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                    {event.eventType}
                  </Badge>
                  <span className="text-xs text-neutral-500">{event.attendeeCount} attendees</span>
                </div>
              </div>
              <div>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  RSVP
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
