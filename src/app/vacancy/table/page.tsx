"use client";
import { VacancyModelDto } from "@/models/VacancyModel";
import { parseDateTime } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Link } from "@nextui-org/link";
import { Pagination } from "@nextui-org/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Key, useCallback, useEffect, useState } from "react";
import { vacancyConfig } from "../config";
import { getVacancy } from "./actions";
import { Spinner } from "@nextui-org/spinner";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function VacancyTable() {
  const [data, setData] = useState<VacancyModelDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getVacancy()
      .then((data) => {
        setData(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderCell = useCallback((vacancy: VacancyModelDto, columnKey: Key) => {
    const cellValue = vacancy[columnKey as keyof VacancyModelDto];

    if (columnKey === "companyLink") {
      return (
        <Link isExternal href={vacancy.companyLink}>
          {cellValue}
        </Link>
      );
    }

    if (
      columnKey === "salary" &&
      (typeof cellValue === "number" || cellValue === undefined)
    ) {
      return USDollar.format(cellValue || 0);
    }

    if (
      vacancyConfig[columnKey as keyof typeof vacancyConfig].type === "Date" &&
      typeof cellValue === "string"
    ) {
      return (
        <DatePicker
          variant="underlined"
          isReadOnly={true}
          className="max-w-xs"
          hideTimeZone
          showMonthAndYearPickers
          defaultValue={parseDateTime(cellValue.replace("Z", ""))}
        />
      );
    }

    return cellValue;
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Pagination showControls total={10} initialPage={1} />

      <Table isStriped aria-label="Vacant table">
        <TableHeader>
          {Object.entries(vacancyConfig).map(([key, value]) => (
            <TableColumn key={key}>{value.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent="No rows to display.">
          {loading ? (
            <TableRow key="loading...">
              {Object.entries(vacancyConfig).map(() => (
                <TableCell>
                  <Spinner />
                </TableCell>
              ))}
            </TableRow>
          ) : (
            data.map((vacancy) => (
              <TableRow key={vacancy._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(vacancy, columnKey)}</TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
