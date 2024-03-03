"use client"
import Link from 'next/link'
import React from 'react'

const Register = () => {
    return (
        <div className="login">
            <section>
                <form >
                    <input type="text" placeholder='enter yout name' />
                    <input type="email" placeholder='enter yout email' />
                    <input type="password" placeholder='enter the password' />
                    <button type='submit' >Signup</button>
                    <p className='text-black' >OR</p>
                    <Link className='text-black' href="/login" >Log In</Link>
                </form>
            </section>
        </div>
    )
}

 const metadata = {
    title: "Register",
    description: "Register page",
};

export default Register