import noresult from '../assets/no-poster.png'
import { Link } from 'react-router-dom'

const Card = ({movie}) => {
  return (
    <Link
              to={`/movie/${movie?.id}`}
              className=" hover:scale-110 transition-all cursor-pointer duration-300 "
              key={movie?.id}
            >
              <div className="relative">
                {!movie?.poster_path?<img src={noresult}></img>:<img
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                  className=" hover:border-white  hover:border-[5px] transition-all duration-200"
                ></img>}
                
                <div className=" w-[50px] h-[50px] bg-white absolute bottom-5 font-bold right-5 text-black flex justify-center items-center shadow-2xl rounded-full opacity-80">
                  {movie?.vote_average}{" "}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-white">{movie.title}</p>

                <p className="line-clamp-2 text-gray-500 mt-2">
                  {movie?.overview}
                </p>
              </div>
            </Link>
  )
}

export default Card