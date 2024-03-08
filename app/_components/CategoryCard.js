"use client"
import Image from 'next/image';
import React from 'react'
import Appetizers from "@/public/Appetizers.jpg"
import Soups from "@/public/Soups.jpg"
import Salads from "@/public/Salads.jpeg"
import MainCourses from "@/public/MainCourses.jpeg"
import Desserts from "@/public/Desserts.jpeg"
import Drinks from "@/public/Drinks.jpg"
import BakingRecipes from "@/public/BakingRecipes.jpeg"
import GrillingRecipes from "@/public/GrillingRecipes.jpeg"
import VegetarianDishes from "@/public/VegetarianDishes.jpeg"
import ComfortFoods from "@/public/ComfortFoods.png"
import InternationalCuisine from "@/public/InternationalCuisine.jpeg"



import { useRouter } from 'next/navigation';

const CategoryCard = () => {

    const router = useRouter()

    const handlecategory = (item) => {
        router.push(item.path)
    }

    const categoriesData = [
        {
            name: "Appetizers",
            image: Appetizers,
            desc: "Explore creative and innovative design inspirations.",
            path: "category/appetizers"
        },
        {
            name: "Soups",
            image: Soups,
            desc: "Stay in the loop with the latest fashion trends and styles.",
            path: "category/soups"
        },
        {
            name: "Salads",
            image: Salads,
            desc: "Discover a world of artistic creations and expressions.",
            path: "category/salads"
        },
        {
            name: "Main Courses",
            image: MainCourses,
            desc: "Get inspired by home decor ideas and interior designs.",
            path: "category/main_course"
        },
        {
            name: "Desserts",
            image: Desserts,
            desc: "Capture the moment with stunning photography insights.",
            path: "category/desserts"
        },
        {
            name: "Drinks",
            image: Drinks,
            desc: "Delight your taste buds with mouthwatering recipes and food ideas.",
            path: "category/drinks"
        },
        {
            name: "Baking Recipes",
            image: BakingRecipes,
            desc: "Embark on a journey to beautiful travel destinations around the world.",
            path: "category/baking"
        },
        {
            name: "Grilling Recipes",
            image: GrillingRecipes,
            desc: "Plan your dream wedding with tips and inspiration.",
            path: "category/grilling"
        },
        {
            name: "Vegetarian Dishes",
            image: VegetarianDishes,
            desc: "Find motivation and tips for a healthy and active lifestyle.",
            path: "category/vegetarian"
        },
        {
            name: "Comfort Foods",
            image: ComfortFoods,
            desc: "Discover inspiration through thought-provoking quotes.",
            path: "category/comfort_food"
        },
        {
            name: "International Cuisine",
            image: InternationalCuisine,
            desc: "Stay updated on the latest technology innovations and trends.",
            path: "category/international"
        },

    ];


    return (
        <div className='p-20'>
            <div className='flex items-center flex-wrap justify-start gap-12'>
                {categoriesData.map((item, index) => {
                    return (
                        <div key={item.name} className=' h-[370px] w-[370px] mb-3 relative overflow-hidden cursor-pointer ' onClick={() => handlecategory(item)}>
                            <Image src={item.image} alt={item.name} className='object-cover h-[100%] w-[100%] rounded-3xl ' />
                            <div className='bg-[#19191944] bottom-0 absolute rounded-br-3xl rounded-bl-3xl w-full
                             h-[100px] flex flex-col gap-4 py-3 '>
                                <h5 className='text-center text-white uppercase font-extrabold text-xl'>{item.name}</h5>
                                <h5 className='text-center text-white uppercase font-medium text-xs'>{item.desc}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


export default CategoryCard;



