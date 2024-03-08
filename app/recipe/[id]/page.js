"use client"
import React, { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/utils/FirebaseConfig"
import { useRouter } from 'next/navigation';
import { Vortex } from 'react-loader-spinner';

const DetailedRecipe = ({ params }) => {

    const [CurrentRecipe, setCurrentRecipe] = useState({})
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);
    const router = useRouter()

    const fetchrecipedetails = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, "receiepe", params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setCurrentRecipe(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchrecipedetails()
        } else {
            router.push("/")
        }

    }, [])



    return (
        <>

            {!loading ? <div className='max-w-4xl mx-auto'>
                <img src={CurrentRecipe?.image} className='object-cover h-full w-full' alt="" />
                <h1 className='font-normal text-4xl my-4'>{CurrentRecipe?.title}</h1>
                <h5 className='my-4 capitalize text-sm underline font-medium'>{CurrentRecipe?.category}</h5>
                <h5>{CurrentRecipe?.desc}</h5>
                <h5 className='capitalize font-bold my-4'>made by - {CurrentRecipe?.userName}</h5>
            </div>
                :
                <div className='h-screen w-screen flex items-center justify-center'>
                    <Vortex
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                </div>
            }
        </>

    )
}

export default DetailedRecipe