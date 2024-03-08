"use client"
import { useAppContext } from '@/context/GlobalContext'
import React, { useEffect } from 'react'
import SavedCard from '../_components/SavedCard'

const SavedPost = () => {

    const { fetchsavedpost, savedpost } = useAppContext()

    useEffect(() => {
        fetchsavedpost()
    }, [])


    return (
        <div className='p-4'>
            <h1>Saved Posts</h1>
            <div className='flex items-center gap-8 justify-start'>

                {
                    savedpost.map((item) => {
                        return (
                            <div key={item.id} >
                                <SavedCard  {...item} />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default SavedPost