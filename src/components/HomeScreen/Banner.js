import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router";

const Banner = () => {
  const history = useHistory();
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getTrendingMovies = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/movie/week?api_key=c63ca5b4e5b9c3e16196fe8cf70e8262`);

    setTrendingMovies(data.results);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  console.log(trendingMovies);
  return (
    <div className="relative opacity-80 mb-4">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-800 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay={true}
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
      >
        {trendingMovies &&
          trendingMovies.map((trendingMovie) => (
            <div key={trendingMovie.id} className="relative">
              <img
                className="h-60 lg:h-screen w-full object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${trendingMovie.backdrop_path}`}
                alt={trendingMovie.title}
              />
              <div
                onClick={() => history.push(`/details/${trendingMovie.id}`)}
                className="absolute left-5 top-10 lg:top-32 lg:left-20 justify-self-start max-w-2xl space-y-3 text-left cursor-pointer"
              >
                <h1 className="text-xl font-semibold lg:text-5xl lg:font-bold text-white">
                  {trendingMovie.title}
                </h1>

                <div className="inline-flex items-center text-gray-200 text-md font-semibold">
                  <p className="text-xs lg:flex">
                    {trendingMovie.original_language === "en"
                      ? "English"
                      : "Others"}{" "}
                    &bull;
                  </p>
                  <p className="text-xs lg:flex">
                    &nbsp;
                    {trendingMovie.release_date.slice(0, 4)} &bull;
                  </p>
                  <div className="flex items-center justify-self-start">
                    &nbsp;
                    <h3 className="lg:flex p-1 rounded-sm bg-yellow-400 text-xs font-bold">
                      IMDb
                    </h3>
                    <p className="text-xs lg:flex">
                      &nbsp; {trendingMovie.vote_average}
                    </p>
                  </div>
                </div>

                <div className="line-clamp-4 text-gray-200 text-md font-semibold text-start">
                  <p className="hidden lg:flex">{trendingMovie.overview}</p>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Banner;
