import { Utensils } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const CategorySelection = ({ title, filterByCategory }) => {
    const featuredCategories = [
        "Chicken",
        "Dessert",
        "Seafood",
        "Vegetarian",
        "Breakfast",
        "Pasta",
        "Goat",
        "Pork",
        "Lamb"
    ]

    return (
        <>
            <section className="mt-20">
                <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight
                border-l-4 border-yellow-400 pl-4 flex items-center">
                    <Utensils className="w-6 h-6 mr-3 text-blue-500" />
                    {title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4
                sm:gap-6">
                    {
                        featuredCategories.map((category, idx) => (
                            <Link
                                to={`/search/${category}`}
                                key={idx}
                                className="bg-gray-800 p-4 sm:p-5 rounded-xl shadow-xl shadow-black transition
                                duration-300 text-center font-semibold text-gray-100 border
                                border-gray-700 hover:border-blue-500 hover:text-blue-400 transform
                                hover:scale-[1.05] hover:bg-gray-700/50"
                                onClick={() => filterByCategory(category)}
                            >
                                {category}
                            </Link>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default CategorySelection;