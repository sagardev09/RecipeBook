"use client"
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/utils/FirebaseConfig"
import { useRouter } from 'next/navigation';
import { Vortex } from 'react-loader-spinner';
import SingleCard from './_components/SingleCard';
import { FaArrowLeft } from "react-icons/fa";

const RecipePage = ({ params }) => {
    const router = useRouter()

    const [categorydata, setcategorydata] = useState([])
    const [loading, setLoading] = useState(true);


    const db = getFirestore(app);

    const getdata = async () => {
        const q = query(collection(db, "receiepe"), where("category", "==", params.category));

        const NewArray = []
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                NewArray.push(doc.data())
                console.log(doc.id, " => ", doc.data());
            });
            setcategorydata(NewArray)
        } catch (error) {
            console.error("Error getting category data:", error);
            setLoading(false)
        } finally {
            setLoading(false);
        }


    }

    useEffect(() => {
        if (params) {
            getdata()
        }
    }, [params])

    return (
        <div className=" p-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
                <div
                    className="p-4 hover:bg-gray-200 rounded-full cursor-pointer flex items-center justify-center"
                    onClick={() => router.back()}
                >
                    <FaArrowLeft />
                </div>
                <h1 className="capitalize font-medium text-3xl">{params.category}</h1>
            </div>
            <div className="">
                {loading ? (
                    <div className='flex flex-col gap-3 h-full w-[100vw] items-center justify-center'>
                        <Vortex
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                        <h5 className='text-lg font-semibold capitalize'>Loading...</h5>
                    </div>
                ) : categorydata.length === 0 ? (
                    <div className='w-[100vw] h-full flex items-center justify-center'>
                        <h1>There is nothing to show here</h1>
                    </div>

                ) : (
                    <div className="flex items-center justify-normal gap-8 flex-wrap py-4 px-1">
                        {categorydata.map((item, index) => (
                            <div key={index} >
                                <SingleCard {...item} />
                            </div>
                        ))}
                    </div>

                )}
            </div>
        </div>
    )
}

export default RecipePage