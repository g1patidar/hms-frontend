import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LayoutDashboard, User, Settings, LogOut, UserPlus, Users, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated, logoutThunk } from "@/features/auth/authSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isAuthed = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || location.pathname.includes("/dashboard") || location.pathname.includes("/patients") || location.pathname.includes("/settings")
                    ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg text-white font-bold text-xl">
                        S
                    </div>
                    <div>
                        <h1 className={cn("font-bold text-lg leading-tight",
                            (isScrolled || location.pathname !== "/") ? "text-foreground" : "text-slate-900 dark:text-white"
                        )}>
                            Shree Ram
                        </h1>
                        <p className="text-xs text-muted-foreground font-medium">
                            Physiotherapy & Cosmetic Clinic
                        </p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                                location.pathname === link.path
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-slate-700 dark:text-slate-200"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <ThemeToggle />

                    {isAuthed ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-900">
                                    <User className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Management</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    <span>Dashboard</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate("/patients")}>
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Patients</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate("/add-patient")}>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    <span>Add Patient</span>
                                </DropdownMenuItem>



                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Public Pages</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => navigate("/")}>
                                    <Home className="mr-2 h-4 w-4" />
                                    <span>Home Page</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate("/about")}>
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>About Us</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate("/contact")}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    <span>Contact Us</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => navigate("/settings")}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={async () => {
                                        await dispatch(logoutThunk());
                                        navigate("/login");
                                    }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link to="/login">
                            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-full px-6">
                                <LogIn className="h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-muted-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "text-base font-medium py-2 px-4 rounded-lg hover:bg-muted transition-colors",
                                location.pathname === link.path
                                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                    : "text-slate-700 dark:text-slate-200"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="px-4">
                        <ThemeToggle />
                    </div>
                    {isAuthed ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <User className="h-4 w-4" />
                                    Management Menu
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[calc(100vw-2rem)]" align="start">
                                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    <span>Dashboard</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/patients")}>
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Patients</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/add-patient")}>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    <span>Add Patient</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate("/settings")}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={async () => {
                                        await dispatch(logoutThunk());
                                        navigate("/login");
                                    }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link to="/login" className="w-full">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                <LogIn className="h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};
