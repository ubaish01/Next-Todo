"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";


export const Context = createContext({ user: {} });



export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) setUser(data.user);
            });
    }, []);

    return (
        <Context.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
            <Toaster />
        </Context.Provider>
    );
};

export const LogoutButton = () => {
    const { user, setUser } = useContext(Context);
    const handleLogout = () => {
        fetch("/api/auth/logout")
            .then((res) => res.json())
            .then((data) => {
                setUser({});
                if (data.success) toast.success(data.message);
            });
    };
    return (
        user._id
            ?
            <button className="text-white" onClick={handleLogout} >Logout</button>
            :
            <Link href="/login">Login</Link>
    )
}


export const TodoButton = ({ completed, id }) => {
    const router = useRouter();

    const deleteHandler = async () => {
        const url = "/api/task?id=" + id;
        const res = await fetch(url, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json();
        console.log(data);
        data.success ? toast.success(data.message) : toast.error(data.message);
        router.refresh();
    }


    const update = async () => {
        const url = "/api/task?id=" + id;
        const res = await fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json();
        console.log(data);
        data.success ? toast.success(data.message) : toast.error(data.message);
        router.refresh();

    };

    return (
        <>
            <input type="checkbox" className="cursor-pointer" onClick={update} checked={completed} />
            <button className="btn" onClick={deleteHandler} >Delete</button >
        </>
    )

};
