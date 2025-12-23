import { Home, Users, UserPlus, Settings, Activity, Phone } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const topMenu = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Add Patient", url: "/add-patient", icon: UserPlus },

  { title: "Settings", url: "/settings", icon: Settings },
  // Public Pages
  { title: "Home Page", url: "/", icon: Home },
  { title: "About Us", url: "/about", icon: Users },
  { title: "Contact Us", url: "/contact", icon: Phone }
];

export function AppSidebar() {
  const { open, isMobile } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarRail />
      <SidebarContent>
        <SidebarHeader className="px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              H
            </div>
            {(open || isMobile) && <span className="font-semibold">HMS</span>}
          </div>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={open || isMobile ? undefined : item.title}
                    size={'default'}
                  >
                    <NavLink
                      to={item.url}
                      className="px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent font-medium"
                    >
                      <div className={open || isMobile ? "flex items-center gap-3" : "flex flex-col items-center"}>
                        <item.icon className="h-5 w-5" />
                        {open || isMobile ? <span>{item.title}</span> : null}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter />
      </SidebarContent>
    </Sidebar>
  );
}
