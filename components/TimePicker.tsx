
import { useEffect, useState } from 'react';
import { BiReset, BiToggleLeft, BiToggleRight } from 'react-icons/bi';
import { getCurrentTime } from '../pages/api/functions/timeNow';
import type { TimePickerType } from './Navbar';
import Label from './ui-elements/Label';
import Select from './ui-elements/Select';

const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) => fetch(input, init).then((res) => res.json());

type timePickerProps = {
  now: Date;
  dateString: any;
  setDateString: (dateString: TimePickerType) => void;
}

/**
 * @description Timezone search component for Navbar
 */
const TimePicker = ({ now, dateString, setDateString }: timePickerProps) => {
  const [toggle, setToggle] = useState(true);
  const [unixTime, setUnixTime] = useState(getCurrentTime(Intl.DateTimeFormat().resolvedOptions().timeZone, '%s'));

  // fetch number of days in a month of the year 
  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }

  useEffect(() => {
    setDateString({
      year: new Date(Number.parseInt(unixTime) * 1000).getFullYear().toString(),
      month: new Date(Number.parseInt(unixTime) * 1000).getMonth().toString(),
      day: new Date(Number.parseInt(unixTime) * 1000).getDate().toString(),
      hour: new Date(Number.parseInt(unixTime) * 1000).getHours().toString(),
      minute: new Date(Number.parseInt(unixTime) * 1000).getMinutes().toString(),
      second: new Date(Number.parseInt(unixTime) * 1000).getSeconds().toString(),
    });
  }, [setDateString, unixTime]);

  return (
    <div className="mt-2 mb-1 sm:mt-2 w-full pb-3">

      <div className={`flex flex-row justify-center items-center align-center mb-8 cursor-pointer
        transition-all duration-300 ease-in-out border-b-2 pb-4 rounded-lg p-3
        ${toggle ? 'text-brand-accent border-brand-accent bg-brand-primary/10' : 'text-gray-400 border-gray-600 bg-gray-800/30'}
        hover:scale-105`}
        id='toggle-btn'
        aria-label='toggle-btn'
        onClick={() => setToggle(!toggle)}
      >
        <div>
          {
            toggle
              ? <BiToggleRight size={48} />
              : <BiToggleLeft size={48} />
          }
        </div>
        <label htmlFor='toggle-btn' className='ml-4 cursor-pointer font-semibold'>
          {toggle ? `Date Picker Mode` : `Unix Timestamp Mode`}
        </label>
      </div>

      {
        toggle ? (
          <>
            <Label text='Select a date (Year - Month - Date)' />
            <div className='grid grid-cols-3 gap-2 md:gap-10 p-0 md:p-2 mt-2'>
              {/* select year */}
              <Select field='year' limit={now.getFullYear() - 1800} dateString={dateString} handler={setDateString}
                selectVal={(val: number) => (now.getFullYear() - val).toString()}
                optionDisplay={
                  (val: number) => (now.getFullYear() - val).toString()
                } />

              {/* select month */}
              <Select field='month' limit={12} dateString={dateString} handler={setDateString}
                selectVal={(val) => val}
                optionDisplay={
                  (val: number) =>
                    (new Date(Number.parseInt(dateString.year), val, 1).toLocaleString('default', { month: 'long' })).
                      toString()
                } />

              {/* select day */}
              <Select field='day' dateString={dateString} handler={setDateString}
                limit={daysInMonth(Number.parseInt(dateString.month), Number.parseInt(dateString.year))}
                selectVal={(val) => val + 1}
                optionDisplay={
                  (val: number) => (val + 1 < 10 ? `0${val + 1}` : val + 1).toString()
                } />
            </div>
            <Label text='Select the time (Hour - Minute - Second)' />
            <div className='grid grid-cols-3 gap-2 md:gap-10 p-0 md:p-2 mt-2'>
              {
                [{ field: 'hour', limit: 24, }, { field: 'minute', limit: 60, }, { field: 'second', limit: 60, }].
                  map(timeData => (
                    <Select key={timeData.field} field={timeData.field} limit={timeData.limit}
                      dateString={dateString} handler={setDateString} selectVal={(val) => val}
                      optionDisplay={(val: number) => (val < 10 ? `0${val}` : val).toString()}
                    />
                  ))
              }
            </div>
          </>
        ) : (
          <>
            <Label text='Enter an epoch/unix time to convert' />
            <p className="text-gray-300 text-sm mb-2">
              Acceptable values are any valid epoch/unix or epoch/unix nano values.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              eg: 1589788800, 1658279330, -1658280557, -26189012347
            </p>
            <div className="flex flex-row justify-center items-center gap-3">
              <div className="flex-1">
                <label htmlFor="epoch-input" className='text-brand-accent font-semibold block mb-2 text-sm'>Unix Timestamp:</label>
                <input
                  id='epoch-input'
                  type={'number'}
                  min={-60000000000}
                  max={60000000000}
                  step={1000}
                  defaultValue='0'
                  className='appearance-none bg-gray-700 rounded-xl w-full p-3 border-2 border-gray-600
                  focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary
                  text-white transition-all duration-300'
                  placeholder='eg: 1658279330'
                  onChange={(e) => {
                    let val = e.target.value;
                    if (val.length < 5) {
                      // pad with zeros till 9 digits
                      val.padStart(9, '0');
                    } else if (val === '') {
                      val = getCurrentTime(Intl.DateTimeFormat().resolvedOptions().timeZone, '%s');
                    }
                    setUnixTime(val);
                  }}
                  value={unixTime}
                />
              </div>
              <button 
                className='p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer mt-7'
                onClick={() => { setUnixTime(getCurrentTime(Intl.DateTimeFormat().resolvedOptions().timeZone, '%s')) }}
                aria-label="Reset to current time"
              >
                <BiReset size={24} color='#9ca3af' />
              </button>
            </div>
          </>
        )
      }

    </div >
  );
};

export default TimePicker;
