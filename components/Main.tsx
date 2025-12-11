import React, { useEffect, useState } from 'react';
import { BsGrid3X2GapFill } from 'react-icons/bs';
import { HiViewGrid } from 'react-icons/hi';

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Timezones } from '../pages/api/functions/timeNow';
import { store } from '../store/store';
import ButtonGroup from './ui-elements/ButtonGroup';
import Card from './ui-elements/Card';
import DateFormatModal from './DateFormatModal';
import TimezoneSearch from './TimezoneSearch';

type mainProps = {
  page: string;
}

/**
 * @description - main component for the app
 */
const Main = ({ page }: mainProps) => {

  // get timezones from local storage
  const [timezones, setTimezones] = useState<Timezones[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [formatPickerSelected, setFormatPickerSelected] = useState(false);

  // use effect to get timezones from local storage and layout from local storage
  // check for update from redux store
  useEffect(() => {
    // get layout from localstorage
    const layoutLocal = localStorage.getItem('layout') as 'grid' | 'list';
    setLayout(layoutLocal ? layoutLocal : 'grid');

    // fetch date format stored in localstorage
    const dateFormatLocal = localStorage.getItem('dateFormat') as string;
    if (dateFormatLocal) {
      store.dispatch({ type: "dateformat/update", payload: dateFormatLocal });
    }

    // get timezones from local storage
    const tzs = JSON.parse(localStorage.getItem("timezones") || "[]") as Timezones[];
    if (tzs) {
      // add to store
      tzs.forEach((tz) => {
        store.dispatch({ type: "timezone/add", payload: { timezone: tz, dateFormat: '' } });
      });
    }

    // start interval to get updated timezone list
    const interval = setInterval(() => {
      setTimezones(
        store.getState().storedata.timezones,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='flex flex-col justify-between min-h-full min-w-full bg-gradient-to-br from-brand-darker via-brand-dark to-slate-900'>
        <div>
          <Navbar
            title={`And the time ${page === 'timeis' ? 'is' : 'was'}...`}
            searchBar={page === 'timeis'}
            timePicker={page === 'timewas'}
          />
          <div className="flex flex-wrap items-center justify-between px-5 mt-5 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm font-medium">View:</span>
              <div className="flex rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                <ButtonGroup layout={layout} setLayout={setLayout} toLayout={'grid'} position='left' >
                  <BsGrid3X2GapFill size={20} color={layout === 'grid' ? '#3b82f6' : '#9ca3af'} />
                </ButtonGroup>
                <ButtonGroup layout={layout} setLayout={setLayout} toLayout={'list'} position='right' >
                  <HiViewGrid size={20} color={layout === 'list' ? '#3b82f6' : '#9ca3af'} />
                </ButtonGroup>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent 
                  text-white font-medium rounded-lg hover:from-brand-accent hover:to-brand-primary 
                  focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark
                  transition-all duration-300 shadow-lg hover:shadow-glow"
              onClick={() => {
                setFormatPickerSelected(true);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Date Format
            </button>
          </div>
          <div className={layout === 'list' ? `grid grid-cols-1 lg:grid-cols-2 gap-3 p-5` : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 p-5 w-full gap-4`}>
            {
              timezones && timezones.map((tzData) => (
                <Card key={tzData.name} tzData={tzData} page={page} />
              ))
            }
          </div>
          {formatPickerSelected && <DateFormatModal setFormatPickerSelected={setFormatPickerSelected} />}
        </div>
        <Footer hidden={page === 'timeis' ? "/" : '/TimeWas'} />
      </div>
    </>
  )
};

export default Main;
