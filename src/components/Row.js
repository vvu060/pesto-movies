import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "./axios";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const history = useHistory();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  console.log(movies, title);

  return (
    <div className=" text-gray-200 lg:p-2">
      <h2 className="text-xl font-semibold ml-3 md:text-2xl lg:text-2xl">
        {title}
      </h2>
      <div className="flex overflow-y-hidden overflow-x-scroll p-4 cursor-pointer scrollbar-hide">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Fragment key={movie.id}>
                {!isLargeRow && (
                  <div className="relative">
                    <div className="absolute items-center whitespace-nowrap  bottom-2 left-2 z-10  text-left text-xs text-gray-200">
                      <p className="font-bold ">{movie.title}</p>
                      <p>{movie.adult ? "18+" : "10+"}</p>
                    </div>
                  </div>
                )}

                <img
                  onClick={() => history.push(`/details/${movie.id}`)}
                  className={` max-h-28 object-contain mr-2 w-full rounded-md transition transform duration-300 hover:scale-110  ${
                    isLargeRow && "max-h-60 lg:max-h-80"
                  }`}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </Fragment>
            )
        )}
      </div>
    </div>
  );
};

export default Row;
