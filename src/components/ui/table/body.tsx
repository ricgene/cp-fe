"use client";

import Image from "next/image";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { twMerge } from "tailwind-merge";
import { Checkbox } from "@/components/ui";
import { truncateText } from "@/utils/misc.utils";
import { IKeyLabelPair, ITableData } from "@/types";
import Icon from "@/Icons";

// Styles
const styles = {
  // header
  thead: "bg-element sticky top-0 z-10",
  headerRow: "bg-element",
  headerCell: "font-medium py-4 px-4 min-w-[90px] text-nowrap",
  headerCellSmall: "!min-w-fit w-[100px]",
  actionCell: "!min-w-[120px] pl-6",

  // body
  tbody: "text-paragraph",
  bodyCell: "h-11 px-4 text-nowrap capitalize",
  bodyCellSelect: "h-11 px-4 text-nowrap flex pl-8",
  emailCell: "!lowercase",
  emptyBodyCell: "p-4 lg:text-center",
  actionButton:
    "py-1 cursor-pointer hover:opacity-30 flex items-center gap-2 stroke-paragraph",
  activeActionButton: "text-primary stroke-primary",
  actionChevron: "h-4 w-4 stroke-inherit",
  imageContainer:
    "mx-auto h-7 aspect-video relative bg-gray-100 rounded overflow-hidden",
  truncatedCell: "cursor-default",
  tooltip:
    "fixed bg-black/70 text-white px-2.5 py-1.5 rounded-md text-xs z-50 pointer-events-none max-w-[300px] break-words whitespace-normal opacity-0 animate-fadeInSlow",

  // skeleton
  skeletonCell:
    "animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] rounded h-5 w-full",
  skeletonWideCell: "min-w-48",
  skeletonActionCell:
    "animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] rounded h-5 w-24 mx-auto",
} as const;

//
//
//

// ------------------------------------------------------------------------------
// Table Body
interface TableBodyProps {
  columns: IKeyLabelPair[];
  data: ITableData[];
  showActions: boolean;
  isSelectedAll?: boolean;
  onActionClick: (id: number, event: React.MouseEvent) => void;
  selectableField?: string;
  selectedValues?: string[];
  onRowSelect?: (value: string) => void;
  activeDropdown: number | null;
}
const TableBody = ({
  columns,
  data,
  showActions,
  onActionClick,
  isSelectedAll,
  selectableField,
  selectedValues = [],
  onRowSelect,
  activeDropdown,
}: TableBodyProps) => {
  // Use refs to store tooltip position to avoid re-renders
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const debouncedSetTooltip = useMemo(
    () =>
      debounce((text: string, x: number, y: number) => {
        setTooltip({ text, x, y });
      }, 0), // Removed debounce to avoid tooltip flickering
    []
  );

  const handleCellMouseEnter = useCallback(
    (text: string | number | boolean | undefined, e: React.MouseEvent) => {
      if (text === undefined) return;
      const stringText = String(text);
      if (stringText.length > 25) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        debouncedSetTooltip(stringText, rect.left + 20, rect.bottom - 15);
      }
    },
    [debouncedSetTooltip]
  );

  const handleCellMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleActionClick = useCallback(
    (id: number, e: React.MouseEvent) => {
      onActionClick(id, e);
    },
    [onActionClick]
  );

  // Memoize the rows to prevent unnecessary re-renders
  const rows = useMemo(
    () =>
      data.map((row: ITableData) => (
        <TableRow
          key={row.id}
          row={row}
          columns={columns}
          showActions={showActions}
          onActionClick={handleActionClick}
          onCellMouseEnter={handleCellMouseEnter}
          onCellMouseLeave={handleCellMouseLeave}
          isSelectedAll={isSelectedAll}
          selectableField={selectableField}
          selectedValues={selectedValues}
          onRowSelect={onRowSelect}
          activeDropdown={activeDropdown}
        />
      )),
    [
      data,
      columns,
      showActions,
      handleActionClick,
      handleCellMouseEnter,
      handleCellMouseLeave,
      isSelectedAll,
      selectableField,
      selectedValues,
      onRowSelect,
      activeDropdown,
    ]
  );

  return (
    <tbody className={styles.tbody}>
      {rows}
      {tooltip && (
        <tr>
          <td>
            <div
              ref={tooltipRef}
              className={styles.tooltip}
              style={{
                left: tooltip.x,
                top: tooltip.y,
              }}
            >
              {tooltip.text}
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

// ------------------------------------------------------------------------------
// Table Header
interface TableHeaderProps {
  columns: IKeyLabelPair[];
  showActions: boolean;
  isEmpty?: boolean;
  isSelectable?: boolean;
}

const TableHeader = ({
  columns,
  showActions,
  isEmpty,
  isSelectable,
}: TableHeaderProps) => (
  <thead className={styles.thead}>
    <tr className={styles.headerRow}>
      {isSelectable && (
        <th className={twMerge(styles.headerCell, styles.headerCellSmall)}></th>
      )}
      {columns.map((col: IKeyLabelPair, index: number) => {
        const isPointsColumn = col.key === "pointsPerPurchase";
        return (
          <th key={`header-${index}`} className={styles.headerCell}>
            {isPointsColumn ? (
              <>
                <span>Points&nbsp;</span>
                <span className="text-[10px] font-normal">per purchase</span>
              </>
            ) : (
              col.label
            )}
          </th>
        );
      })}
      {showActions && !isEmpty && (
        <th className={twMerge(styles.headerCell, styles.actionCell)}>
          Action
        </th>
      )}
    </tr>
  </thead>
);

//
//
//

// ------------------------------------------------------------------------------
// Table Row
interface TableRowProps {
  row: ITableData;
  columns: IKeyLabelPair[];
  showActions: boolean;
  onActionClick: (id: number, e: React.MouseEvent) => void;
  onCellMouseEnter: (
    text: string | number | boolean | undefined,
    e: React.MouseEvent
  ) => void;
  onCellMouseLeave: () => void;
  isSelectedAll?: boolean;
  selectableField?: string;
  selectedValues?: string[];
  onRowSelect?: (value: string) => void;
  activeDropdown: number | null;
}

const TableRow = ({
  row,
  columns,
  showActions,
  onActionClick,
  onCellMouseEnter,
  onCellMouseLeave,
  isSelectedAll,
  selectableField,
  selectedValues = [],
  onRowSelect,
  activeDropdown,
}: TableRowProps) => (
  <tr>
    {selectableField && (
      <td className={styles.bodyCellSelect}>
        <Checkbox
          checked={
            isSelectedAll ||
            selectedValues.includes(String(row[selectableField]))
          }
          onChange={() =>
            onRowSelect && onRowSelect(String(row[selectableField]))
          }
        />
      </td>
    )}
    {columns.map((col, index) => {
      const isImageColumn = col.key === "image";
      const isEmailColumn = col.key === "email";
      const cellValue = row[col.key];
      const isTruncated = !isImageColumn && String(cellValue).length > 25;
      return (
        <td
          key={`row-${row.id}-col-${index}`}
          className={twMerge(
            styles.bodyCell,
            isEmailColumn && styles.emailCell,
            isTruncated && styles.truncatedCell
          )}
          onMouseEnter={(e) => !isImageColumn && onCellMouseEnter(cellValue, e)}
          onMouseLeave={onCellMouseLeave}
        >
          {isImageColumn ? (
            <div className={styles.imageContainer}>
              <Image
                src={cellValue as string}
                alt={col.label}
                fill
                sizes="50%"
              />
            </div>
          ) : (
            truncateText(cellValue)
          )}
        </td>
      );
    })}
    {showActions && (
      <td className={twMerge(styles.bodyCell, styles.actionCell)}>
        <button
          className={twMerge(
            styles.actionButton,
            activeDropdown === Number(row.id) && styles.activeActionButton
          )}
          onClick={(e) => onActionClick(Number(row.id), e)}
        >
          Select
          <Icon name="chevronDown" className={styles.actionChevron} />
        </button>
      </td>
    )}
  </tr>
);

//
//
//

// ------------------------------------------------------------------------------
// Table Skeleton
interface TableSkeletonProps {
  columns: IKeyLabelPair[];
  showActions: boolean;
}

const TableSkeleton = ({ columns, showActions }: TableSkeletonProps) => (
  <tbody className={styles.tbody}>
    {[...Array(5)].map((_, rowIndex) => (
      <tr key={`skeleton-row-${rowIndex}`}>
        {columns.map((_, colIndex) => (
          <td
            key={`skeleton-cell-${rowIndex}-${colIndex}`}
            className={styles.bodyCell}
          >
            <div
              className={twMerge(
                styles.skeletonCell,
                colIndex === 0 && styles.skeletonWideCell
              )}
            />
          </td>
        ))}
        {showActions && (
          <td className={twMerge(styles.bodyCell, styles.actionCell)}>
            <div className={styles.skeletonActionCell} />
          </td>
        )}
      </tr>
    ))}
  </tbody>
);

// ------------------------------------------------------------------------------
// Table Empty
interface TableEmptyProps {
  columns: IKeyLabelPair[];
}

const TableEmpty = ({ columns }: TableEmptyProps) => (
  <tbody className={styles.tbody}>
    <tr>
      <td
        colSpan={columns.length}
        className={twMerge(styles.bodyCell, styles.emptyBodyCell)}
      >
        No data found
      </td>
    </tr>
  </tbody>
);

//
//
//

TableRow.displayName = "TableRow";
TableBody.displayName = "TableBody";
TableEmpty.displayName = "TableEmpty";
TableHeader.displayName = "TableHeader";
TableSkeleton.displayName = "TableSkeleton";

const MemoizedTableBody = memo(TableBody);
const MemoizedTableEmpty = memo(TableEmpty);
const MemoizedTableHeader = memo(TableHeader);
const MemoizedTableSkeleton = memo(TableSkeleton);

export {
  MemoizedTableBody as TableBody,
  MemoizedTableEmpty as TableEmpty,
  MemoizedTableHeader as TableHeader,
  MemoizedTableSkeleton as TableSkeleton,
};
