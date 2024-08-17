// src/components/NavHeader.tsx
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/NavigationMenu';
import { Link, NavLink } from 'react-router-dom';

type NavLink = {
  name: string;
  path: string;
};

type NavHeaderProps = {
  links: NavLink[];
};

export function HeaderNav({ links }: NavHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">MyLogo</Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {links.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => {
                    return isActive ? 'text-red-400' : 'text-black';
                  }}
                >
                  {link.name}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
