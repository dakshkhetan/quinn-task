import { LEGEND_MAP } from "../constants";

const LegendCodes = ({ typeOfDay }) => {
  return (
    <div className="flex justify-center items-center">
      {typeOfDay.map((dayType) => {
        const legend = LEGEND_MAP[dayType];
        if (!legend) return null;
        return (
          <span
            key={dayType}
            className="w-4 h-4 rounded-[50%] text-[0.5rem] font-normal mx-[2px]"
            style={{ backgroundColor: legend.color }}
          >
            {legend.code}
          </span>
        );
      })}
    </div>
  );
};

export default LegendCodes;
