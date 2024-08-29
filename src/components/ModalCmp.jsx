import React from 'react'
import ExitIcon from '../../public/svgs/exit'

const ModalCmp = ({children ,onClose, title}) => {
  return (
    <div className='bg-[rgba(0,0,0,0.75)] h-full w-full fixed inset-0 z-[1000] flex items-center justify-center'>
      <div className='bg-white rounded-[8px] max-h-[90vh] overflow-scroll w-[50vw] p-10'>
        <div className='flex items-center justify-between w-full mb-5'>
          <div className='uppercase font-semibold text-[24px]'>
            {title}
          </div>
          <span className='text-lg cursor-pointer' onClick={onClose}><ExitIcon /></span>
        </div>
      
        {children}
      </div>

    </div>
  )
}

export default ModalCmp