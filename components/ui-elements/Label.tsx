import React from 'react'

type Props = {
  text: string
  classes?: string
}

const Label = ({ text, classes }: Props) => {
  return (
    <label className={`block uppercase tracking-wider text-brand-accent mt-4 mb-2 text-sm font-bold ${classes}`}>
      {text}
    </label>
  )
}

export default Label