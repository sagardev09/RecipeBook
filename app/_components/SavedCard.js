import Link from 'next/link'
import React from 'react'
import { FaShare } from 'react-icons/fa'

const SavedCard = (item) => {
    return (
        <div className="w-[340px] rounded overflow-hidden shadow-lg bg-white h-[450px] flex flex-col justify-between">
            <img className="w-full h-[200px]" src={item.image} alt={item.title} />
            <div className="px-6 py-4">
                <div className="font-light text-lg mb-2">Recipe Name :- {item.title}</div>
                <p className="text-gray-700 text-sm ">Category : - {item.category}</p>
                <p className="text-gray-700 text-sm">Recipe description :- {item.shortdesc}</p>
                <p className="text-gray-700 text-xs">made by - {item.userName}</p>
            </div>
            <div className="px-6 py-2 mb-4 flex items-center gap-2">

                <span className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-medium text-gray-700 mr-2 cursor-pointer hover:text-gray-600"
                    onClick={() => shareRecipe(title, id)}
                >
                    <FaShare className="inline-block align-middle mr-2" />
                    Share
                </span>
                <Link href={`/recipe/${item.id}`}>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-2  text-xs font-normal text-gray-700 cursor-pointer"
                    >
                        Read more
                    </span>
                </Link>

            </div>
        </div>
    )
}

export default SavedCard