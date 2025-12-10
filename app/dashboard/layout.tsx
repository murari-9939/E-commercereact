import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />


        <main className="p-6 bg-white-100 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
