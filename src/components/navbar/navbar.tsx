import Link from 'next/link';
import { cn } from '@/lib/utils';
import AvatarOrLogin from '@/components/navbar/avatarOrLogin/avatarOrLogin';
import { ThemeToggle } from '../ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'People', href: '/people' },
  { name: 'Profile', href: '/profile' },
  { name: 'AI', href: '/ai' },
  { name: 'Admin Panel', href: '/admin' },
];

export default async function Navbar() {
  return (
    <nav className="flex w-full px-4 bg-muted border-b border-gray-200 shadow-sm sticky justify-between items-center py-2 font-medium">
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              'transition-colors duration-150 relative',
              'hover:text-primary hover:font-semibold' +
                ' focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
              "after:content-[''] after:block after:h-0.5 after:bg-primary after:scale-x-0 " +
                'after:transition-transform after:duration-200 after:absolute after:left-0 ' +
                'after:right-0 after:-bottom-1 hover:after:scale-x-100',
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-row gap-4">
        <ThemeToggle />
        <AvatarOrLogin />
      </div>
    </nav>
  );
}
