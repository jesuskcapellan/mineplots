import { relations, sql } from "drizzle-orm";
import {
    pgEnum,
    pgTableCreator,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

export const tagsEnum = pgEnum("tags", [
    "resource farm",
    "xp farm",
    "art",
    "base",
    "redstone",
    "miscellaneous",
]);

const createTable = pgTableCreator((name) => `mineplots_${name}`);

export const builds = createTable("builds", {
    buildId: uuid("build_id")
        .unique()
        .default(sql`gen_random_uuid()`)
        .notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    tags: tagsEnum("tags").array().default([]).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const likes = createTable("likes", {
    likeId: uuid("like_id")
        .unique()
        .default(sql`gen_random_uuid()`)
        .notNull(),
    buildId: uuid("build_id").unique().notNull(),
    userId: varchar("user_id", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const views = createTable("views", {
    viewId: uuid("view_id")
        .unique()
        .default(sql`gen_random_uuid()`)
        .notNull(),
    buildId: uuid("build_id").unique().notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const comments = createTable("comments", {
    commentId: uuid("comment_id")
        .unique()
        .default(sql`gen_random_uuid()`)
        .notNull(),
    buildId: uuid("build_id").unique().notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const images = createTable("images", {
    imageId: uuid("image_id")
        .unique()
        .default(sql`gen_random_uuid()`)
        .notNull(),
    buildId: uuid("build_id").unique().notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const buildsRelations = relations(builds, ({ many }) => ({
    likes: many(likes),
    views: many(views),
    comments: many(comments),
}));

export const likesRelations = relations(likes, ({ one }) => ({
    build: one(builds, {
        fields: [likes.buildId],
        references: [builds.buildId],
    }),
}));

export const viewsRelations = relations(views, ({ one }) => ({
    build: one(builds, {
        fields: [views.buildId],
        references: [builds.buildId],
    }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    build: one(builds, {
        fields: [comments.buildId],
        references: [builds.buildId],
    }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
    build: one(builds, {
        fields: [images.buildId],
        references: [builds.buildId],
    }),
}));
