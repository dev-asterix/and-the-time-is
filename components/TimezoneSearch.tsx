import React, { useEffect } from 'react';
import useSWR from 'swr';

import { Timezones } from '../pages/api/functions/timeNow';
import TimestampModal from './TimestampModal';
import Label from './ui-elements/Label';

const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) => fetch(input, init).then((res) => res.json());

/**
 * @description Timezone search component for Navbar
 */
const TimezoneSearch = () => {
  // set initial state for search and selection
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<Timezones | null>(null);

  // fetch timezon data from API and get data
  const { data, error } = useSWR(
    `/api/timezones?search=${search}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  if (error) return <div>failed to load</div>;

  return (
    <div className="mb-4 p-3 md:p-5 text-white">
      <div className="w-full">
        <Label text='Search Timezone' />
        <p className="text-gray-300 text-sm mb-3">
          eg: &quot;Europe&quot;, &quot;Kolkata&quot;, &quot;new york&quot;,
          &quot;sydney&quot;, &quot;UTC&quot;, &quot;-04:00&quot;, &quot;IST&quot;, &quot;EDT&quot;,
          &quot;PST&quot;, &quot;02:00&quot;
        </p>
        <div className="relative">
          <input
            type="text"
            className="h-14 w-full bg-black/30 backdrop-blur-sm transition-all duration-300 rounded-2xl px-6 pr-14 
              border-2 border-gray-600 text-white placeholder-gray-400
              shadow-lg focus:outline-none focus:border-brand-accent focus:shadow-glow"
            placeholder="Search timezone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <svg className="absolute right-5 top-4 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* search entry drop down */}
        {data && data.length > 0 && (
          <div
            className="w-full mt-2 bg-gray-800/95 backdrop-blur-sm rounded-xl border-2 border-gray-700
            shadow-2xl max-h-72 overflow-auto scrollbar-thin
            scrollbar-thumb-brand-primary scrollbar-track-gray-700"
          >
            {data.map(
              (item: Timezones) => (
                <div
                  className="block px-4 py-3 text-sm text-gray-300 hover:text-white 
                    hover:bg-brand-primary/30 cursor-pointer transition-colors duration-200
                    border-b border-gray-700 last:border-b-0"
                  key={item.name}
                  onClick={() => {
                    // reset input field
                    setSearch("");
                    // set selected timezone
                    setSelected(item);
                  }}
                >
                  <span className="font-semibold text-brand-accent">{item.code}</span> - {item.name}
                  <span className="text-gray-400 text-xs block mt-1">
                    {item.country}/{item.city} {item.timezone} {item.offset}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* load modal on selected timezone data */}
      {selected && <TimestampModal timezone={selected} setSelected={setSelected} />}
    </div>
  );
};

export default TimezoneSearch;
