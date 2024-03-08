"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/GlobalContext';

const Navbar = () => {
    const { user, logout, UserDetails } = useAppContext()

    const pathname = usePathname()
    const router = useRouter()

    const isActivelink = (link) => {
        return pathname === link
    }

    const handleCreateClick = (e) => {
        if (!user) {
            e.preventDefault();
            console.log("User not logged in. Please log in to create.");
        }
    };

    const handleLogout = () => {
        logout()
        router.push("/")
    }


    return (
        <div>
            <header className="bg-white">
                <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <h1 className='text-xl font-normal cursor-pointer'
                                onClick={() => router.push("/")}
                            >CusiniesMaster</h1>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <Link href={"/"}>
                                            <div className={`${isActivelink("/") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 p-2 px-6 rounded-md `}>
                                                <h5 className={`${isActivelink("/") ? "text-indigo-500" : "text-black"} font-medium capitalize`}>Home</h5>
                                            </div> </Link>
                                    </li>

                                    <li>
                                        <Link href={"/create"} onClick={handleCreateClick} className={!user ? "cursor-not-allowed" : "cursor-pointer"}>
                                            <div className={`${isActivelink("/create") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 p-2 px-6 rounded-md `}>

                                                <h5 className={`${isActivelink("/create") ? "text-indigo-500" : "text-black"} font-medium capitalize`}>create</h5>
                                            </div>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href={"/category"}>
                                            <div className={`${isActivelink("/category") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 px-6 p-2 rounded-md `}>

                                                <h5 className={`${isActivelink("/category") ? "text-indigo-500" : "text-black"} font-medium capitalize`}>Category</h5>
                                            </div>
                                        </Link>
                                    </li>
                                    {user && <li>
                                        <Link href={"/saved"}>
                                            <div className={`${isActivelink("/saved") ? "bg-gray-200" : "bg-transparent"} flex items-center gap-2 px-6 p-2 rounded-md `}>

                                                <h5 className={`${isActivelink("/saved") ? "text-indigo-500" : "text-black"} font-medium capitalize`}>Saved</h5>
                                            </div>
                                        </Link>
                                    </li>}
                                </ul>
                            </nav>

                            <div className="flex items-center gap-4">
                                {!user ? <div className="sm:flex sm:gap-4">
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow"

                                    >
                                        Login
                                    </button>

                                    <div className="hidden sm:flex">
                                        <button
                                            onClick={() => router.push("/register")}
                                            className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600"

                                        >
                                            Register
                                        </button>
                                    </div>
                                </div> : <div className='sm:flex sm:gap-4 items-center'>
                                    <div>
                                        <h5 className='text-sm'>Hii , {UserDetails?.name}</h5>
                                    </div>
                                    <div>
                                        <button className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600"
                                            onClick={handleLogout}>
                                            logout</button>
                                    </div>

                                </div>}

                                <div className="block md:hidden">
                                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar