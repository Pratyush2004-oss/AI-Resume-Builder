import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Resume = pgTable('AI-Resume',
    {
        resumeId: varchar("id").notNull().primaryKey(),
        title: varchar("title").notNull(),
        userName: varchar("userName").notNull(),
        createdBy: varchar('Created By').notNull(),
        createdAt: varchar('Created At').notNull(),
    }
)