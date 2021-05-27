import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlayIcon } from "@heroicons/react/solid";
import Row from "../Row";
import requests from "../../requests";

const base_url = "https://image.tmdb.org/t/p/original";

// const details =
//   {
//     adult: false,
//     backdrop_path: "/c0izdYdnTe4uMRifHgvTA85wPz0.jpg",
//     belongs_to_collection: {
//       id: 809185,
//       name: "Army of the Dead Collection",
//       poster_path: null,
//       backdrop_path: null,
//     },
//     budget: 90000000,
//     genres: [
//       {
//         id: 28,
//         name: "Action",
//       },
//       {
//         id: 27,
//         name: "Horror",
//       },
//       {
//         id: 53,
//         name: "Thriller",
//       },
//     ],
//     homepage: "https://www.netflix.com/title/81046394",
//     id: 503736,
//     imdb_id: "tt0993840",
//     original_language: "en",
//     original_title: "Army of the Dead",
//     overview:
//       "Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble: venturing into the quarantine zone to pull off the greatest heist ever attempted.",
//     popularity: 1205.478,
//     poster_path: "/z8CExJekGrEThbpMXAmCFvvgoJR.jpg",
//     production_companies: [
//       {
//         id: 114152,
//         logo_path: null,
//         name: "The Stone Quarry",
//         origin_country: "US",
//       },
//     ],
//     production_countries: [
//       {
//         iso_3166_1: "US",
//         name: "United States of America",
//       },
//     ],
//     release_date: "2021-05-14",
//     revenue: 780000,
//     runtime: 148,
//     spoken_languages: [
//       {
//         english_name: "English",
//         iso_639_1: "en",
//         name: "English",
//       },
//       {
//         english_name: "German",
//         iso_639_1: "de",
//         name: "Deutsch",
//       },
//       {
//         english_name: "Spanish",
//         iso_639_1: "es",
//         name: "Español",
//       },
//     ],
//     status: "Released",
//     tagline: "Always bet on dead.",
//     title: "Army of the Dead",
//     video: false,
//     vote_average: 6.7,
//     vote_count: 902,
//   },

const DetailsScreen = (props) => {
  const movieId = props.match.params.id;
  const [details, setDetails] = useState([]);

  const getMovieDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=c63ca5b4e5b9c3e16196fe8cf70e8262&language=en-US`
    );

    setDetails(data);
  };

  useEffect(() => {
    getMovieDetails();
  }, [details, movieId]);

  console.log(details);

  return (
    <div className=" bg-gray-800 overflow-x-hidden">
      <div className="relative mb-10 lg:p-4 lg:rounded-md shadow-sm">
        <div className="hidden lg:flex absolute lg:top-4 lg:left-12 lg:h-screen lg:w-full lg:z-1 lg:bg-gradient-to-r from-gray-900 to-transparent" />
        <img
          className="max-h-52 w-full bg-no-repeat md:max-h-96 lg:max-h-screen xl:max-h-3/4 xl:object-stretch xl:px-8"
          src={`${base_url}/${details.backdrop_path}`}
          alt={details.title}
        />

        <div className="hidden lg:flex flex-col absolute left-12 top-44 max-w-2xl space-y-4 pl-10">
          <h1 className="text-xl font-semibold lg:text-5xl lg:font-bold text-gray-200">
            {details.title}
          </h1>

          <div className="flex items-center text-gray-400 font-bold">
            <p>
              {details.original_language === "en" ? "English" : "Others"} &bull;
            </p>

            <p>
              &nbsp;
              {details.release_date?.slice(0, 4)} &bull;
            </p>
            <p>&nbsp;{details.runtime} Min</p>
          </div>
          <p className="text-sm font-semibold text-gray-200 line-clamp-3">
            {details.overview}
          </p>
        </div>

        <div className="absolute flex items-center text-gray-200 space-x-1 bottom-8 left-3 lg:bottom-14 lg:left-12 xl:bottom-14 xl:left-16 cursor-pointer">
          <PlayIcon className="h-5 md:h-7 lg:h-9 xl:h-6" />
          <h2 className="text-lg font-semibold md:text-xl  lg:text-4xl lg:font-bold xl:text-xl xl:font-semibold">
            Watch Movie
          </h2>
        </div>

        <div className="absolute flex items-center text-gray-200 space-x-1 bottom-4 left-9 md:left-11 lg:bottom-6 lg:left-20 xl:bottom-8 xl:left-24">
          <p className="text-xs md:text-md lg:text-lg xl:text-sm lg:hidden">
            Runtime: {details.runtime} Min
          </p>
        </div>
      </div>

      <div className="text-gray-200 mb-10 ml-5">
        <h2 className="mb-3 text-lg font-semibold md:text-2xl lg:text-2xl">
          Trailers and Extra
        </h2>
        <img
          className="max-h-32  bg-no-repeat rounded-md md:max-h-40 lg:max-h-52 lg:rounded-md cursor-pointer"
          src={`${base_url}/${details.backdrop_path}`}
          alt={details.title}
        />
      </div>

      <Row
        title="More Like This"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow={true}
      />
    </div>
  );
};

export default DetailsScreen;
