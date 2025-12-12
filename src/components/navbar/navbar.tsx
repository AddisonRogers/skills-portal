import Link from "next/link";
import { cn } from "@/lib/utils";
import AvatarOrLogin from "@/components/navbar/avatarOrLogin/avatarOrLogin";

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Learn", href: "/learn" },
	{ name: "Skills", href: "/skills" },
	{ name: "Certifications", href: "/certifications" },
	{ name: "Projects", href: "/projects" },
	{ name: "People", href: "/people" },
	{ name: "AI", href: "/ai" },
	{ name: "Admin Panel", href: "/admin" },
];

export default async function Navbar() {
	return (
		<nav className="flex w-full px-4 bg-muted backdrop-blur border-b border-gray-200 shadow-sm sticky justify-between items-center">
			<div className="flex items-start justify-baseline">
				{navLinks.map((link) => (
					<Link
						key={link.name}
						href={link.href}
						className={cn(
							"inline-block px-4 py-2 font-medium text-black transition-colors duration-150 relative",
							"hover:text-primary hover:font-semibold" +
								" focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
							"after:content-[''] after:block after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-200 after:absolute after:left-0 after:right-0 after:-bottom-1 hover:after:scale-x-100",
						)}
					>
						{link.name}
					</Link>
				))}
			</div>

			<div className="inline-block px-4 py-2 font-medium text-black mt-1">
				<AvatarOrLogin />
			</div>
		</nav>
	);
}
