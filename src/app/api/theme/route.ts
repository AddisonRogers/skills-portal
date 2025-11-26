import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { getServerUser } from "@/lib/get-server-user";

type Theme = "light" | "dark";

export async function GET() {
	const user = await getServerUser();
	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const key = `theme:${user.id}`;
	const storedTheme = (await redis.get(key)) as Theme | null;

	return NextResponse.json({ theme: storedTheme });
}

export async function POST(req: NextRequest) {
	const user = await getServerUser();
	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const { theme } = (await req.json()) as { theme?: string };

	if (theme !== "light" && theme !== "dark") {
		return new NextResponse("Invalid theme", { status: 400 });
	}

	const key = `theme:${user.id}`;
	await redis.set(key, theme);

	return NextResponse.json({ success: true });
}
