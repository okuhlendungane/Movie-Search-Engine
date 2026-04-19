import "..//css/Favorites.css"
import {useMovieContext} from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";


function Favorites(){
    const {favourites} = useMovieContext();


    if (favourites){
        return (

            <div className="favorites">
                <h2>Your Favorites</h2>
            <div className="movies-grid">
                {favourites.map(movie =>(
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
            </div>

            )

    }
    return <div className="favorites-empty">
        <h2> No Favourite movies Yet</h2>
        <p>Start adding movies adding movies to your fave and will appear here</p>
    </div>
}
export default Favorites;