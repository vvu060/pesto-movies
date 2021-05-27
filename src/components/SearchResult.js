import React from "react";

const image_url = "https://image.tmdb.org/t/p/original";

function SearchResult({ result }) {
  return (
    <div className="p-1 lg:py-2">
      <a href={result.id}>
        <div class="flex items-start rounded-md  transition duration-300 hover:scale-105 hover:bg-gray-700 transform">
          <div className="">
            <img
              loading="lazy"
              className="h-16 w-28 lg:h-20 lg:w-36 object-stretch rounded-sm"
              src={`${image_url}${result.backdrop_path || result.poster_path}`}
              alt={result.title}
            />
          </div>

          <div className="text-xs lg:text-md  text-gray-200 ml-2">
            <p className="font-base lg:font-semibold py-1">{result.title}</p>

            <div className="flex items-center ">
              <p>
                {result.original_language === "en" ? "English" : "Others"}
                &nbsp; &bull;
              </p>
              <p>&nbsp; {result.release_date.slice(0, 4)}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default SearchResult;
