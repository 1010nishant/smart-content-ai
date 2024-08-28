"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideNav() {
  const menuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    // {
    //   name: "Billing",
    //   icon: WalletCards,
    //   path: "/dashboard/billing",
    // },
    // {
    //   name: "Setting",
    //   icon: Settings,
    //   path: "/dashboard/setting",
    // },
  ];
  const path = usePathname();
  return (
    <div className="h-screen p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Image src="/logo.svg" width={120} height={100} alt="logo" />
      </div>
      <hr className="my-6 border" />
      <div className="mt-3">
        {menuList.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={`flex items-center gap-3 mb-2 p-3 hover:bg-violet-300 hover:text-white rounded-lg cursor-pointer ${
              path === item.path && "bg-primary text-white"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <h2 className="text-lg">{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
