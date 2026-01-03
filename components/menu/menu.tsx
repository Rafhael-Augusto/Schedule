"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuIcon } from "lucide-react";
import { X as CloseIcon } from "lucide-react";

import { Button } from "../ui/button";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative flex justify-end overflow-x-clip">
      <div
        className={`absolute z-20 h-screen transition-all bg-zinc-900 duration-500 ${
          menuOpen ? "w-1/2" : "w-0"
        }`}
      >
        <div
          className={`absolute justify-center top-12 transition-all duration-500 ${
            menuOpen ? "left-1/2 -translate-x-1/2" : "left-0 -translate-x "
          }`}
        >
          <h2 className="text-2xl font-bold">Menu</h2>
        </div>
        <div className="mt-24">
          <ul>
            <li>
              <Link href={"/"}>
                <Button
                  size="sm"
                  variant={pathname === "/" ? "default" : "ghost"}
                >
                  Agenda
                </Button>
              </Link>
            </li>
            <li>
              <Link href={"/upload"}>
                <Button
                  size="sm"
                  variant={pathname === "/upload" ? "default" : "ghost"}
                >
                  Upload
                </Button>
              </Link>
            </li>
            <li>
              <Link href={"/history"}>
                <Button
                  size="sm"
                  variant={pathname === "/history" ? "default" : "ghost"}
                >
                  Historico
                </Button>
              </Link>
            </li>
            <li>
              <Link href={"/fixedSchedules"}>
                <Button
                  size="sm"
                  variant={pathname === "/fixedSchedules" ? "default" : "ghost"}
                >
                  Agendas Fixas
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        onClick={() => setMenuOpen(false)}
        className={`absolute h-screen w-screen z-10 ${
          menuOpen ? "block" : "hidden"
        }`}
      />

      <Button
        onClick={() => handleClick()}
        variant={"ghost"}
        className={`absolute transition-all duration-500 z-20 ${
          menuOpen ? "right-1/2 translate-x-6" : "right-2"
        }`}
      >
        <CloseIcon
          className={`absolute  scale-150 transition-all ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <MenuIcon
          className={`absolute scale-150 transition-all ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
      </Button>
    </div>
  );
}
