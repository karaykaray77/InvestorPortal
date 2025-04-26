import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("professional"), // professional or company
  title: text("title"),
  company: text("company"),
  industry: text("industry"),
  expertise: json("expertise").$type<string[]>(),
  certifications: json("certifications").$type<string[]>(),
  bio: text("bio"),
  location: text("location"),
  profileImage: text("profile_image"),
  profileCompleted: integer("profile_completed").default(0), // percentage complete
  createdAt: timestamp("created_at").defaultNow()
});

// Events schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventType: text("event_type").notNull(), // webinar, workshop, conference, etc.
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: text("location"),
  isVirtual: boolean("is_virtual").default(true),
  attendeeCount: integer("attendee_count").default(0),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});

// Discussions schema
export const discussions = pgTable("discussions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: json("tags").$type<string[]>(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  replyCount: integer("reply_count").default(0),
  isHot: boolean("is_hot").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

// Jobs schema
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  companyLogo: text("company_logo"),
  location: text("location").notNull(),
  description: text("description").notNull(),
  salary: text("salary"),
  jobType: text("job_type").notNull(), // full-time, contract, etc.
  industry: text("industry").notNull(),
  tags: json("tags").$type<string[]>(),
  postedBy: integer("posted_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Resources schema
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  resourceType: text("resource_type").notNull(), // PDF, PPTX, video, etc.
  fileSize: text("file_size"),
  thumbnailUrl: text("thumbnail_url"),
  downloadCount: integer("download_count").default(0),
  viewCount: integer("view_count").default(0),
  uploadedBy: integer("uploaded_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// News schema
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  source: text("source").notNull(),
  url: text("url").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  profileCompleted: true,
  createdAt: true
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  attendeeCount: true,
  createdAt: true
});

export const insertDiscussionSchema = createInsertSchema(discussions).omit({
  id: true,
  replyCount: true,
  isHot: true,
  createdAt: true
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  downloadCount: true,
  viewCount: true,
  createdAt: true
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  createdAt: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type InsertNews = z.infer<typeof insertNewsSchema>;

export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Discussion = typeof discussions.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type News = typeof news.$inferSelect;
