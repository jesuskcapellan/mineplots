import { getBuilds, getBuildsSchema } from "@/server/queries/builds";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const title = searchParams.get("title") ?? undefined;
        const tags = searchParams.getAll("tags") ?? undefined;
        const range = searchParams.get("range") ?? undefined;
        const sortBy = searchParams.get("sortBy") ?? undefined;
        const order = searchParams.get("order") ?? undefined;
        const skip = searchParams.get("skip") ?? undefined;
        const take = searchParams.get("take") ?? undefined;
        const input = {
            title,
            tags,
            range,
            sortBy,
            order,
            skip,
            take,
        };
        const parsedInput = getBuildsSchema.parse(input);
        const builds = await getBuilds(parsedInput);
        return NextResponse.json({ builds });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    message: "Invalid or missing parameters",
                    errors: error.errors.map(({ path, message }) => ({
                        field: path.join(":"),
                        message,
                    })),
                },
                { status: 400 }
            );
        }
        console.error("Error fetching builds:", error);
        return NextResponse.json(
            { error: "Failed to fetch builds" },
            { status: 500 }
        );
    }
}
