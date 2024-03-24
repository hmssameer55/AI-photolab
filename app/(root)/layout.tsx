import MobileNav from "@/components/shared/mobileNav";
import Sidebar from "@/components/shared/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <div className="root-wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
