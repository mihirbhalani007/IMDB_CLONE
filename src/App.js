import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieList from "./components/MovieList/MovieList";
import Movie from "./pages/MovieDetail/Movie";
import Wishlist from "./pages/Wishlist/Wishlist";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const MovieContext = React.createContext();

function App() {
  // const [wishlistMovie, setWishlistMovie] = useState([]);
  const [savedMovie, setSavedMovie] = useState([]);

  const notify = () =>
    toast.success("Movie Successfully added!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const addToWishlist = (movie) => {
    // Convert the id to a string
    const movieWithStringId = { ...movie, id: String(movie.id) };

    console.log("Adding movie to wishlist:", movieWithStringId); // Debug statement

    // Check if the movie with the same ID already exists in the wishlist
    if (savedMovie.some((m) => m.id === movieWithStringId.id)) {
      // Notify user or handle case where movie is already in wishlist
      toast.warn("This movie is already in your wishlist!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Update the state to add the movie
    setSavedMovie((prevMovies) => [...prevMovies, movieWithStringId]);

    // Send the POST request to save movie in backend
    axios
      .post("http://localhost:3001/wishlist", movieWithStringId)
      .then(() => {
        notify();
      })
      .catch((error) => {
        console.error("Error adding movie to wishlist:", error);
      });
  };

  const deleteFromWishlist = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/wishlist/${id}`);
      // Update state to remove the deleted movie
      setSavedMovie(savedMovie.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <MovieContext.Provider
            value={{
              addToWishlist,
              deleteFromWishlist,
              savedMovie,
              setSavedMovie,
            }}
          >
            <Routes>
              <Route index element={<Home />} />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="movies/:type" element={<MovieList />} />
              <Route path="*" element={<h1>Error Page</h1>} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <ToastContainer />
          </MovieContext.Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
