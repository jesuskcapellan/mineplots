import { db } from "@/server/db";
import { builds, likes, tagsEnum, views } from "../db/schema";
import {
    and,
    arrayOverlaps,
    asc,
    count,
    desc,
    eq,
    gt,
    like,
} from "drizzle-orm";
import { subDays, subMonths, subWeeks } from "date-fns";
import { z } from "zod";

export const getBuildsSchema = z.object({
    skip: z.coerce.number().optional().default(0),
    take: z
        .enum(["10", "25", "50"])
        .default("25")
        .transform((val) => parseInt(val, 10)),
    sortBy: z.enum(["likes", "views"]).default("likes"),
    order: z.enum(["asc", "desc"]).default("desc"),
    range: z.enum(["day", "week", "month", "all"]).default("all"),
    title: z.string().optional(),
    tags: z.array(z.enum(tagsEnum.enumValues)).default([]),
});

export async function getBuilds(props: z.infer<typeof getBuildsSchema>) {
    const { skip, take, title, tags, sortBy, order, range } = props;
    const filters = [];
    const now = new Date();

    if (title) {
        filters.push(like(builds.title, `%${title}%`));
    }

    if (tags.length > 0) {
        filters.push(arrayOverlaps(builds.tags, tags));
    }

    switch (range) {
        case "day":
            filters.push(gt(builds.createdAt, subDays(now, 1)));
            break;
        case "week":
            filters.push(gt(builds.createdAt, subWeeks(now, 1)));
            break;
        case "month":
            filters.push(gt(builds.createdAt, subMonths(now, 1)));
            break;
    }

    const sortColumn =
        sortBy === "likes" ? count(likes.likeId) : count(views.viewId);

    return await db
        .select({
            buildId: builds.buildId,
            title: builds.title,
            description: builds.description,
            tags: builds.tags,
            coverImageUrl: builds.coverImageUrl,
            likeCount: count(likes.likeId),
            viewCount: count(views.viewId),
            createdAt: builds.createdAt,
            updatedAt: builds.updatedAt,
        })
        .from(builds)
        .leftJoin(views, eq(views.buildId, builds.buildId))
        .leftJoin(likes, eq(likes.buildId, builds.buildId))
        .where(and(...filters))
        .groupBy(
            builds.buildId,
            builds.title,
            builds.description,
            builds.tags,
            builds.coverImageUrl,
            builds.createdAt,
            builds.updatedAt
        )
        .orderBy(order === "asc" ? asc(sortColumn) : desc(sortColumn))
        .limit(take)
        .offset(skip);
}
