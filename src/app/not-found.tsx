import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen h-full gap-4">
            <h1 className="text-2xl font-bold">Not Found</h1>
            <p className="text-center text-muted-foreground">
                Could not find requested resource
            </p>
            <Link href="/">Go to Home</Link>
        </div>
    );
}
