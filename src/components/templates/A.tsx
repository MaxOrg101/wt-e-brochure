import React from "react";
import { EventProps } from "./types";

const A = (p: EventProps) => {
  const obj_keys = Object.keys(p.event_data);
  const filtered = obj_keys.filter((e) => e != "name" && e != "time");

  return (
    <div>
      <div className="bg-black text-white font-bold text-3xl text-center py-4">
        {p.event_data.name}
      </div>
      <div className="bg-slate-600 text-white p-4">
        <p>⏱️ Time is {p.event_data.time}</p>
      </div>
      {filtered.map((e, i) => (
        <div key={i}>
          <div className="bg-black text-white font-bold text-3xl text-center py-4">
            {e}
          </div>
          <div className="bg-slate-600 text-white p-4">
            <p> {p.event_data[e]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default A;
