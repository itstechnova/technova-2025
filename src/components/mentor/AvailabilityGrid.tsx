import React from "react";

interface AvailabilityGridProps {
  availability: boolean[][];
	setAvailability: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

const days = ["Fri. Sept 27th", "Sat. Sept 28th", "Sun. Sept 29"];
const timeslots = [
  "12 AM – 2 AM",
  "7 AM – 9 AM",
  "9 AM – 11 AM",
  "11 AM – 1 PM",
  "1 PM – 3 PM",
  "3 PM – 5 PM",
  "5 PM – 7 PM",
  "7 PM – 9 PM",
  "9 PM – 11 PM",
  "11 PM – 11:59 PM",
];

export const AvailabilityGrid: React.FC<AvailabilityGridProps> = ({
  availability,
  setAvailability,
}) => {
  const toggleCheckbox = (row: number, col: number) => {
    setAvailability((prev) => {
      const updated = prev.map((r) => [...r]);
      updated[row][col] = !updated[row][col];
      return updated;
    });
  };

  return (
    <div className="overflow-x-auto p-6 rounded-lg">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2"></th>
            {days.map((day) => (
              <th
                key={day}
                className="border border-gray-300 p-2 text-center font-semibold text-[#29223C]"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeslots.map((slot, rowIndex) => (
            <tr key={slot}>
              <td className="border border-gray-300 p-2 font-medium text-[#29223C]">
                {slot}
              </td>
              {days.map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 p-2 text-center"
                >
                  <input
                    type="checkbox"
                    checked={availability[rowIndex][colIndex]}
                    onChange={() => toggleCheckbox(rowIndex, colIndex)}
                    className="h-5 w-5 text-[#AABD9C] border-gray-300 rounded focus:ring-[#AABD9C]"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityGrid;
