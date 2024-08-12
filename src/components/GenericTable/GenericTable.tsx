"use client";
import {
  ActionDelete,
  ActionGetPaginationList,
  EntityFieldConfigType,
  EntityNameType,
  isDate,
  isMoney,
  isUrl,
} from "@/features/entity";
import { IFindDto, PaginationMetadata } from "@/models/core";
import { DatePicker } from "@nextui-org/date-picker";
import { Link } from "@nextui-org/link";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { FC, Key, useCallback, useEffect, useReducer, useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "../icons";
import { DateFormat, USDollarFormater } from "./formater";

interface GenericTableProps {
  entityName: EntityNameType;
  config: EntityFieldConfigType;
  ariaLabel: string;

  getPaginationList: ActionGetPaginationList;
  deleteItem: ActionDelete;
}

export const GenericTable: FC<GenericTableProps> = (props) => {
  const { entityName, config, ariaLabel, getPaginationList, deleteItem } =
    props;

  const [findDto, setFindDto] = useReducer(
    (state: IFindDto, action: IFindDto) => ({ ...state, ...action }),
    {
      page: 0,
    },
  );
  const [paginationMetadata, setPaginationMetadata] =
    useState<PaginationMetadata>({
      page: 0,
      maxPages: 1,
    });
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPaginationList(entityName, findDto)
      .then((data) => {
        setData(data.data);
        setPaginationMetadata(data.metadata);
      })
      .finally(() => setLoading(false));
  }, [findDto]);

  const renderCell = useCallback((entity: object, columnKey: Key) => {
    if (columnKey === "actions") {
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                const id = entity["_id" as keyof object];
                setData((oldData) => oldData.filter((data) => data._id !== id));
                deleteItem(entityName, id);
              }}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    const fieldValue = entity[columnKey as keyof object];
    const fieldMetadata = config[columnKey as keyof typeof config];

    if (isUrl(fieldMetadata.type)) {
      return (
        <Link isExternal href={fieldValue}>
          {fieldValue}
        </Link>
      );
    }

    if (isMoney(fieldMetadata.type)) {
      return USDollarFormater(fieldValue);
    }

    if (isDate(fieldMetadata.type)) {
      return (
        <DatePicker
          aria-label={`${columnKey}_${ariaLabel}`}
          variant="underlined"
          isReadOnly={true}
          className="max-w-xs"
          hideTimeZone
          showMonthAndYearPickers
          defaultValue={DateFormat(fieldValue)}
        />
      );
    }

    return fieldValue;
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Pagination
        showControls
        total={paginationMetadata.maxPages}
        initialPage={paginationMetadata.page + 1}
        onChange={(page) => {
          setFindDto({
            page: page - 1,
          });
        }}
      />

      <Table isStriped aria-label={ariaLabel}>
        <TableHeader>
          {Object.entries(config).map(([key, value]) => (
            <TableColumn key={key}>{value.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent="No rows to display.">
          {loading ? (
            <TableRow key="loading...">
              {(columnKey) => (
                <TableCell key={columnKey}>
                  <Spinner />
                </TableCell>
              )}
            </TableRow>
          ) : (
            data.map((vacancy) => (
              <TableRow key={vacancy._id}>
                {(columnKey) => (
                  <TableCell key={columnKey}>
                    {renderCell(vacancy, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
