import { useAppContext } from '@/context/GlobalContext';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaShare } from 'react-icons/fa';

const RecipeCard = (props) => {
    const { title, category, desc, image, userName, id, userid } = props;
    const { user, savepost } = useAppContext()

    const shortdesc = desc.length > 80 ? desc.substring(0, 80) + "..." : desc;

    const shareRecipe = async (title, id) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this delicious recipe: ${title}`,
                    url: `http://localhost:3000/recipe/${id}`
                });
                console.log("Recipe shared successfully");
            } catch (error) {
                console.error("Error sharing recipe:", error);
            }
        }
        else {
            navigator.clipboard.writeText(`http://localhost:3000/recipe/${id}`)
        }

    };

    return (

        <div className="w-[340px] rounded overflow-hidden shadow-lg bg-white h-[450px] flex flex-col justify-between">
            <img className="w-full h-[200px]" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-light text-lg mb-2">Recipe Name :- {title}</div>
                <p className="text-gray-700 text-sm ">Category : - {category}</p>
                <p className="text-gray-700 text-sm">Recipe description :- {shortdesc}</p>
                <p className="text-gray-700 text-xs">made by - {userName}</p>
            </div>
            <div className="px-6 py-2 mb-4 flex items-center gap-2">
                {user && <span className=" bg-gray-200 rounded-full  h-10 w-10 text-sm font-semibold  mr-2 cursor-pointer flex items-center justify-center hover:text-red-500"
                    onClick={() => savepost(id)}
                >
                    <FaHeart className="h-4 w-4 align-middle " />
                </span>}
                <span className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-medium text-gray-700 mr-2 cursor-pointer hover:text-gray-600"
                    onClick={() => shareRecipe(title, id)}
                >
                    <FaShare className="inline-block align-middle mr-2" />
                    Share
                </span>
                <Link href={`/recipe/${props.id}`}>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-2  text-xs font-normal text-gray-700 cursor-pointer"
                    >
                        Read more
                    </span>
                </Link>

            </div>
        </div>

    );
};

export default RecipeCard;
