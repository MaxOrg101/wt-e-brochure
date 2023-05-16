import A from "@/components/templates/A";
import B from "@/components/templates/B";
import C from "@/components/templates/C";
import { EventData } from "@/components/templates/types";
import Link from "next/link";
import React from "react";

type Props = {
  data: EventData;
};
const ChooseTemplate = (p: Props) => {
  return (
    <div className="my-4">
      <h2 className="text-3xl">Choose Template</h2>
      <div className="flex flex-wrap py-4">
        <div className="w-1/3 duration-100 hover:scale-105 h-96 overflow-hidden">
          <Link href="/browse/a">
            <A event_data={p.data}></A>
          </Link>
        </div>

        <div className="w-1/3 duration-100 hover:scale-105 ml-10 h-96 overflow-hidden">
          <Link href="/browse/b">
            <B event_data={p.data}></B>
          </Link>
        </div>
        <div className="w-1/3 duration-100 hover:scale-105 ml-10 h-96 overflow-hidden">
          <Link href="/browse/c">
            <C event_data={p.data}></C>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplate;
