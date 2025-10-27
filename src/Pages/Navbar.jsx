import React from 'react';

const Navbar = () => {
    return (
        <div>
            <div className='flex justify-between py-4'>
                <div>
                   <h1 className='font-bold'>Portal</h1>
                </div> 
                <div className='flex items-center gap-5'>
                    <img src="" className='w-9 h-9 rounded-full' alt="" />
                    <p>admin</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;