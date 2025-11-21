import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, LogIn, UserPlus, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk, selectIsAuthenticated } from "@/features/auth/authSlice";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthed = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login");
    }
  }, [isAuthed, navigate]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 md:px-6 sticky top-0 z-10 shadow-sm">
            <SidebarTrigger className="-ml-2" />
            <div className="ml-2 md:ml-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg md:text-xl">H</span>
              </div>
              <h1 className="text-sm md:text-xl font-semibold text-foreground hidden sm:block">Hospital Management System</h1>
              <h1 className="text-sm font-semibold text-foreground sm:hidden">HMS</h1>
            </div>

            {/* Desktop Menu */}
            <div className="ml-auto hidden md:flex items-center gap-2">
              <ThemeToggle />
              {!isAuthed ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/login")}
                    className="gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/signup")}
                    className="gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Signup
                  </Button>
                </>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={async () => {
                    await dispatch(logoutThunk());
                    navigate("/login");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="ml-auto flex md:hidden items-center gap-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {!isAuthed ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/login")}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/signup")}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Signup
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={async () => {
                          await dispatch(logoutThunk());
                          navigate("/login");
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-background to-muted/20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
