import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebarAdmin/Sidebar";
import "./mainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
