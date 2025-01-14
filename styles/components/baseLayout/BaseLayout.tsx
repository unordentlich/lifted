import { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import SidebarNavigation from '../sidenav/SidebarNavigation';

export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Navbar />
            <div style={{ display: 'flex', flex: '1', gap: '10px', justifyContent: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <SidebarNavigation />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '700px' }}>
                    {children}
                </div>
            </div>
        </div >
    );
}