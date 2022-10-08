import React from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

const Loading = () => {
    return (
        <div className="grid place-items-center h-screen bg-no-repeat bg-cover bg-default">
            <h3 className='text-white font-bold w-54 h-54'>
                <CgSpinnerTwoAlt className="animate-spin h-54 w-54 pb-5" />
                loading...
            </h3>
        </div>
    )
}

export default Loading