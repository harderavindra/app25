import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-zinc-900">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">        <Outlet />
</main>
    </div>
  );
};

export default MainLayout;
