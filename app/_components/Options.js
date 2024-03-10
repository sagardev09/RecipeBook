"use clinet"
import { useAppContext } from '@/context/GlobalContext'
import React, { useEffect } from 'react'

const Options = () => {

    const { setsearchtext, searchtext, Search, fetchlatest, isfetchlatest, CancelFetchLatest } = useAppContext()

    useEffect(() => {
        Search()
    }, [searchtext])


    return (
        <div className='w-full py-4 px-1 flex items-center justify-between'>
            <div className=''>
                <div className="relative w-[400px]">
                    <label htmlFor="Search" className="sr-only"> Search </label>

                    <input
                        type="text"
                        id="Search"
                        value={searchtext}
                        onChange={(e) => setsearchtext(e.target.value)}
                        placeholder="Search for..."
                        className="w-full rounded-md border-gray-200 border py-2.5 pe-10 shadow-sm sm:text-sm px-3"
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button type="button" className="text-gray-600 hover:text-gray-700"
                            onClick={Search}
                        >
                            <span className="sr-only">Search</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
            <div className='relative'>
                <button className={isfetchlatest ? 'px-6  pr-10 text-sm border border-gray-200 p-2 rounded-md' : "px-6 text-sm border border-gray-200 p-2 rounded-md"}
                    onClick={fetchlatest}
                >Latest
                </button>
                {isfetchlatest && <span className='absolute cursor-pointer right-2 top-[6px] bg-red-500 rounded-full p-1 text-xs px-2 text-white'
                    onClick={CancelFetchLatest}
                >X</span>}
            </div>
        </div>
    )
}

export default Options