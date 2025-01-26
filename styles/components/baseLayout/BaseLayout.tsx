'use client';
import { ReactNode, useEffect, useLayoutEffect, useMemo } from 'react';
import Navbar from '../navbar/Navbar';
import SidebarNavigation from '../sidenav/SidebarNavigation';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/stores/authenticatorStore';

export default function BaseLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const noSidebarRoutes = ['/login', '/logout'];

    const showSidebar = !noSidebarRoutes.includes(pathname);

    const { user, setUser } = useStore();
    useMemo(() => {
        const userCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("user="))
            ?.split("=")[1];
        if (userCookie) {
            const u = JSON.parse(decodeURIComponent(userCookie));
            setUser(u);
        }
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {showSidebar && <Navbar />}
            <div style={{ display: 'flex', flex: '1', gap: '10px', justifyContent: 'center' }}>
                <div style={{ position: 'relative' }}>
                    {showSidebar && <SidebarNavigation />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '700px' }}>
                    {children}
                </div>
            </div>
        </div >
    );
}