"use client"


import Link from 'next/link'

import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Context } from "../../components/Clients";
import { redirect } from "next/navigation";

const Login = () => {
    const [data, setData] = useState({});
    const { user, setUser } = useContext(Context);
    const handleDataChange = (e) => {
        data[e.target.name] = e.target.value;
        setData(data);
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resData = await res.json();
            if (!resData.success) return toast.error(resData.message);
            setUser(resData.user);
            toast.success(resData.message);
            console.log(resData);
        } catch (error) {
            return toast.error(error);
        }
    };

    if (user._id) return redirect("/");





    return (
        <div className="login">
            <section>
                <form onSubmit={handleLogin} >
                    <input type="email" name='email' placeholder='enter yout email' onChange={handleDataChange} />
                    <input type="password" name='password' placeholder='enter the password' onChange={handleDataChange} />
                    <button type='submit' >Login</button>
                    <p className='text-black' >OR</p>
                    <Link className='text-black' href="/register" >New User</Link>
                </form>
            </section>
        </div>
    )
}


export default Login