import { useState } from "react";
import "../components/styles.css";

export default function ProgressBarComponent() {
  const [count, setCount] = useState(10);
  const [search, setSearch] = useState("");

  // Initialize progress bars with different values
  const [progressBars, setProgressBars] = useState(
    Array.from({ length: 10 }, () => ({
      values: [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
      ],
      colors: ["red", "yellow", "blue"],
    }))
  );

  const availableColors = ["red", "yellow", "blue", "green", "purple", "orange"];

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= 10) {
      setCount(value);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDropdownChange = (barIndex, segmentIndex, value) => {
    const newProgressBars = [...progressBars];
    newProgressBars[barIndex].values[segmentIndex] = parseInt(value, 10);
    setProgressBars(newProgressBars);
  };

  const handleColorChange = (barIndex, segmentIndex, color) => {
    const newProgressBars = [...progressBars];
    newProgressBars[barIndex].colors[segmentIndex] = color;
    setProgressBars(newProgressBars);
  };

  // Filter progress bars based on search input (match any segment's value)
  const filteredBars = progressBars
    .slice(0, count)
    .filter((bar) =>
      search ? bar.values.some((val) => val.toString() === search) : true
    );

  return (
    <div className="container">
      <div className="controls">
        <div>
          <label>No of Progress Bar : </label>
          <input
          type="number"
          className="input-field max-bars"
          value={count}
          onChange={handleInputChange}
          min="0"
          max="10"
          placeholder="Set Progress Bars"
        />
        </div>


       <div>
       <label>Search Bar : </label>
        <input
          type="text"
          placeholder="Search Progress Value"
          className="input-field search-bar"
          value={search}
          onChange={handleSearchChange}
        /></div>
      </div>

      <div className="progress-container">
        {filteredBars.map((bar, index) => (
          <div key={index} className="progress-wrapper">
            <div className="progress-bar">
              {bar.values.map((value, segIndex) => (
                <div
                  key={segIndex}
                  className="progress-segment"
                  style={{
                    width: `${value}%`,
                    backgroundColor: bar.colors[segIndex],
                  }}
                >
                  {value}%
                </div>
              ))}
            </div>
            <div className="dropdowns">
              {bar.values.map((value, segIndex) => (
                <div key={segIndex} className="dropdown-wrapper">
                  <select
                    className="dropdown"
                    value={value}
                    onChange={(e) =>
                      handleDropdownChange(index, segIndex, e.target.value)
                    }
                  >
                    {[0, 20, 40, 50, 60, 80, 100].map((val) => (
                      <option key={val} value={val}>
                        {val}%
                      </option>
                    ))}
                  </select>
                  <select
                    className="dropdown color-dropdown"
                    value={bar.colors[segIndex]}
                    onChange={(e) =>
                      handleColorChange(index, segIndex, e.target.value)
                    }
                  >
                    {availableColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}