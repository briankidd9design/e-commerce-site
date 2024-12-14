export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-100 py-10 text-center">
      <p className="text-sm text-gray-500">
        Copyright &copy; {currentYear} Brian&apos;s Store
      </p>
    </footer>
  );
}
