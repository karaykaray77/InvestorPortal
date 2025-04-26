import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@shared/schema";
import { format, isAfter, isBefore, parseISO } from "date-fns";

export default function EventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
  });

  const eventTypes = [
    { value: "all", label: "All Events" },
    { value: "webinar", label: "Webinars" },
    { value: "conference", label: "Conferences" },
    { value: "workshop", label: "Workshops" },
    { value: "networking", label: "Networking" },
  ];

  // Filter events to upcoming and past
  const filterEvents = (events: Event[] = [], isPast = false) => {
    const now = new Date();
    return events.filter(event => {
      const eventDate = parseISO(event.startDate.toString());
      return isPast ? isBefore(eventDate, now) : isAfter(eventDate, now);
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Events</h1>
        <p className="text-neutral-600 mt-1">Attend virtual and in-person events to connect with the IR community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {eventTypes.map((type) => (
                  <Button 
                    key={type.value} 
                    variant={type.value === "all" ? "default" : "ghost"} 
                    className="justify-start w-full"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Events</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">event_available</span>
                  RSVP'd Events
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">event</span>
                  My Calendar
                </Button>
                <Button variant="ghost" className="justify-start w-full">
                  <span className="material-icons mr-2 text-sm">history</span>
                  Past Events
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Featured Event</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-neutral-500">JUN</p>
                <p className="text-xl font-bold text-neutral-800">15</p>
                <h3 className="text-base font-medium text-neutral-800 mt-2">NIRI Annual Conference</h3>
                <p className="text-xs text-neutral-600 mt-1">New York, NY • June 15-18, 2023</p>
                <Button size="sm" className="mt-3 w-full">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex-row justify-between items-center pb-2 border-b">
              <CardTitle>Upcoming Events</CardTitle>
              <Button>Create Event</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="upcoming" className="w-full">
                <div className="px-6 pt-4 border-b">
                  <TabsList className="grid w-60 grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="upcoming" className="m-0">
                  <div className="p-6">
                    <Input 
                      className="mb-6" 
                      placeholder="Search events..." 
                      prefixIcon={<span className="material-icons text-neutral-400 absolute left-3 top-2.5">search</span>}
                    />
                    
                    {isLoading ? (
                      <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-48 rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <>
                        {events && filterEvents(events).length > 0 ? (
                          <div className="space-y-6">
                            {filterEvents(events).map((event) => (
                              <Card key={event.id} className="overflow-hidden">
                                <div className="p-6 flex">
                                  <div className="flex-shrink-0 w-20 text-center">
                                    <p className="text-sm font-medium text-neutral-500">
                                      {format(new Date(event.startDate), "MMM").toUpperCase()}
                                    </p>
                                    <p className="text-3xl font-bold text-neutral-800">
                                      {format(new Date(event.startDate), "dd")}
                                    </p>
                                  </div>
                                  <div className="ml-6 flex-1">
                                    <h3 className="text-lg font-medium text-neutral-800">{event.title}</h3>
                                    <p className="text-sm text-neutral-600 mt-2">
                                      {event.isVirtual ? "Virtual Webinar" : event.location} • 
                                      {format(new Date(event.startDate), "h:mm a")} - 
                                      {format(new Date(event.endDate), "h:mm a z")}
                                    </p>
                                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                                      {event.description}
                                    </p>
                                    <div className="mt-4 flex items-center space-x-4">
                                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                                        {event.eventType}
                                      </Badge>
                                      <span className="text-xs text-neutral-500">{event.attendeeCount} attendees</span>
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                      RSVP
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-neutral-500">
                            <span className="material-icons text-5xl mb-2">event_busy</span>
                            <p>No upcoming events found</p>
                            <Button variant="outline" className="mt-4">
                              Create an event
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="past" className="m-0">
                  {isLoading ? (
                    <div className="p-6 space-y-6">
                      {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-48 rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <div className="p-6">
                      {events && filterEvents(events, true).length > 0 ? (
                        <div className="space-y-6">
                          {filterEvents(events, true).map((event) => (
                            <Card key={event.id} className="overflow-hidden opacity-75">
                              <div className="p-6 flex">
                                <div className="flex-shrink-0 w-20 text-center">
                                  <p className="text-sm font-medium text-neutral-500">
                                    {format(new Date(event.startDate), "MMM").toUpperCase()}
                                  </p>
                                  <p className="text-3xl font-bold text-neutral-800">
                                    {format(new Date(event.startDate), "dd")}
                                  </p>
                                </div>
                                <div className="ml-6 flex-1">
                                  <h3 className="text-lg font-medium text-neutral-800">{event.title}</h3>
                                  <p className="text-sm text-neutral-600 mt-2">
                                    {event.isVirtual ? "Virtual Webinar" : event.location} • 
                                    {format(new Date(event.startDate), "h:mm a")} - 
                                    {format(new Date(event.endDate), "h:mm a z")}
                                  </p>
                                  <div className="mt-4 flex items-center space-x-4">
                                    <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                                      {event.eventType}
                                    </Badge>
                                    <span className="text-xs text-neutral-500">{event.attendeeCount} attendees</span>
                                    <Badge variant="outline" className="bg-neutral-100 text-neutral-800">
                                      Ended
                                    </Badge>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <Button variant="outline" size="sm">
                                    View Recording
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-neutral-500">
                          <span className="material-icons text-5xl mb-2">history</span>
                          <p>No past events found</p>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
