'use client';

import styles from "../page.module.css";
import '@/styles/branding.css';
import React from "react";
import { GrUser, GrFormLock } from "react-icons/gr";

export default function LoginForm() {

    const redirectUrl = '/project/home';


    const [errorMessage, setErrorMessage] = React.useState('');
    var deleteTimer: any;
    function displayErrorMessage(message: string) {
        setErrorMessage(message);
        clearTimeout(deleteTimer);
        deleteTimer = setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    }

    const validateInput = (form: HTMLElement) => {
        if (form === null) return false;

        const usernameElement: HTMLInputElement | null = form.querySelector('[name="username"]');
        const passwordElement: HTMLInputElement | null = form.querySelector('[name="password"]');

        if (usernameElement === null || passwordElement === null) {
            displayErrorMessage('An error occurred while trying to validate your input');
            return false;
        }

        const username = usernameElement.value;
        const password = passwordElement.value;

        if (!username || (username && username.length < 3)) {
            displayErrorMessage('Please enter a valid username');
            return false;
        }

        if (!password || password && password.length < 6) {
            displayErrorMessage('Please enter a valid password');
            return false;
        }

        return true;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        var result = validateInput(e.target);
        if(!result) return;

        const formData = new FormData(e.target);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier: username, password }),
        }).then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                if (data.token) {
                    document.cookie = `access_token=${data.token}; path=/;`;
                }
                
                window.location.href = redirectUrl;
            } else {
                displayErrorMessage(data.message);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputIconGroup}>
                <GrUser className={styles.icon} style={{ height: '12px' }} />
                <input type="text" placeholder="Username" name="username" maxLength={25} />
            </div>
            <div className={styles.inputIconGroup}>
                <GrFormLock className={styles.icon} />
                <input type="password" placeholder="Password" name="password" />
            </div>
            {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
            <button>Login</button>
        </form>
    );
}