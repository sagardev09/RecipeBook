import { useAppContext } from '@/context/GlobalContext'
import Link from 'next/link'
import React from 'react'
import { FaShare } from 'react-icons/fa'

const SavedCard = (item) => {
    const { shareRecipe } = useAppContext()
    const shortdesc = item.desc.length > 80 ? item.desc.substring(0, 80) + "..." : item.desc;

    return (
        <div className="w-[390px] rounded overflow-hidden shadow-lg bg-white h-[450px] flex flex-col justify-between ">
            <img className="w-full h-[200px] object-cover" src={item.image} alt={item.title} />
            <div className="px-6 py-4 flex flex-col gap-2">
                <div className="font-light text-lg mb-2">Recipe Name :- {item.title}</div>
                <p className="text-gray-700 text-sm ">Category : - {item.category}</p>
                <p className="text-gray-700 text-sm">Recipe description :- {shortdesc}</p>
                <p className="text-gray-700 text-xs">made by - {item.userName}</p>
            </div>
            <div className="px-6 py-2 mb-4 flex items-center gap-2">

                <span className=" bg-gray-200 rounded-full px-3 h-8 flex items-center justify-center text-sm font-medium text-gray-700 mr-2 cursor-pointer hover:text-gray-600"
                    onClick={() => shareRecipe(item.title, item.id)}
                >
                    <FaShare className="inline-block align-middle mr-2 h-4 w-4" />
                    Share
                </span>
                <Link href={`/recipe/${item.id}`}>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-2  text-xs  text-gray-700 cursor-pointer font-medium"
                    >
                        Read more
                    </span>
                </Link>

            </div>
        </div>
    )
}

export default SavedCard