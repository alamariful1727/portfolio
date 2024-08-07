import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import cn from "classnames";
import { navigation } from "config";

const ThemeToggleButton = dynamic(() => import("./ThemeToggleButton"));

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link
      href={href}
      className={cn(
        {
          "border-gray-600 font-semibold text-gray-700 dark:border-white dark:text-white":
            isActive,
          "border-transparent text-gray-600 hover:border-b hover:border-gray-400 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white":
            !isActive,
        },
        "border-b-2 pb-1 transition-all"
      )}
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <header className="px-6 pt-6 lg:px-8">
      <nav
        className="flex h-9 items-center justify-between"
        aria-label="Global"
      >
        <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Title</span>
            {mounted && (
              <svg
                className="h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47 40"
                fill="none"
              >
                <path
                  fill={resolvedTheme === "dark" ? "#fff" : "#000"}
                  d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z"
                />
                <defs>
                  <linearGradient
                    id="%%GRADIENT_ID%%"
                    x1="33.999"
                    x2="1"
                    y1="16.181"
                    y2="16.181"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="%%GRADIENT_TO%%" />
                    <stop offset="1" stopColor="%%GRADIENT_FROM%%" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end lg:gap-x-12">
          {mounted &&
            navigation.header.map(({ name, href }) => (
              <NavItem key={name} href={href} label={name} />
            ))}
          {mounted && <ThemeToggleButton />}
        </div>
      </nav>
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white p-6 dark:bg-black lg:hidden">
          <div className="flex h-9 items-center justify-between">
            <div className="flex">
              <Link
                href="/"
                className="-m-1.5 p-1.5"
                onClick={handleMobileMenuClose}
              >
                <span className="sr-only">Title</span>
                <svg
                  className="h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 47 40"
                  fill="none"
                >
                  <path
                    fill={resolvedTheme === "dark" ? "#fff" : "#000"}
                    d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z"
                  />
                  <defs>
                    <linearGradient
                      id="%%GRADIENT_ID%%"
                      x1="33.999"
                      x2="1"
                      y1="16.181"
                      y2="16.181"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="%%GRADIENT_TO%%" />
                      <stop offset="1" stopColor="%%GRADIENT_FROM%%" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
            </div>
            <div className="flex">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={handleMobileMenuClose}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/50">
              <div className="space-y-2 py-6">
                {navigation.header.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-center text-base font-semibold leading-7 text-gray-600 transition hover:bg-gray-400/10 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-400/40 dark:hover:text-white"
                    onClick={handleMobileMenuClose}
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <div className="py-6 text-center">
                <ThemeToggleButton />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
