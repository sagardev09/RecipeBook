import React from 'react'
import CategoryCard from '../_components/CategoryCard'

const Category = () => {
    return (
        <div>
            <div className='w-full my-4'>
                <h1 className='text-center text-4xl font-semibold capitalize'>stay inspired</h1>
            </div>
            <div>
                <CategoryCard />
            </div>
        </div>
    )
}

export default Category