import React, { useState, useEffect } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import getMaxCount from '../utils/getMaxCount';
import ReactTooltip from 'react-tooltip';
import { CogIcon } from '@heroicons/react/solid';

export default function Calender({ data, startDate, endDate, purpose }) {
  const [calenderData, setCalenderData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      const retrievedMax = getMaxCount(data, 'count');
      setMaxCount(retrievedMax > 0 ? retrievedMax : 1);
      setCalenderData(data);
    }
  }, [data])

  if (calenderData.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <CogIcon className="animate-spin h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="my-2 p-2 w-[800px] border border-zinc-600">
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        showMonthLabels={true}
        values={calenderData}
        gutterSize={5}
        transformDayElement={(ele, value, idx) => (
          <g key={value !== null ? value.date: idx}>
            {React.cloneElement(ele, { rx: 15 })}
          </g>
        )}
        classForValue={(value) => {
          if (value) {
            const depth = Math.floor(4 * value.count/maxCount);
            switch (depth) {
              case 4:
                return 'fill-[#39d353] rounded-full';
              case 3:
                return 'fill-[#26a641] rounded-full';
              case 2:
                return 'fill-[#006d32] rounded-full';
              case 1:
                return 'fill-[#0e4429] rounded-full';
              default:
                return 'fill-[#0e4429] rounded-full';
            }
          }
          return 'fill-zinc-800 rounded-full';
        }}
        // onMouseEnter={(e, v) => setIsMounted(true)}
        onMouseLeave={(e, v) => {
          setIsMounted(false);
          setTimeout(() => setIsMounted(true), 5);
        }}
        tooltipDataAttrs={(value) => {
          if (value.date !== null) {
            const date = new Date(value.date);
            const count = value.count;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return (
              { 'data-tip': count > 1 ? (
                `${count} ${purpose}s on ${date.toLocaleDateString(undefined, options)}` 
              ) : (
                `${count} ${purpose} on ${date.toLocaleDateString(undefined, options)}`
              )}
            );
          }
          return (
            { 'data-tip':`No ${purpose}s` }
          );
        }}
      />
      {isMounted && (
        <ReactTooltip
          backgroundColor="grey"
          globalEventOff='click'
        />
      )}
    </div>
  );
}