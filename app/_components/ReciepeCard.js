"use client"
import { useAppContext } from '@/context/GlobalContext';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaShare } from 'react-icons/fa';


const RecipeCard = (props) => {
    const { title, category, desc, image, userName, id } = props;
    const { user, savepost, shareRecipe } = useAppContext()

    const shortdesc = desc.length > 80 ? desc.substring(0, 80) + "..." : desc;





    return (

        <div className="w-[390px] rounded overflow-hidden shadow-2xl bg-white shadow-indigo-200 h-[450px] flex flex-col justify-between ">
            <img className="w-full h-[200px] object-cover" loading='lazy' src={image} alt={title} />
            <div className="px-6 py-4 flex flex-col gap-2">
                <div className=" text-lg mb-2 font-medium capitalize">Recipe Name :- {title}</div>
                <p className="text-gray-700 text-sm font-normal ">Category : - {category}</p>
                <p className="text-gray-700 text-sm">Recipe description :- {shortdesc}</p>
                <p className="text-gray-700 text-xs font-semibold capitalize">made by - {userName}</p>
            </div>
            <div className="px-6 py-2 mb-4 flex items-center gap-2">
                {user && <span className={" text-white rounded-full bg-indigo-500  h-10 w-10 text-sm font-semibold  mr-2 cursor-pointer flex items-center justify-center hover:text-red-500"}
                    onClick={() => savepost(id)}
                >
                    <FaHeart className={"h-4 w-4 align-middle"} />
                </span>}
                <span className=" bg-indigo-500 rounded-md px-3  h-8 flex items-center justify-center text-xs font-medium text-white mr-2 cursor-pointer hover:text-gray-200"
                    onClick={() => shareRecipe(title, id)}
                >
                    <FaShare className="inline-block  align-middle mr-2 h-4 w-4" />
                    Share
                </span>
                <Link href={`/recipe/${props.id}`}>
                    <span className="inline-block bg-indigo-500 rounded-md px-3 py-2  text-xs font-medium text-white hover:bg-indigo-400 cursor-pointer"
                    >
                        Read more
                    </span>
                </Link>

            </div>
        </div>

    );
};

export default RecipeCard;
