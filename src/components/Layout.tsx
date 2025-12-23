import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/features/auth/authSlice";

export function Layout() {
  const navigate = useNavigate();
  const isAuthed = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login");
    }
  }, [isAuthed, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-background to-muted/20 pt-24">
        <Outlet />
      </main>
    </div>
  );
}
