import { useAppContext } from '@/context/GlobalContext'
import Link from 'next/link'
import React from 'react'
import { FaShare } from 'react-icons/fa'

const SavedCard = (item) => {
    const { shareRecipe } = useAppContext()
    const shortdesc = item.desc.length > 80 ? item.desc.substring(0, 80) + "..." : item.desc;

    return (
        <div className="w-[390px] rounded overflow-hidden shadow-2xl shadow-indigo-200 bg-white h-[450px] flex flex-col justify-between ">
            <img className="w-full h-[200px] object-cover" src={item.image} alt={item.title} />
            <div className="px-6 py-4 flex flex-col gap-2">
                <div className="font-light text-lg mb-2">Recipe Name :- {item.title}</div>
                <p className="text-gray-700 text-sm ">Category : - {item.category}</p>
                <p className="text-gray-700 text-sm">Recipe description :- {shortdesc}</p>
                <p className="text-gray-700 text-xs">made by - {item.userName}</p>
            </div>
            <div className="px-6 py-2 mb-4 flex items-center gap-2">

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

export default SavedCard