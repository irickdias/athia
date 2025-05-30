'use client'

import { useState } from "react";
import SidebarButton from "../SidebarButton";
import { usePathname } from 'next/navigation';

import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoIosGitBranch } from "react-icons/io";

export default function Sidebar() {
    const pathname = usePathname();

    // console.log(pathname)

    return(
        <aside className="w-[100px] h-[92vh] pt-8 flex flex-col items-center">
            <SidebarButton name="Home" url="/" active={pathname} icon={<AiOutlineHome className="w-6 h-6 fill-black dark:fill-white"/>}/>
            <SidebarButton name="Empresas" url="/companies" active={pathname}  icon={<HiOutlineBuildingOffice className="w-6 h-6 fill-black dark:fill-white"/>}/>
            <SidebarButton name="Setores" url="/sectors" active={pathname} icon={<IoIosGitBranch className="w-6 h-6 fill-black dark:fill-white"/>}/>
        </aside>
    );
}