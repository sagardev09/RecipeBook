"use client"
import { useAppContext } from '@/context/GlobalContext'
import React, { useEffect } from 'react'
import SavedCard from '../_components/SavedCard'
import { Vortex } from 'react-loader-spinner'

const SavedPost = () => {

    const { fetchsavedpost, savedpost, isSavedPostLoading } = useAppContext()

    useEffect(() => {
        fetchsavedpost()
    }, [])


    return (
        <div className='p-4 max-w-7xl mx-auto'>
            <h1 className='capitalize text-2xl font-medium'>Saved Posts</h1>
            <div className='flex items-center gap-8 justify-start flex-wrap py-4'>
                {!isSavedPostLoading ?
                    <>
                        {
                            savedpost.length > 0 ? savedpost.map((item) => {
                                return (
                                    <div key={item.id}  >
                                        <SavedCard  {...item} />
                                    </div>
                                )
                            }) : <div>
                                <h1>No Post saved</h1>
                            </div>
                        }
                    </>
                    : <div className='w-full h-[80vh] flex items-center justify-center'>
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

            </div>

        </div>
    )
}

export default SavedPost