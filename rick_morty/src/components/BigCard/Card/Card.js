import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addCharacterID,
  removeCharacterID,
} from "../../../app/slices/favoriteSlice";

import { Link } from "react-router-dom";

function Card(props) {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [charData, setCharData] = useState({ ...props.item });
  const [dataType, setDataType] = useState(props.type);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.characterIDs.indexOf(props.item.id) !== -1) {
      setIsFavorite(true);
    }
    else{
      setIsFavorite(false);
    }
  }, [favorites]);

  return (
    <div>
      <div>
        {props.type == "character" || props.type == "favorite"  ? (
          //characterCards ********************************
          <div className="characters relative border-2 border-indigo-50 border-b-4 border-b-purple-600 rounded-lg m-3">
            <svg
              onClick={() => {
                if (!isFavorite) {
                  dispatch(addCharacterID(props.item.id));
                } else {
                  dispatch(removeCharacterID(props.item.id));
                }
              }}
              className={`absolute top-0 right-0 m-2 w-6 h-6 cursor-pointer hover:scale-150 transition-all duration-1000 ${
                isFavorite ? "fill-yellow-500" : "fill-none"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>

            <Link
              className="inline-block"
              to={`/characters/${props.item.id}`}
            >
              <img
              loading="lazy"
                className="block border border-transparent rounded-lg"
                src={charData.image}
                alt=""
              />
            </Link>
            <div
              className="truncate absolute bottom-0 h-20 left-0 pt-6 w-full text-center 
            bg-gradient-to-t from-purple-100  via-purple-50 via-42% "
            >
              <Link
                className="mt-2 mx-4 whitespace-nowrap font-mono text-lg hover:italic 
                font-extrabold text-purple-600"
                to={`/characters/${props.item.id}`}
              >
                {charData.name}
              </Link>
              <div className="flex justify-around ">
                <span className="w-20 max-w-full truncate whitespace-nowrap text-sm font-bold text-gray-600">
                  {charData.species + " "}
                </span>
                <span className="w-20	max-w-full truncate whitespace-nowrap text-sm font-bold text-gray-600">
                  {charData.gender + " "}
                </span>
                <span
                  className={`w-20 max-w-full truncate whitespace-nowrap	${
                    charData.status == "Alive"
                      ? "text-green-600"
                      : charData.status == "Dead"
                      ? "text-rose-600"
                      : "text-gray-600"
                  } text-sm font-bold`}
                >
                  {" " + charData.status}
                </span>
              </div>
            </div>
          </div> //characterCards endpoint ********************************
        ) : dataType == "episode" ? (
          //episodesCards ********************************
          <div className="characters relative border-2 border-indigo-50 border-b-4 border-b-purple-600 rounded-lg m-3">
            <div
              className="truncate bottom-0 h-20 left-0 pt-6 w-full text-center 
            bg-gradient-to-t from-purple-100  via-purple-50 via-42% "
            >
              <Link
                className="mt-2 mx-4  font-mono text-lg hover:italic 
                font-extrabold text-purple-600"
                to={`${dataType}s/${props.item.id}`}
              >
                {charData.name}
              </Link>
            </div>
            <div className="flex justify-around ">
              <span className="w-36 text-center max-w-full truncate whitespace-nowrap text-sm font-bold text-gray-600">
                {charData.air_date + " "}
              </span>
              <span className="w-16 text-center max-w-full truncate whitespace-nowrap text-sm font-bold text-gray-600">
                {charData.episode + " "}
              </span>
            </div>
          </div> //episodesCards endpoint ********************************
        ) : (
          //locationsCards ********************************
          <div className="characters relative border-2 border-indigo-50 border-b-4 border-b-purple-600 rounded-lg m-3">
            <div
              className=" bottom-0 h-20 left-0 pt-6 w-full text-center 
            bg-gradient-to-t from-purple-100  via-purple-50 via-42% "
            >
              <Link
                className="mt-2 mx-4  font-mono text-lg hover:italic 
                font-extrabold text-purple-600"
                to={`${dataType}s/${props.item.id}`}
              >
                {charData.name}
              </Link>
            </div>
            <div className="flex justify-around ">
              <span className="w-40 px-2 text-center max-w-full truncate whitespace-nowrap text-sm font-bold text-gray-600">
                {charData.dimension + " "}
              </span>
              <span className="w-20 text-center	max-w-full truncate whitespace-nowrap text-sm font-bold text-gray-600">
                {charData.type + " "}
              </span>
            </div>
          </div>
          //locationsCards endpoint ********************************
        )}
      </div>
    </div>
  );
}

export default Card;