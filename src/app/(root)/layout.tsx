import { Header } from "@/components/header";
import Footer from "@/components/Footer";
import "../globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
