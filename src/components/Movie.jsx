import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Movie = ({ movie }) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const movieID = doc(db, 'users', `${user?.email}`);
    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path
                })
            })
        } else {
            alert("Please login to save a movie")
        }
    }
    return (
        <div className='w-[160px] sm:w-[200px] md:w[240px] lg:w-[280px] inline-block relative cursor-pointer p-2 transition-all duration:0.1s hover:scale-105'>
            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt={movie.title} />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition-all duration:0.1s">
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center break-normal'>{movie?.title}</p>
                <p>
                    {
                        like ? <FaHeart onClick={saveShow} className='absolute left-4 top-4 text-gray-300' /> : <FaRegHeart onClick={saveShow} className='absolute left-4 top-4 text-gray-300' />
                    }
                </p>
            </div>
        </div>
    )
}

export default Movie