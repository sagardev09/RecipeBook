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
            desc: "Start your meal with tantalizing appetizers that will excite your taste buds.",
            path: "category/appetizers"
        },
        {
            name: "Soups",
            image: Soups,
            desc: "Warm up with comforting soups filled with hearty ingredients and rich flavors.",
            path: "category/soups"
        },
        {
            name: "Salads",
            image: Salads,
            desc: "Indulge in refreshing and nutritious salads packed with fresh produce and vibrant colors.",
            path: "category/salads"
        },
        {
            name: "Main Courses",
            image: MainCourses,
            desc: "Explore a variety of satisfying main courses that will become family favorites.",
            path: "category/main_course"
        },
        {
            name: "Desserts",
            image: Desserts,
            desc: "Satisfy your sweet tooth with decadent desserts that are perfect for any occasion.",
            path: "category/desserts"
        },
        {
            name: "Drinks",
            image: Drinks,
            desc: "Quench your thirst with refreshing drinks and flavorful beverage recipes.",
            path: "category/drinks"
        },
        {
            name: "Baking Recipes",
            image: BakingRecipes,
            desc: "Discover the joy of baking with delicious recipes for cakes, cookies, and more.",
            path: "category/baking"
        },
        {
            name: "Grilling Recipes",
            image: GrillingRecipes,
            desc: "Fire up the grill and enjoy delicious grilled dishes perfect for outdoor gatherings.",
            path: "category/grilling"
        },
        {
            name: "Vegetarian Dishes",
            image: VegetarianDishes,
            desc: "Explore a world of flavor with satisfying vegetarian dishes that are both delicious and nutritious.",
            path: "category/vegetarian"
        },
        {
            name: "Comfort Foods",
            image: ComfortFoods,
            desc: "Find comfort in classic comfort foods that bring warmth and nostalgia to any meal.",
            path: "category/comfort_food"
        },
        {
            name: "International Cuisine",
            image: InternationalCuisine,
            desc: "Embark on a culinary journey around the world and discover the diverse flavors of international cuisine.",
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



