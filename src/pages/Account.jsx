import React, { useState, useEffect } from 'react';
import SavedShows from '../components/SavedShows';

const Account = () => {
    return (
        <div className='w-full text-white'>
            <img src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
                alt=""
                className='w-full h-[400px] object-cover'
            />
            <div className="bg-black/60 fixed top-0 left-0 w-full h-[400px]"></div>
            <div className="absolute top-[20%] p-4 md:p-8">
                <h1 className='font-bold text-3xl md:text-5xl'>My Shows</h1>
            </div>
            <SavedShows />
        </div>
    )
}

export default Account