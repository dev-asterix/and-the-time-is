import React from 'react'

type Props = {
  text: string,
  close: boolean,
  handleClick: () => void
  classes?: string
  disabled?: boolean
}

const ModalButton = ({ text, close, handleClick, classes, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`inline-flex justify-center rounded-lg border-2
                  px-6 py-2.5 text-base font-semibold focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary sm:mt-0 
                  sm:w-auto sm:text-sm transition-all duration-300 ease-in-out
                  shadow-lg hover:shadow-xl
                  ${close || disabled ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300' : 'bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-accent hover:to-brand-primary border-brand-primary text-white'}
                  ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}  ${classes}`}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default ModalButton;
