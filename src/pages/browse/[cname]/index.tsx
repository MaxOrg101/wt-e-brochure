import A from "@/components/templates/A";
import { EventData } from "@/components/templates/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import B from "@/components/templates/B";
import C from "@/components/templates/C";

type Font = "font-mono" | "font-sans" | "font-serif";
const Browse = () => {
  const [events_data, set_events_data] = useState<EventData[]>();
  const [sheet_index, set_sheet_index] = useState(0);
  const [font, set_font] = useState<Font>("font-mono");
  const [is_printing, set_is_printing] = useState(false);
  const router = useRouter();
  const { cname } = router.query;
  const _cname = cname as string;
  useEffect(() => {
    const _events_data = JSON.parse(
      localStorage.getItem("data") ?? ""
    ) as EventData[];
    set_events_data(_events_data);
  }, []);

  if (!events_data) return <p>Max</p>;
  const c: { [key: string]: JSX.Element } = {
    a: <A event_data={events_data[sheet_index]}></A>,
    b: <B event_data={events_data[sheet_index]}></B>,
    c: <C event_data={events_data[sheet_index]}></C>,
  };

  return (
    <div className={font}>
      {!is_printing && (
        <>
          <button
            disabled={sheet_index == 0}
            className="bg-green-600 rounded-2xl text-white p-2 mr-4 disabled:bg-green-300"
            onClick={() => set_sheet_index(sheet_index - 1)}
          >
            Prev
          </button>
          <button
            disabled={events_data.length == sheet_index + 1}
            className="bg-green-600 rounded-2xl text-white p-2 mr-4 disabled:bg-green-300"
            onClick={() => set_sheet_index(sheet_index + 1)}
          >
            Next
          </button>
          <button
            className="bg-green-600 rounded-2xl text-white p-2 mr-4"
            onClick={() => {
              set_is_printing(true);
              setTimeout(() => {
                window.print();
                set_is_printing(false);
              }, 1200);
            }}
          >
            Print
          </button>

          <select
            className="bg-black"
            name="font-s"
            id="font-s"
            onChange={(e) => set_font(e.target.value as Font)}
          >
            <option value="font-mono">Mono</option>
            <option value="font-serif">Serif</option>
            <option value="font-sans">Sans</option>
          </select>
        </>
      )}

      <div className="flex justify-center">
        <div className={is_printing ? "w-full" : "w-5/6"}>{c[_cname]}</div>
      </div>
    </div>
  );
};

export default Browse;
