import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertDiscussionSchema, insertEventSchema, insertJobSchema, insertNewsSchema, insertResourceSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Error handler for Zod validation errors
  const handleZodError = (err: unknown, res: any) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ message: validationError.message });
    }
    throw err;
  };

  // Dashboard data endpoint
  app.get("/api/dashboard", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // Get dashboard data
    Promise.all([
      storage.getEvents(2),
      storage.getDiscussions(2),
      storage.getJobs(2),
      storage.getResources(3),
      storage.getNews(2)
    ])
    .then(([events, discussions, jobs, resources, news]) => {
      res.json({
        events,
        discussions,
        jobs,
        resources,
        news
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to load dashboard data" });
    });
  });

  // Events endpoints
  app.get("/api/events", (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    storage.getEvents(limit)
      .then(events => {
        res.json(events);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to load events" });
      });
  });
  
  app.post("/api/events", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const eventData = insertEventSchema.parse({
        ...req.body,
        createdBy: req.user.id
      });
      
      storage.createEvent(eventData)
        .then(event => {
          res.status(201).json(event);
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to create event" });
        });
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Discussions endpoints
  app.get("/api/discussions", (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    storage.getDiscussions(limit)
      .then(discussions => {
        res.json(discussions);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to load discussions" });
      });
  });
  
  app.post("/api/discussions", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const discussionData = insertDiscussionSchema.parse({
        ...req.body,
        authorId: req.user.id
      });
      
      storage.createDiscussion(discussionData)
        .then(discussion => {
          res.status(201).json(discussion);
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to create discussion" });
        });
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Jobs endpoints
  app.get("/api/jobs", (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    storage.getJobs(limit)
      .then(jobs => {
        res.json(jobs);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to load jobs" });
      });
  });
  
  app.post("/api/jobs", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const jobData = insertJobSchema.parse({
        ...req.body,
        postedBy: req.user.id
      });
      
      storage.createJob(jobData)
        .then(job => {
          res.status(201).json(job);
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to create job" });
        });
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Resources endpoints
  app.get("/api/resources", (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    storage.getResources(limit)
      .then(resources => {
        res.json(resources);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to load resources" });
      });
  });
  
  app.post("/api/resources", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const resourceData = insertResourceSchema.parse({
        ...req.body,
        uploadedBy: req.user.id
      });
      
      storage.createResource(resourceData)
        .then(resource => {
          res.status(201).json(resource);
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to create resource" });
        });
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // News endpoints
  app.get("/api/news", (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    storage.getNews(limit)
      .then(news => {
        res.json(news);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to load news" });
      });
  });
  
  app.post("/api/news", (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") return res.sendStatus(403);
    
    try {
      const newsData = insertNewsSchema.parse(req.body);
      
      storage.createNews(newsData)
        .then(newsItem => {
          res.status(201).json(newsItem);
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to create news item" });
        });
    } catch (err) {
      handleZodError(err, res);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
