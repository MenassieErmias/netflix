import React, { useState, useEffect } from 'react';

import Row from './Row'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';

import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai'

const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();


    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows)
        })
    }, [user?.email]);
    //SCROLL
    const slideLeft = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const movieRef = doc(db, 'users', `${user?.email}`)

    const deleteShow = async (id) => {
        try {
            const result = movies.filter((movie) => movie.id !== id);
            updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>Liked</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft size={40} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 transition-all duration:0.1s hidden group-hover:block' onClick={slideLeft} />
                <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide' id={`slider`}>
                    {
                        movies.map((movie, id) => (
                            <div key={id} className='w-[160px] sm:w-[200px] md:w[240px] lg:w-[280px] inline-block relative cursor-pointer p-2 transition-all duration:0.1s hover:scale-105'>
                                <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${movie?.img}`} alt={movie.title} />
                                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition-all duration:0.1s">
                                    <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center break-normal'>{movie?.title}</p>
                                    <p onClick={() => deleteShow(movie.id)} className='absolute top-4 right-4 text-gray-300'><AiOutlineClose /></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <MdChevronRight size={40} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 transition-all duration:0.1s hidden group-hover:block' onClick={slideRight} />
            </div>
        </>
    )
}

export default SavedShows