import { ChangeEvent, useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { VscClose } from 'react-icons/vsc';
import { CgUndo } from 'react-icons/cg';

import { getCurrentTime, getParsedTime, Timezones } from '../../pages/api/functions/timeNow';
import { store } from '../../store/store';
import TimestampModal from '../TimestampModal';

/**
 * @interface Props
 * @property {string} tzData - timezone to display
 */
type Props = {
  tzData: Timezones;
  page: string;
};

/**
 * @description Card component for the app to display timezone data in small cards
 * @param {Props} props
 */
const Card = ({ tzData, page }: Props) => {
  // get current time to state
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<Timezones | null>(null);
  const [customName, setCustomName] = useState(tzData.customname ? tzData.customname : tzData.name);
  const [editable, setEditable] = useState(false);

  // handle card title change
  const handleCardTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomName(e.target.value);
    const updatedTz = { ...tzData, customname: e.target.value };

    // update store
    // sleep for 0.1s to allow for input to be updated
    setTimeout(() => {
      store.dispatch({ type: "timezone/update", payload: { timezone: updatedTz, dateFormat: '' } });
    }, 500);
  }

  // set interval to update time
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentTime(
        page === 'timewas' ? getParsedTime(tzData.name) : getCurrentTime(tzData.name, store.getState().storedata.dateFormat),
      );
    }, page === 'timewas' ? 1000 : 100);
    return () => clearInterval(interval);
  }, [page, tzData.name]);

  return (
    <div className='relative flex flex-row justify-between bg-gradient-to-br from-gray-800 to-gray-900 
        border border-gray-700 shadow-xl rounded-xl p-5 hover:shadow-glow transition-all duration-300 
        hover:scale-105 hover:border-brand-primary group'
      key={tzData.name}>
      <div className="flex-1">
        <div className="flex flex-row items-center gap-2 text-sm font-medium mb-3">
          <h3
            className="text-lg leading-6 font-semibold truncate text-brand-accent cursor-pointer flex-1"
            id="modal-title"
            onClick={() => {
              if (!editable) {
                setSelected(tzData)
              }
            }}
          >
            <input
              type="text"
              name="card-name"
              id="card-name"
              disabled={!editable}
              className={`appearance-none bg-transparent p-1 rounded-lg w-full ${editable ? 'border-b-2 border-brand-primary' : 'cursor-pointer'}
                focus:outline-none transition-all duration-300`}
              value={customName}
              onChange={(e) => { handleCardTitleChange(e) }}
              onBlur={() => { setEditable(false) }}
            />
          </h3>
          {
            editable ? (
              <VscClose
                size={20}
                className='text-gray-400 hover:text-white cursor-pointer transition-colors'
                onClick={() => { setEditable(false) }}
              />
            ) : (
              <FiEdit
                size={16}
                className='text-gray-500 hover:text-brand-accent cursor-pointer transition-colors opacity-0 group-hover:opacity-100'
                onClick={() => { setEditable(true) }}
              />
            )
          }
          {
            !editable && tzData.customname && (
              <CgUndo
                size={16}
                className='text-gray-500 hover:text-brand-accent cursor-pointer transition-colors'
                onClick={() => {
                  setCustomName(tzData.name);
                  const updatedTz = { ...tzData, customname: null };
                  store.dispatch({ type: "timezone/update", payload: { timezone: updatedTz, dateFormat: '' } });
                }}
              />
            )
          }
        </div>

        <div className="text-white text-xl md:text-2xl truncate font-bold leading-tight cursor-pointer 
            bg-black/30 rounded-lg p-3 hover:bg-brand-primary/20 transition-all duration-300"
          onClick={() => setSelected(tzData)}
        >
          {mounted ? currentTime : '...'}
        </div>
      </div>
      <button
        className='ml-3 flex flex-col items-center justify-center px-3 rounded-lg 
          text-gray-500 transition-all duration-300 hover:bg-red-500/20 hover:text-red-400 
          border border-transparent hover:border-red-500/50 group-hover:scale-110'
        onClick={() =>
          store.dispatch({ type: "timezone/remove", payload: { timezone: tzData, dateFormat: '' } })
        }
        aria-label="Remove timezone"
      >
        <RiCloseFill size={24} />
      </button>
      {selected && <TimestampModal timezone={selected} setSelected={setSelected} />}
    </div>
  );
};

export default Card;
