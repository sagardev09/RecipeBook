"use client"
import React, { useState, useEffect } from 'react'
import UploadImage from './UploadImage'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { app } from "@/utils/FirebaseConfig"
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Vortex } from 'react-loader-spinner'
import { useAppContext } from '@/context/GlobalContext'

function Form() {

    const { user, UserDetails } = useAppContext();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [link, setLink] = useState("");
    const [tag, settag] = useState("");
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [category, setcategory] = useState("")
    const router = useRouter();
    const storage = getStorage(app)
    const db = getFirestore(app);
    const postId = Date.now().toString();

    const onSave = () => {
        if (title.trim().length === 0 || !category || desc.trim().length === 0) {
            alert("Please fill in the title and select a category.")
        } else {
            setLoading(true)
            uploadFile();
        }
    }
    useEffect(() => {
        console.log(category);
    }, [category])

    const uploadFile = () => {
        const storageRef = ref(storage, 'receipe/' + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log("File Uploaded")
        }).then(resp => {
            getDownloadURL(storageRef).then(async (url) => {
                const postData = {
                    title: title,
                    desc: desc,
                    link: link,
                    image: url,
                    tag: tag,
                    type: file.type,
                    category: category,
                    userName: UserDetails.name,
                    email: UserDetails.email,
                    id: postId,
                    userid: UserDetails.userid
                }

                await setDoc(doc(db, 'receiepe', postId),
                    postData).then(resp => {
                        console.log("Saved")
                        setLoading(true);
                        router.push("/")
                    })

            })
        })
    }

    return (
        <div className=' bg-white p-16 rounded-2xl '>
            <div className='flex justify-end mb-6'>
                <button onClick={() => onSave()}
                    className='bg-indigo-500 p-2
            text-white font-semibold px-3 
            rounded-lg'>
                    {loading ? <Vortex
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    /> :
                        <span>Save</span>}
                </button>
            </div>
            <div className='flex items-start gap-10'>
                <div className='flex-1 h-full w-full'>
                    <UploadImage setFile={(file) => setFile(file)} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Dish Name<span className='text-red-500'>*</span></label>
                        <input disabled={!selectedFile} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Add a Dish Recipe" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Recipe Description<span className='text-red-500'>*</span></label>
                        <textarea type="text"
                            disabled={!selectedFile}
                            rows={6}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder='Tell everyone what your Receipe is about'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none' />
                    </div>
                    <div>
                        <label for="categories" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Category<span className='text-red-500'>*</span></label>
                        <select id="countries" value={category} className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setcategory(e.target.value)} placeholder="select a category">
                            <option value="default">Select a category</option>
                            <option value="appetizers">Appetizers</option>
                            <option value="soups">Soups</option>
                            <option value="salads">Salads</option>
                            <option value="main_course">Main Courses</option>
                            <option value="desserts">Desserts</option>
                            <option value="drinks">Drinks</option>
                            <option value="baking">Baking Recipes</option>
                            <option value="grilling">Grilling Recipes</option>
                            <option value="vegetarian">Vegetarian Dishes</option>
                            <option value="comfort_food">Comfort Foods</option>
                            <option value="international">International Cuisine</option>
                        </select>

                    </div>
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Advice</label>
                        <input disabled={!selectedFile} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='Add a advice' onChange={(e) => setLink(e.target.value)} />
                    </div>
                    <div>
                        <label for="helper-text" className={!selectedFile ? "block mb-2 text-sm font-medium text-gray-500" : "block mb-2 text-sm font-medium text-gray-900"}>Instructions</label>
                        <input disabled={!selectedFile} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="add Instructions" onChange={(e) => settag(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form