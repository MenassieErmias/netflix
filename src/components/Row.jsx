import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ({ title, fetchURL, rowID }) => {
    //STATE
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    //SCROLL
    const slideLeft = () => {
        let slider = document.getElementById("slider" + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById("slider" + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft size={40} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 transition-all duration:0.1s hidden group-hover:block' onClick={slideLeft} />
                <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide' id={`slider${rowID}`}>
                    {
                        movies.map((movie, id) => (
                            <Movie key={id} movie={movie} />
                        ))
                    }
                </div>
                <MdChevronRight size={40} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 transition-all duration:0.1s hidden group-hover:block' onClick={slideRight} />
            </div>
        </>
    )
}

export default Row