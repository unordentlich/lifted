'use client';
import { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import SidebarNavigation from '../sidenav/SidebarNavigation';
import { usePathname } from 'next/navigation';

export default function BaseLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const noSidebarRoutes = ['/login', '/logout'];

    const showSidebar = !noSidebarRoutes.includes(pathname);

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