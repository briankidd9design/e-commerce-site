import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export default function AppLayout({ children }) {
  // Tailwind works by chaining different utility classes to apply different styles

  return (
    <div className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
      <header>Header</header>
      <main className="flex-grow bg-[#f7f7f7] ">{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
