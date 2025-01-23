'use client';
import styles from "../navbar/Navbar.module.css";
import * as Icons from "react-icons/gr";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import path from "path";
import Link from "next/link";

export default function SidebarNavigation() {
    const pathname = usePathname();

    console.log(pathname);

    const menu = [
        {
            name: "Trending",
            icon: "GrDeploy",
            position: "top",
            path: "/trending",
            active: false
        },
        {
            name: "Following",
            icon: "GrUserNew",
            position: "top",
            path: "/following",
            active: false
        },
        {
            name: "Bookmarks",
            icon: "GrBookmark",
            position: "top",
            path: "/bookmarks",
            active: false
        },
        {
            name: "Settings",
            icon: "GrSettingsOption",
            position: "bottom",
            path: "/settings",
            active: false
        },
        {
            name: "About",
            icon: "GrContactInfo",
            position: "bottom",
            path: "/about",
            active: false
        }
    ];

    const activeItem = menu.find(i => i.name.toLowerCase() === pathname.replace('/', ''));
    if (activeItem) {
        activeItem.active = true;
    }

    return (
        <nav className={styles.sidebarNavigation}>
            <ul className={styles.top}>
                {menu.filter(i => i.position === 'top').map((item, index) => {
                    const Icon: IconType | undefined = Icons[item.icon as keyof typeof Icons];

                    return (
                        <li key={index}>
                            <Link href={item.path} className={styles.navigationItem + (item.active ? " " + styles.active : "")}>
                                <Icon />
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <ul className={styles.bottom}>
                {menu.filter(i => i.position === 'bottom').map((item, index) => {
                    const Icon: IconType | undefined = Icons[item.icon as keyof typeof Icons];

                    return (
                        <li key={index}>
                            <Link href={item.path} className={styles.navigationItem + (item.active ? " " + styles.active : "")}>
                                <Icon />
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

}