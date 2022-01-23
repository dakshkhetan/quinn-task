import { AiFillStar } from "react-icons/ai";

const Rating = ({ value }) => {
  return (
    <>
      <div className="flex justify-center items-center text-[10px] mb-[2px]">
        {Array.from(new Array(5)).map((_, index) =>
          index < value ? (
            <AiFillStar key={index} color={"#9DD0EB"} />
          ) : (
            <AiFillStar key={index} color={"#D2D4D8"} />
          )
        )}
      </div>
    </>
  );
};

export default Rating;
