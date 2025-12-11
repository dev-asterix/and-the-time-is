import React from 'react'

type Props = {
  _classes?: string,
  field: string,
  limit: number,
  dateString: any,
  optionDisplay: (val: any) => string,
  selectVal: (val: any) => string,
  handler: (dateString: any) => void
}

const Select = ({ field, limit, dateString, optionDisplay, selectVal, handler, _classes }: Props) => {
  return (
    <select
      className='bg-gray-700 overflow-y-auto text-center rounded-xl p-3 scrollbar-thin 
        scrollbar-track-gray-700 scrollbar-thumb-brand-primary border-2 border-gray-600
        focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary
        text-white font-medium cursor-pointer transition-all duration-300 shadow-lg
        hover:bg-gray-600'
      onChange={(e) => {
        handler({ ...dateString, [field]: e.target.value })
      }}
      value={dateString[field]}
    >
      {
        Array.from(Array(limit).keys()).map((val) => (
          <option key={val} value={selectVal(val)}>
            {
              optionDisplay(val)
            }
          </option>
        ))
      }
    </select>
  )
}

export default Select;
