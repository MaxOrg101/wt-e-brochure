import React from "react";
import { EventProps } from "./types";

const B = (p: EventProps) => {
  const obj_keys = Object.keys(p.event_data);
  const filtered = obj_keys.filter((e) => e != "name" && e != "time");

  return (
    <div className="bg-[#92d1df] px-2 text-green-700">
      <div className="font-bold text-3xl py-4">{p.event_data.name}</div>
      <p>At {p.event_data.time}</p>
      {filtered.map((e, i) => (
        <div key={i}>
          <div className="font-bold text-3xl py-4">{e}</div>
          <p className="p-0 m-0"> {p.event_data[e]}</p>
        </div>
      ))}
    </div>
  );
};

export default B;
