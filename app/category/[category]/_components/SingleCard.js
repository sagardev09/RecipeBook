import { useAppContext } from '@/context/GlobalContext'
import Link from 'next/link'
import React from 'react'
import { FaHeart, FaShare } from 'react-icons/fa'

const SingleCard = (item) => {

    const { user, shareRecipe, savepost } = useAppContext()
    const shortdesc = item.desc.length > 100 ? item.desc.substring(0, 100) + "..." : item.desc;

    return (

        <div className="w-[390px] rounded overflow-hidden shadow-2xl shadow-indigo-200 bg-white h-[500px] flex flex-col justify-between">
            <img className="w-full h-[200px]" src={item.image} alt={item.title} />
            <div className="px-6 py-4">
                <h1 className="font-light text-lg mb-2">Recipe Name :- {item.title}</h1>
                <p className="text-gray-700 text-sm">Recipe description :- {shortdesc}</p>
                <p className="text-gray-700 text-base font-black my-2">made by - {item.userName}</p>
            </div>
            <div className="px-6 py-2 mb-5 flex items-center">
                {user && <span
                    onClick={() => savepost(item.id)}
                    className=" bg-indigo-500 rounded-md px-3 py-2 text-sm font-semibold text-white mr-2 cursor-pointer flex items-center"

                >
                    <FaHeart className="inline-block align-middle mr-1" />
                    Like
                </span>}
                <span className="flex items-center bg-indigo-500 rounded-md px-3 py-2 text-sm font-semibold text-white mr-2 cursor-pointer"
                    onClick={() => shareRecipe(item.title, item.id)}
                >
                    <FaShare className="inline-block align-middle mr-1" />
                    Share
                </span>
                <Link href={`/recipe/${item.id}`}>
                    <span className="inline-block bg-indigo-500 rounded-md px-3 py-2  text-sm font-medium text-white hover:bg-indigo-400 cursor-pointer"
                    >
                        Read more
                    </span>
                </Link>
            </div>
        </div>

    )
}

export default SingleCard