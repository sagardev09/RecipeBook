import Image from 'next/image';
import React, { useState, useEffect } from 'react'
function UploadImage({ setFile, selectedFile, setSelectedFile }) {

    useEffect(() => {
        console.log("file", selectedFile);

    }, [selectedFile])


    const [isImage, setIsImage] = useState(true);

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        setFile(file);
        setSelectedFile(file);

        // Check if the file type is an image
        const fileType = file.type.split('/')[0];
        setIsImage(fileType === 'image');
    };

    return (

        <div className="flex items-center justify-center w-full h-[450px]">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-[450px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                {!selectedFile ? <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, GIF, or MP4</p>
                </div> : null}
                {selectedFile ? (
                    isImage ? (
                        <Image
                            src={window.URL.createObjectURL(selectedFile)}
                            alt="img"
                            className="object-contain h-[90%]"
                            height={800}
                            width={500}
                        />
                    ) : (
                        <video className="object-contain h-[90%]" controls>
                            <source src={window.URL.createObjectURL(selectedFile)} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )
                ) : null}
                <input id="dropzone-file" type="file" className="hidden"
                    accept='image/*, video/*'
                    onChange={handleFileChange}
                />
            </label>
        </div>

    )
}

export default UploadImage