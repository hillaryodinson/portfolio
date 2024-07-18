import Footer from "@/components/custom/layout/public/footer";
import Navbar from "@/components/custom/layout/public/navbar";
import React from "react";

function publicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="grainy-light flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
        <div className="flex h-full flex-1 flex-col">{children}</div>
        <Footer />
      </main>
    </>
  );
}

export default publicLayout;
