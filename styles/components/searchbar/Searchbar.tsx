import styles from "./Searchbar.module.css";
import { GrFormSearch } from "react-icons/gr";

export default function Searchbar() {
    return (
        <div className={styles.searchbarContainer}>
            <div className={styles.placeholder}>
                <GrFormSearch className={styles.searchbarIcon} />
                <p>Search</p>
            </div>
            <input type="text" />
        </div>
    );
}