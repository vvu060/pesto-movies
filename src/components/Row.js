import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "./axios";
import { HashLoader } from "react-spinners";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ id, title, fetchUrl, isLargeRow = false }) => {
  const history = useHistory();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setLoading(false);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <div id={id} className=" text-gray-200 lg:p-2">
      <h2 className="text-xl font-semibold ml-3 md:text-2xl lg:text-2xl">
        {title}
      </h2>
      <div className="flex overflow-y-hidden overflow-x-scroll p-4 cursor-pointer scrollbar-hide">
        {movies.map((movie) =>
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) &&
          !loading ? (
            <Fragment key={movie.id}>
              {!isLargeRow && movies && (
                <div className="relative">
                  <div className="absolute z-10 items-center whitespace-nowrap  bottom-2 left-2  text-left text-xs text-gray-200 hover:text-md">
                    <p className="font-bold">{movie.title}</p>
                    <p>{movie.adult ? "18+" : "10+"}</p>
                  </div>
                </div>
              )}

              <img
                onClick={() => history.push(`/details/${movie.id}`)}
                loading="lazy"
                className={`max-h-28 object-contain mr-2 w-full rounded-md transition transform duration-300 hover:scale-110   ${
                  isLargeRow && "max-h-60 lg:max-h-80"
                }`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            </Fragment>
          ) : (
            <HashLoader key={movie.id} size={20} color="gray" />
          )
        )}
      </div>
    </div>
  );
};

export default Row;
