import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <section className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </section>
      <section className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </section>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
