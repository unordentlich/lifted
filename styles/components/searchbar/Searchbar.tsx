'use client';
import moment from "moment";
import Link from "next/link";
import { Key, useRef, useState } from "react";
import { GrChat, GrFormSearch } from "react-icons/gr";
import Avatar from "../avatar/Avatar";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
    const [placeholderOpacity, setPlaceholderOpacity] = useState(1);
    const searchElement = useRef<HTMLInputElement>(null);
    const [searchResults, setSearchResults] = useState<any>([]);
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const [searchFailed, setSearchFailed] = useState(false);

    let timeout: NodeJS.Timeout;
    const inputChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 3) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fetch(`/api/search?value=${event.target.value}`).then((res) => res.json()).then((data) => {
                    setSearchResults(data);
                    if (data.length === 0) {
                        setSearchFailed(true);
                        setTimeout(() => {
                            setSearchFailed(false);
                        }, 2000);
                    } else {
                        setSearchFailed(false);
                    }
                });
            }, 500);
        } else if (event.target.value.length === 0) {
            setSearchResults([]);
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <div className={styles.searchbarContainer}>
                <div className={styles.placeholder} style={{ opacity: placeholderOpacity }}>
                    <GrFormSearch className={styles.searchbarIcon} />
                    <p>Search</p>
                </div>
                <input type="text" ref={searchElement} style={{ outlineColor: searchFailed ? 'rgba(205, 87, 87, 0.4)' : '' }} onChange={inputChangeEventHandler} onFocus={() => { setPlaceholderOpacity(0); setSearchResultsVisible(true) }} onBlur={() => { if (searchElement.current?.value.length === 0) setPlaceholderOpacity(1); setTimeout(() => { setSearchResultsVisible(false) }, 1); }} />
            </div>
            {(searchResultsVisible && searchResults.length > 0) &&
                <div className={styles.searchResults}>
                    <ul>
                        {searchResults.map((result: { id: Key; title: string; content: string; date: string; commentAmount: number; type: string, username: string, display_name: string }) => {
                            if (result.type === 'profile') return (
                                <Link href={`/profile/@${result.username}`} key={result.username}>
                                    <li className={styles.profileResult}>
                                        <Avatar src="https://avatars.githubusercontent.com/u/56507045?v=4" alt="avatar" />
                                        <div>
                                            <p className={styles.description}>{result.display_name}</p>
                                            <p className={styles.title}>@{result.username}</p>
                                        </div>
                                    </li>
                                </Link>
                            );
                            return (
                                <Link href={`/${result.username}/post/${result.id}`} key={result.username + "-" + result.id}>
                                    <li>
                                        <div>
                                            <p className={styles.title}>Post</p>
                                            <p className={styles.description}>{result.content.substring(0, 34)}{result.content.length > 34 ? '...' : ''} <span className={styles.date}>&bull; {moment(result.date).startOf("minutes").fromNow()}</span></p>
                                        </div>
                                        <div className={styles.commentBox}>
                                            <GrChat />
                                            <p className={styles.commentAmount}>2</p>
                                        </div>
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            }
        </div>
    );
}