import React from 'react'


const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className='logo font-bold text-2xl'>
                    <span className= 'text-green-500'>&lt;/</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className="hover:font-bold" href="/">Home</a>
                        <a className="hover:font-bold" href="#">About</a>
                        <a className="hover:font-bold" href="#">Contact</a></li>
                </ul> */}
                <a href="https://github.com/Raviast/Projext_passop" target="_blank" rel="noopener noreferrer">
                <button className='text-white bg-green-700 rounded-full my-5 flex justify-between items-center ring-white ring-1 hover:bg-green-500'>
                    <img className='invert w-10 p-1' src="icons/github.svg" alt="github_logo" />
                    <span className='font-bold px-2'>GitHub</span>
                </button>
                </a>
            </div>
        </nav>
    )
}

export default Navbar