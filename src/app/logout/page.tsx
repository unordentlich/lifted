'use client';
import variables from "@/lib/variables";


export default function Logout() {

    const logout = async () => {
        fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (response.ok) {
                window.location.href = variables.loginUrl;
            }
        });
    };

    logout();

    return (
        <div>
        </div>
    );
}