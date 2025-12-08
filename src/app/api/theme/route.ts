import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/lib/get-server-user";
import { getUserTheme, setUserTheme } from "@/lib/theme";

export async function GET() {
	const user = await getServerUser();
	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const theme = getUserTheme(user.id);

	return NextResponse.json({ theme });
}

export async function POST(req: NextRequest) {
	const user = await getServerUser();
	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const { theme } = await req.json();

	if (theme !== "light" && theme !== "dark") {
		return new NextResponse("Invalid theme", { status: 400 });
	}

	await setUserTheme(user.id, theme);

	return NextResponse.json({ success: true });
}
