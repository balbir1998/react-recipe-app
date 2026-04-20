import { ChevronLeft, Loader } from "lucide-react"
import { Link } from "react-router-dom"
import RecipeCard from "./RecipeCard"

const SearchView = ({ meals, loading }) => {
    return (
        <>
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to={`/`} className="flex items-center text-yellow-400 hover:text-yellow-300
                text-lg font-medium transition group mb-6">
                    <ChevronLeft className="w-6 h-6 mr-1 transition" />
                    Back To Dashboard
                </Link>
                {
                    loading && (
                        <div className="text-center p-8 text-gray-300">
                            <Loader className="animate-spin inline-block mr-2 text-blue-400" />
                            Searching the database  ...
                        </div>
                    )}
                {
                    !loading && meals.length > 0
                        ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                            gap-12">
                                {
                                    meals.map((meal, idx) => <RecipeCard key={idx} meal={meal} />)
                                }
                            </div>
                        )
                        : <h1>Data not found</h1>
                }
            </main>
        </>
    )
}

export default SearchView;