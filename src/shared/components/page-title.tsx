'use client';

import { routes } from '@/shared/lib/routes';
import { usePathname } from 'next/navigation';

const flatRoutes = [...routes.main, ...routes.footer].flatMap((item) => [
  { title: item.title, url: item.url },
  ...(item.items ?? []),
]);

function getTitle(pathname: string) {
  const match = flatRoutes
    .filter(
      (route) => pathname === route.url || pathname.startsWith(`${route.url}/`),
    )
    .sort((a, b) => b.url.length - a.url.length)[0];

  return match?.title;
}

export function PageTitle() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  if (!title) return null;

  return <h1 className="text-base font-medium">{title}</h1>;
}
