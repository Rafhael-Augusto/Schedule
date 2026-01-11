import Link from "next/link";

import { CalendarPlus, CalendarSync, FileUp } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Agendamentos",
    goTo: "/",
    icon: CalendarPlus,
  },
  {
    title: "Agendamentos Fixos",
    goTo: "/fixed-schedules",
    icon: CalendarSync,
  },
  {
    title: "Upload",
    goTo: "/upload",
    icon: FileUp,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.goTo}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
