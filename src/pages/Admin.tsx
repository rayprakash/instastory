
import { useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import Dashboard from "@/components/admin/Dashboard";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      {isLoggedIn ? (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default Admin;
