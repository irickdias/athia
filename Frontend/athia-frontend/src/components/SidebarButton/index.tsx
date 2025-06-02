'use client'

import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation'

interface SidebarButtonProps {
    name: string;
    url: string;
    active: string;
    icon: React.ReactNode;
}
export default function SidebarButton(props: SidebarButtonProps) {
    const router = useRouter();
    const isActive =
        (props.active === props.url) || // Se a URL ativa for exatamente igual à URL do botão
        (props.url !== "/" && props.active.startsWith(props.url)) || // Ou se a URL ativa começa com a URL do botão (para rotas filhas)
        (props.url === "/" && props.active === "/"); // E se a URL for "/" e a rota ativa também for "/"

    // console.log(props.active.replace(/\//g, ''));

    return (
        <Tooltip title={props.name} placement='right'>
            <button
                onClick={() => router.push(props.url)}
                className={`w-12 h-12 m-2 rounded-sm border-1 border-primary hover:shadow-[0px_1px_10px] hover:shadow-purple-200 transition-all flex items-center justify-center hover:cursor-pointer ${isActive ? 'bg-primary-light' : ''} `}
            >
                {props.icon}
            </button>
        </Tooltip>

    );
}