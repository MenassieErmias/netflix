import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Row = ({ title, fetchURL }) => {
    //STATE
    const [movies, setMovies] = useState([]);
    const [like, setLike] = useState(false);

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])


    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center'>
                <div className='' id={'slider'}>
                    {
                        movies.map((movie, id) => (
                            <div key={id} className='w-[160px] sm:w-[200px] md:w[240px] lg:w-[280px] inline-block relative cursor-pointer p-2'>
                                <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt={movie.title} />
                                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                                    <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{movie?.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Row