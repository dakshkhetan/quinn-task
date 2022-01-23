import { memo, useState, useEffect } from "react";
import { areEqual } from "react-window";

import { LegendCodes, PostImage, Rating } from "../components";

import { MONTHS } from "../constants";
import {
  getTodayDateTime,
  getCurrentTileDate,
  isNewMonthSunday
} from "../utils";

// TODO: bold dates of currently visible month in viewport
// TODO: continuation token data fetching

const Tile = ({
  columnIndex: colIndex,
  rowIndex,
  isScrolling,
  data,
  style
}) => {
  const { posts, setIsTileOpen } = data;

  const [today] = useState(() => getTodayDateTime());
  const [currentPost, setCurrentPost] = useState(null);

  const currentDate = getCurrentTileDate(rowIndex, colIndex);
  const isCurrentMonth = today.month === currentDate.month();
  const isSunday = colIndex === 0;

  useEffect(() => {
    if (!posts) return;

    const currentDateTimeString = currentDate.format("YYYY-MM-DD");

    if (posts[currentDateTimeString]) {
      setCurrentPost(posts[currentDateTimeString]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const handleClick = () => {
    setIsTileOpen(true);
  };

  return (
    <div
      className={`flex-col justify-start items-center text-xs text-center text-[#BCBCBC] border-[1px] border-neutral-100 relative cursor-pointer ${
        isSunday ? "bg-[#F7F7F7]" : "bg-transparent"
      }`}
      style={style}
    >
      {isScrolling && isSunday && (
        <FloatingMonthBadge currentDate={currentDate} />
      )}

      <span
        className={`${isCurrentMonth ? "font-bold text-black" : "font-normal"}`}
      >
        {currentDate.date() === 1 ? (
          <>
            1{" "}
            <span className="text-[#BCBCBC]">
              {MONTHS[currentDate.month()]}
            </span>
          </>
        ) : (
          currentDate.date()
        )}
      </span>

      {currentPost && (
        <div
          className="h-3/4 w-full flex-col justify-around items-center"
          onClick={handleClick}
        >
          <Rating value={currentPost.rating} />
          <PostImage images={currentPost.media} />
          <LegendCodes typeOfDay={currentPost.typeofday || []} />
        </div>
      )}
    </div>
  );
};

const FloatingMonthBadge = ({ currentDate }) => {
  if (currentDate.date() === 1) {
    return (
      <span className="absolute top-[2px] left-1 bg-[#F7F7F7] text-xs text-black text-left">
        <span className="font-bold">{MONTHS[currentDate.month()]}</span>
        <span className="font-normal">{currentDate.year()}</span>
      </span>
    );
  }

  if (isNewMonthSunday(currentDate)) {
    return (
      <span className="absolute top-[2px] left-1 bg-[#F7F7F7] text-xs text-black text-left">
        <span className="font-bold">
          {MONTHS[(currentDate.month() + 1) % 12]}
        </span>
        <br />
        <span className="font-normal">
          {currentDate.year() + (currentDate.month() === 11 ? 1 : 0)}
        </span>
      </span>
    );
  }

  return null;
};

export default memo(Tile, areEqual);
