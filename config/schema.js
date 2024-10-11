import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Resume = pgTable('AI-Resume',
    {
        resumeId: varchar("id").notNull().primaryKey(),
        title: varchar("title").notNull(),
        userName: varchar("userName").notNull(),
        createdBy: varchar('Created By').notNull(),
        createdAt: varchar('Created At').notNull(),
        firstName: varchar('firstName'),
        lastName: varchar('lastname'),
        address: varchar('address'),
        phone: varchar('phone'),
        email: varchar('email'),
        jobTitle: varchar('jobTitle'),
        summary: varchar('summary'),
    }
)