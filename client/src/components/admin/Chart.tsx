import { Flex } from "@chakra-ui/react";
import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type obj = {
  name: string;
  Total: number;
};

function Chart() {
  const data: obj[] = [
    { name: "Enero", Total: 15000 },
    { name: "Febrero", Total: 20000 },
    { name: "Marzo", Total: 16000 },
    { name: "Abril", Total: 35000 },
    { name: "Mayo", Total: 28000 },
    { name: "Junio", Total: 40000 },
  ];
  return (
    <Flex
      flex={2}
      alignSelf={"center"}
      justifyContent={"center"}
      height={"full"}
      boxShadow={"md"}
      borderRadius={10}
      p={5}
    >
      <ResponsiveContainer width={750} aspect={2 / 1}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4FBDBA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4FBDBA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#4FBDBA"
            fillOpacity={1}
            fill="url(#Total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
}

export default Chart;
