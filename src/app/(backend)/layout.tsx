import AdminNavbar from "@/components/custom/layout/admin/navbar";

function adminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminNavbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}

export default adminLayout;
