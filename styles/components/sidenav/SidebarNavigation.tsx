import styles from "../navbar/Navbar.module.css";
import * as Icons from "react-icons/gr";
import { IconType } from "react-icons";

export default function SidebarNavigation() {

    const menu = [
        {
            name: "Trending",
            icon: "GrDeploy",
            position: "top"
        },
        {
            name: "Following",
            icon: "GrUserNew",
            position: "top",
            active: true
        },
        {
            name: "Bookmarks",
            icon: "GrBookmark",
            position: "top"
        },
        {
            name: "Settings",
            icon: "GrSettingsOption",
            position: "bottom"
        },
        {
            name: "About",
            icon: "GrContactInfo",
            position: "bottom"
        }
    ]

    return (
        <nav className={styles.sidebarNavigation}>
            <ul className={styles.top}>
                {menu.filter(i => i.position === 'top').map((item, index) => {
                    const Icon: IconType | undefined = Icons[item.icon as keyof typeof Icons];

                    return (
                        <li key={index}>
                            <a href="#" className={styles.navigationItem + (item.active ? " " + styles.active : "")}>
                                <Icon />
                                {item.name}
                            </a>
                        </li>
                    )
                })}
            </ul>
            <ul className={styles.bottom}>
                {menu.filter(i => i.position === 'bottom').map((item, index) => {
                    const Icon: IconType | undefined = Icons[item.icon as keyof typeof Icons];

                    return (
                        <li key={index}>
                            <a href="#" className={styles.navigationItem + (item.active ? " " + styles.active : "")}>
                                <Icon />
                                {item.name}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

}