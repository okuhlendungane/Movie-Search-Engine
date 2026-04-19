import MovieCard from "../components/MovieCard.jsx";
import {useState, useEffect} from "react";
import {getPopularMovies, searchMovies} from "../services/api.js";
import "..//css/Home.css";


function Home(){
    const[searchQuery, setSearchQuery]=useState("");
    // when calling from an API: store loading data & error when calling API
    const [movies, setMovies]= useState([]);
    const [error, setError]= useState(null);
    const [loading, setLoading]=useState(true)


    //dependency array: if any of the data in the array changes then the effect (function) is run again

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])
    const HandleSearch= async (e)=> {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)


        }catch (err){
            console.log(err)
            setError("Failed to search movie...")
        }finally {
            setLoading(false);
        }



        setSearchQuery("");
    };


    return <div className= "home">
        <form onSubmit={HandleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e)=> setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>


        {error && <div className="error-message"> {error} </div> }
        {loading?
            (<div className="loading">Loading..</div>
            ):(
                <div className="movies-grid">
                    {movies.map(movie =>(
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}



    </div>
}
export default Home;