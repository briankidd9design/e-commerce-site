import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    // Link allows us to nagigate from one page to another without doing a page reload.
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/logo.svg" alt="logo" width={42} height={42} />
      <span className="hidden sm:inline-block font-extrabold text-3xl text-gray-700">
        Brian&apos;s Store
      </span>
    </Link>
  );
}
