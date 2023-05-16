import React from "react";
import { EventProps } from "./types";
import { Mogra } from "next/font/google";
const mogra = Mogra({ subsets: ["latin"], weight: "400" });
const C = (p: EventProps) => {
  const obj_keys = Object.keys(p.event_data);
  const filtered = obj_keys.filter((e) => e != "name" && e != "time");

  return (
    <div className="bg-gradient-to-r from-green-200 via-blue-300 to-cyan-500 p-14 text-green-700">
      {p.event_data.name && (
        <div className={`font-bold text-3xl py-4 ${mogra.className}`}>
          {p.event_data.name}
        </div>
      )}
      {p.event_data.time && <p>At {p.event_data.time}</p>}

      {filtered.map((e, i) => (
        <div key={i}>
          <div
            className={`font-bold text-3xl py-4 text-center ${mogra.className}`}
          >
            {e}
          </div>
          <p className="font-semibold p-0 m-0 mb-8"> {p.event_data[e]}</p>
        </div>
      ))}
    </div>
  );
};

export default C;
