import { useAppContext } from '@/context/GlobalContext'
import Link from 'next/link'
import React from 'react'
import { FaHeart, FaShare } from 'react-icons/fa'

const SingleCard = (item) => {

    const { user, shareRecipe } = useAppContext()
    const shortdesc = item.desc.length > 100 ? item.desc.substring(0, 100) + "..." : item.desc;

    return (
        <Link href={`/recipe/${item.id}`}>
            <div className="w-[400px] rounded overflow-hidden shadow-lg bg-white h-[500px] flex flex-col justify-between">
                <img className="w-full h-[200px]" src={item.image} alt={item.title} />
                <div className="px-6 py-4">
                    <h1 className="font-light text-lg mb-2">Recipe Name :- {item.title}</h1>
                    <p className="text-gray-700 text-sm">Recipe description :- {shortdesc}</p>
                    <p className="text-gray-700 text-base font-black my-2">made by - {item.userName}</p>
                </div>
                <div className="px-6 py-2 mb-5">
                    {user && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer">
                        <FaHeart className="inline-block align-middle mr-1" />
                        Like
                    </span>}
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer"
                        onClick={() => shareRecipe(item.title, item.id)}
                    >
                        <FaShare className="inline-block align-middle mr-1" />
                        Share
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default SingleCard