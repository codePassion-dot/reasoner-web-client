import React, { FC } from 'react'

interface Props {
    title: string;
    description: string;
}



const WizardBoxDetail: FC<Props> = ({ title, description }) => {
    return (
        <div className='w-80 h-60 flex flex-col gap-1 text-white font-light text-lg items-center p-3 rounded-lg bg-cloud-burst shadow-lg shadow-cloud-burst/50'>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default WizardBoxDetail