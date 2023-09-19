import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

const Movie = ({ movie }) => {
    const [like, setLike] = useState(false);
    return (
        <div className='w-[160px] sm:w-[200px] md:w[240px] lg:w-[280px] inline-block relative cursor-pointer p-2 transition-all duration:0.1s hover:scale-105'>
            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt={movie.title} />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition-all duration:0.1s">
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center break-normal'>{movie?.title}</p>
                <p>
                    {
                        like ? <FaHeart className='absolute left-4 top-4 text-gray-300' /> : <FaRegHeart className='absolute left-4 top-4 text-gray-300' />
                    }
                </p>
            </div>
        </div>
    )
}

export default Movie