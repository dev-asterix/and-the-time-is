import Link from 'next/link';
import { useEffect, useState } from 'react';
import tz from 'timezone/loaded';
import { Transition } from '@headlessui/react'

import { getCurrentTime, getParsedTime, Timezones } from '../pages/api/functions/timeNow';
import { timezoneList } from '../pages/api/timezones';
import { store } from '../store/store';
import TimePicker from './TimePicker';
import TimestampModal from './TimestampModal';
import TimezoneSearch from './TimezoneSearch';
import Label from './ui-elements/Label';

export type TimePickerType = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

type navbarProps = {
  title: string;
  searchBar?: boolean;
  timePicker?: boolean;
}

/**
 * @description - Navbar component with local time and timezone search
 */
const Navbar = ({ title, searchBar, timePicker }: navbarProps) => {
  // get current time to state
  const [selected, setSelected] = useState<Timezones | null>(null);
  const [currentTime, setCurrentTime] = useState(
    getCurrentTime(Intl.DateTimeFormat().resolvedOptions().timeZone, store.getState().storedata.dateFormat),
  );

  const now = new Date();
  const [dateString, setDateString] = useState({
    year: now.getFullYear().toString(),
    month: (now.getMonth()).toString(),
    day: now.getDate().toString(),
    hour: now.getHours().toString(),
    minute: now.getMinutes().toString(),
    second: now.getSeconds().toString(),
  } as TimePickerType);

  // set interval to update time
  useEffect(() => {
    timePicker
      && store.dispatch(
        {
          type: 'timewas/data',
          payload: `${dateString.day} ${new Date(Number.parseInt(dateString.year),
            Number.parseInt(dateString.month), 1).toLocaleString('default', { month: 'long' })} 
            ${dateString.year}, ${dateString.hour}:${dateString.minute}:${dateString.second}`
        }
      );

    const interval = setInterval(() => {
      setCurrentTime(
        searchBar
          ? getCurrentTime(Intl.DateTimeFormat().resolvedOptions().timeZone, store.getState().storedata.dateFormat)
          : getParsedTime(Intl.DateTimeFormat().resolvedOptions().timeZone),
      );
    }, searchBar ? 100 : 1000);
    return () => clearInterval(interval);
  }, [dateString, searchBar, timePicker]);

  return (
    <>
      <div
        className='text-center shadow-2xl bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-dark 
           text-slate-100 border-b border-gray-700 relative overflow-hidden'>
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        <div className="grid lg:grid-cols-2 relative z-10">
          <div className='p-4 lg:p-8 mt-4 lg:mt-8'>
            <Link href={searchBar ? '/TimeWas' : '/'}>
              <a className='text-4xl font-nova-flat md:text-6xl pb-2 hover:text-brand-accent transition-colors duration-300 inline-block transform hover:scale-105 transition-transform'>
                {title}
              </a>
            </Link>
            <div className='mt-6 md:mt-16 font-nova-flat'>
              <p className='text-brand-accent text-sm md:text-base font-semibold uppercase tracking-wider'>
                {`Local Time in ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
              </p>
              <p className='mt-4 text-2xl truncate md:text-4xl font-bold cursor-pointer hover:text-brand-accent transition-colors duration-300 bg-black/20 rounded-lg p-3 mx-auto max-w-fit backdrop-blur-sm'
                onClick={() => setSelected(timezoneList.filter(tz => tz.name === Intl.DateTimeFormat().resolvedOptions().timeZone)[0] as Timezones)}
              >
                {currentTime}
              </p>
            </div>

          </div>
          <div className={`p-4 ${searchBar ? 'lg:p-10' : 'lg:p-4'} md:z-10`}>
            {timePicker && <TimePicker now={now} dateString={dateString} setDateString={setDateString} />}
            {searchBar && <TimezoneSearch />}
          </div>
        </div>
      </div>

      {selected && <TimestampModal timezone={selected} setSelected={setSelected} />}
    </>
  );
};

export default Navbar;
