import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationLinkProps {
  href: string;
  label: string;
}
export const NavigationSidebarLink = ({ href, label }: NavigationLinkProps) => {
  const router = useRouter();
  const isActive = href === router.pathname;

  return isActive ? (
    <li className="my-2 p-2 bg-gray-600 rounded">{label}</li>
  ) : (
    <Link href={href}>
      <li className="my-2 p-2 underline hover:bg-gray-600 transition-colors rounded">
        {label}
      </li>
    </Link>
  );
};
