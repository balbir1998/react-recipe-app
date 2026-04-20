import { API_URL, useFetch } from "./useFetch";
import RecipeSlider from './RecipeSlider';
import TrendingSlider from './TrendingRecipe';
import CategorySection from './CategorySelection';

const HomeView = ({ filterByCategory }) => {
    return (
        <>
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <RecipeSlider
                    title="Staff Curated Picks"
                    fetchURL={`${API_URL}search.php?f=c`}
                />

                <TrendingSlider
                    title="Quick and Easy Meals"
                    fetchURL={`${API_URL}filter.php?a=Canadian`}
                />

                <CategorySection
                    title="Quick Filter by Primary Ingredient"
                    filterByCategory={filterByCategory}
                />
            </main>
        </>
    )
}

export default HomeView;