import { parseDateTime } from "@internationalized/date";

export const USDollarFormater = (money?: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money || 0);

export const DateFormat = (date: string) =>
  parseDateTime(date.replace("Z", ""));
