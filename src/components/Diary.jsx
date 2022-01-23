import { useState, useRef, useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import moment from "moment";
import toast from "react-hot-toast";
// import AutoSizer from "react-virtualized-auto-sizer";

import { Tile, CarouselView } from "../components";

import { usePosts, useWindowSize } from "../hooks";
import { DAYS } from "../constants";

// NOTE: beginning from 28/12/1969 (Sunday)

const Diary = () => {
  const { width, height } = useWindowSize();
  const posts = usePosts();
  const gridRef = useRef(null);
  const [isTileOpen, setIsTileOpen] = useState(false);

  useEffect(() => {
    const weekOffset = moment().diff(0, "week"); // 'week' as unit -> to calculate 'rowIndex' for the tiles grid
    const ADDITIONAL_OFFSET = 2;
    gridRef.current.scrollToItem({ rowIndex: weekOffset + ADDITIONAL_OFFSET });
  }, []);

  useEffect(() => {
    if (posts.error) toast.error("Error in fetching posts");
  }, [posts.error]);

  const closeView = () => {
    setIsTileOpen(false);
  };

  // TODO: find a better way maybe
  const getRowHeight = (height, width) => {
    const aspectRatio = width / height;

    if (aspectRatio < 0.47) return height / 6.3;
    if (aspectRatio < 0.57) return height / 5.8;
    if (aspectRatio < 0.67) return height / 6.2;

    if (aspectRatio < 0.7) return height / 6;
    if (aspectRatio < 0.8) return height / 6.3;

    if (aspectRatio < 1.75) return height / 5;

    return height / 5.5;
  };

  const rowHeight = getRowHeight(height, width);
  const headerHeight = height / (7 * 3);

  return (
    <>
      <CarouselView
        isOpen={isTileOpen}
        // posts={posts.data.postsMap}
        posts={posts.data.postsList}
        width={width}
        setIsOpen={setIsTileOpen}
        closeView={closeView}
      />

      <div
        className="w-full flex justify-center items-center"
        style={{ height: headerHeight }}
      >
        {DAYS.map((day, i) => (
          <div
            key={i}
            className="h-full flex justify-center items-center border-[1px] border-neutral-100 font-bold text-[#49566C]"
            style={{ width: width / 7 }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center items-center">
        <Grid
          ref={gridRef}
          columnCount={7}
          rowCount={5000}
          width={width}
          height={height - headerHeight - 50}
          columnWidth={width / 7}
          rowHeight={rowHeight}
          useIsScrolling={true}
          itemData={{
            posts: posts.data.postsMap,
            continuationToken: posts.continuationToken,
            setIsTileOpen
          }}
        >
          {Tile}
        </Grid>
      </div>
    </>
  );
};

export default Diary;
