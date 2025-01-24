'use client';
import { useRef, useState } from "react";
import styles from "./Searchbar.module.css";
import { GrFormSearch } from "react-icons/gr";

export default function Searchbar() {
    const [placeholderOpacity, setPlaceholderOpacity] = useState(1);
    const searchElement = useRef<HTMLInputElement>(null);
    
    return (
        <div className={styles.searchbarContainer}>
            <div className={styles.placeholder} style={{opacity: placeholderOpacity}}>
                <GrFormSearch className={styles.searchbarIcon} />
                <p>Search</p>
            </div>
            <input type="text" ref={searchElement} onFocus={() => {setPlaceholderOpacity(0)}} onBlur={() => {if(searchElement.current?.value.length === 0) setPlaceholderOpacity(1)}}/>
        </div>
    );
}