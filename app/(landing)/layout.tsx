import Header from "@/app/components/landing/Header";
import Footer from "@/app/components/landing/Footer";
import SmoothScroll from "../components/SmoothScroll";
import LenisSmoothScroll from "../components/LenisSmoothScroll";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* <SmoothScroll> */}
      <LenisSmoothScroll>
        <main className="flex-1">{children}</main>
        <Footer />
      </LenisSmoothScroll>
      {/* </SmoothScroll> */}
    </>
  );
}
