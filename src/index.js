import React from "react";
import ReactDOM from "react-dom";
import { data, totalTrackLength } from "./sampleData";
import "./styles.css";

// assume all data is valid and sorted by start time
const TimelineSegments = ({ data, totalTrackLength }) => {
  const rows = getRows(data);
  return (
    <div className="container">
      {rows.map((row, rowIdx) => {
        let lastEndSegment = 0;
        return (
          <div className="row" key={rowIdx}>
            {row.map((item) => {
              const width = ((item.end - item.start) * 100) / totalTrackLength;
              const left =
                ((item.start - lastEndSegment) * 100) / totalTrackLength;
              lastEndSegment = item.end;
              return (
                <div
                  className="segment"
                  key={item.id}
                  style={{ width: `${width}%`, left: `${left}%` }}
                >
                  <span className="start-value">{item.start}</span>
                  <span className="end-value">{item.end}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// boilerplate
ReactDOM.render(
  <TimelineSegments data={data} totalTrackLength={totalTrackLength} />,
  document.getElementById("root")
);

function getRows(data) {
  const rows = [];

  // `assume all data is valid and sorted by start time` that mean endTime is not sorted
  // Sort data again to make sure ORDER BY start asc, end asc
  data.sort((i1, i2) =>
    i1.start === i2.start ? i1.end - i2.end : i1.start - i2.start
  );

  data.forEach((item) => {
    const row = rows.find((r) => r[r.length - 1].end < item.start);

    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  });

  return rows;
}
