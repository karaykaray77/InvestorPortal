import { users, type User, type InsertUser, events, type Event, type InsertEvent, discussions, type Discussion, type InsertDiscussion, jobs, type Job, type InsertJob, resources, type Resource, type InsertResource, news, type News, type InsertNews } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;

  // Event operations
  getEvents(limit?: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Discussion operations
  getDiscussions(limit?: number): Promise<Discussion[]>;
  createDiscussion(discussion: InsertDiscussion): Promise<Discussion>;

  // Job operations
  getJobs(limit?: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;

  // Resource operations
  getResources(limit?: number): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;

  // News operations
  getNews(limit?: number): Promise<News[]>;
  createNews(newsItem: InsertNews): Promise<News>;

  // Session store for authentication
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private eventsData: Map<number, Event>;
  private discussionsData: Map<number, Discussion>;
  private jobsData: Map<number, Job>;
  private resourcesData: Map<number, Resource>;
  private newsData: Map<number, News>;
  
  private userIdCounter: number;
  private eventIdCounter: number;
  private discussionIdCounter: number;
  private jobIdCounter: number;
  private resourceIdCounter: number;
  private newsIdCounter: number;
  
  sessionStore: session.SessionStore;

  constructor() {
    this.usersData = new Map();
    this.eventsData = new Map();
    this.discussionsData = new Map();
    this.jobsData = new Map();
    this.resourcesData = new Map();
    this.newsData = new Map();
    
    this.userIdCounter = 1;
    this.eventIdCounter = 1;
    this.discussionIdCounter = 1;
    this.jobIdCounter = 1;
    this.resourceIdCounter = 1;
    this.newsIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Initialize with sample data
    this.initSampleData();
  }
  
  private initSampleData() {
    // Add sample data if needed during development
    // This will be removed or commented out in production
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    
    const profileCompleted = this.calculateProfileCompletion(insertUser);
    
    const user: User = { 
      ...insertUser, 
      id,
      profileCompleted,
      createdAt: now
    };
    
    this.usersData.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const existingUser = await this.getUser(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...userData };
    
    // Recalculate profile completion
    updatedUser.profileCompleted = this.calculateProfileCompletion(updatedUser);
    
    this.usersData.set(id, updatedUser);
    return updatedUser;
  }
  
  private calculateProfileCompletion(user: Partial<User>): number {
    const requiredFields = ['username', 'email', 'fullName', 'title', 'company', 'industry', 'bio', 'location'];
    let count = 0;
    
    for (const field of requiredFields) {
      if (user[field as keyof Partial<User>]) {
        count++;
      }
    }
    
    // Add extra percentage for expertise, certifications, profile image
    if (user.expertise && (user.expertise as string[]).length > 0) count++;
    if (user.certifications && (user.certifications as string[]).length > 0) count++;
    if (user.profileImage) count++;
    
    return Math.round((count / (requiredFields.length + 3)) * 100);
  }

  // Event operations
  async getEvents(limit?: number): Promise<Event[]> {
    const events = Array.from(this.eventsData.values());
    // Sort by date, newest first
    events.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    return limit ? events.slice(0, limit) : events;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const now = new Date();
    
    const newEvent: Event = {
      ...event,
      id,
      attendeeCount: 0,
      createdAt: now
    };
    
    this.eventsData.set(id, newEvent);
    return newEvent;
  }

  // Discussion operations
  async getDiscussions(limit?: number): Promise<Discussion[]> {
    const discussions = Array.from(this.discussionsData.values());
    // Sort by date, newest first
    discussions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return limit ? discussions.slice(0, limit) : discussions;
  }

  async createDiscussion(discussion: InsertDiscussion): Promise<Discussion> {
    const id = this.discussionIdCounter++;
    const now = new Date();
    
    const newDiscussion: Discussion = {
      ...discussion,
      id,
      replyCount: 0,
      isHot: false,
      createdAt: now
    };
    
    this.discussionsData.set(id, newDiscussion);
    return newDiscussion;
  }

  // Job operations
  async getJobs(limit?: number): Promise<Job[]> {
    const jobs = Array.from(this.jobsData.values());
    // Sort by date, newest first
    jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return limit ? jobs.slice(0, limit) : jobs;
  }

  async createJob(job: InsertJob): Promise<Job> {
    const id = this.jobIdCounter++;
    const now = new Date();
    
    const newJob: Job = {
      ...job,
      id,
      createdAt: now
    };
    
    this.jobsData.set(id, newJob);
    return newJob;
  }

  // Resource operations
  async getResources(limit?: number): Promise<Resource[]> {
    const resources = Array.from(this.resourcesData.values());
    // Sort by download count, highest first
    resources.sort((a, b) => b.downloadCount - a.downloadCount);
    return limit ? resources.slice(0, limit) : resources;
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const id = this.resourceIdCounter++;
    const now = new Date();
    
    const newResource: Resource = {
      ...resource,
      id,
      downloadCount: 0,
      viewCount: 0,
      createdAt: now
    };
    
    this.resourcesData.set(id, newResource);
    return newResource;
  }

  // News operations
  async getNews(limit?: number): Promise<News[]> {
    const news = Array.from(this.newsData.values());
    // Sort by published date, newest first
    news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return limit ? news.slice(0, limit) : news;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const id = this.newsIdCounter++;
    const now = new Date();
    
    const newNews: News = {
      ...newsItem,
      id,
      createdAt: now
    };
    
    this.newsData.set(id, newNews);
    return newNews;
  }
}

export const storage = new MemStorage();
