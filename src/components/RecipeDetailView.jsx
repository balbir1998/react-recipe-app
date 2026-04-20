import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_URL, useFetch } from "./useFetch";
import { BookOpen, ChevronLeft, Loader, Utensils } from "lucide-react";
import TrendingSlider from "./TrendingRecipe";

const RecipeDetailview = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`${API_URL}lookup.php?i=${id}`);
    const meal = data?.meals?.[0];
    const ingredients = [];
    const intructions = meal
        ? meal.strInstructions
            .split(".")
            .map(step => step.trim())
            .filter(step => step.length > 0)
        : [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal?.[`strIngredient${i}`];
        const measure = meal?.[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ""
            });
        };
    }


    if (loading) return (
        <div className="text-center p-8 text-gray-300">
            <Loader className="animate-spin inline-block mr-2 text-blue-400" />
            Preparing your recipe card...
        </div>
    )

    return (
        <>
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to={`/`} className="flex items-center text-yellow-400 hover:text-yellow-300
                text-lg font-medium transition group mb-6">
                    <ChevronLeft className="w-6 h-6 mr-1 transition" />
                    Back To Dashboard
                </Link>

                <div className="bg-gray-900 p-6 md:p-12 rounded-3xl shadow-2xl shadow-black/70 border
                border-gray-800">
                    <div className="lg:flex lg:space-x-12">
                        <div className="lg:w-1/2 mb-8 lg:mb-0">
                            <h1 className="text-4xl font-black text-gray-100 mb-6 leading-tight">
                                {meal?.strMeal}
                            </h1>
                            <img
                                src={meal?.strMealThumb}
                                alt={`${meal?.strMeal} meal image`}
                                className="w-100 h-100 rounded-xl shadow-2xl shadow-black/50 object-cover
                                border-4 border-gray-800 ring-2 ring-blue-500/50 mx-5"
                            />
                        </div>

                        <div className="lg:w-1/2 bg-gray-800 rounded-xl shadown-inner shadow-black/30
                        border-gray-700 pb-3">
                            <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center
                            border-b border-gray-700 p-3">
                                <Utensils className="w-7 h-7 mr-3 text-blue-500" />
                                Key Ingredients
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 list-none p-0">
                                {
                                    ingredients.map(({ ingredient, measure }, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start text-gray-300 text-base ml-2">
                                            <span className="text-blue-400 font-extrabold text-lg mr-2
                                            shrink-0 ">
                                                {"›"}
                                            </span>
                                            <span className="font-semibold text-white mr-1">
                                                {measure} {ingredient}
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="mt-8 pt-4 border-t border-gray-700">
                                <div className="text-lg text-gray-400 space-x-3 flex flex-wrap gap-y-2">
                                    <span className="bg-blue-600 text-white ml-3 px-4 py-1.5
                                rounded-full font-semibold text-sm shadow-md">
                                        {meal?.strCategory}
                                    </span>
                                    <span className="bg-green-600 text-white ml-1 px-4 py-1.5
                                rounded-full font-semibold text-sm shadow-md">
                                        {meal?.strArea}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {instructions} */}
                    <div className="mt-14 pt-8 border-t border-gray-800">
                        <h2 className="text-3xl font-bold text-gray-100 mb-8 flex items-center">
                            <BookOpen className="w-7 h-7 mr-3 text-blue-500" />
                            Detailed Preparation Steps
                        </h2>
                        <ol className="space-y-6 list-none text-gray-300">
                            {
                                intructions.map((step, idx) => (
                                    <li
                                        key={idx}
                                        className="text-lg leading-relaxed bg-gray-800 p-5 rounded-xl
                                    border-1-6 border-blue-500 shadow-lg shadow-black/30 transition
                                    duration-300 hover:bg-gray-700/50"
                                    >
                                        <span className="font-extrabold text-yellow-400 mr-3
                                    text-xl">{idx + 1}</span>
                                        {step.trim()}
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                </div>

                {/* <TrendingSlider
                    title="Quick and Easy Meals"
                    fetchURL={`${API_URL}filter.php?a=Canadian`}
                /> */}
            </main>
        </>
    )
}

export default RecipeDetailview