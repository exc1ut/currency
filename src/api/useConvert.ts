import { useQuery } from "react-query";
import { api } from "../utilities/axios";

const fetchConversion = async (from: string, to: string, amount: number) => {
  const { data } = await api.get(`pair/${from}/${to}`);

  return (data.conversion_rate * amount) as number;
};

export const useConvert = (from: string, to: string, amount: number) => {
  return useQuery(["convert", from, to, amount], () =>
    fetchConversion(from, to, amount)
  );
};
