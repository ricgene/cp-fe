"use client";

import Image from "next/image";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { twMerge } from "tailwind-merge";
import { truncateText } from "@/utils/misc.utils";
import { IKeyLabelPair, ITableData } from "@/types";

// Styles
const styles = {
  // header
  thead: "bg-element sticky top-0 z-10",
  headerRow: "bg-element",
  headerCell: "font-medium py-4 px-4 min-w-[90px] text-nowrap",
  actionCell: "!min-w-[120px] text-center",

  // body
  tbody: "text-paragraph",
  bodyCell: "py-2 px-4 text-nowrap",
  emptyBodyCell: "p-4 lg:text-center",
  actionButton: "p-1 cursor-pointer hover:opacity-30",
  imageContainer:
    "h-8 aspect-video relative bg-gray-100 rounded overflow-hidden",
  truncatedCell: "cursor-help",
  tooltip:
    "fixed bg-element text-paragraph px-2.5 py-1.5 rounded-md text-xs z-50 pointer-events-none max-w-[300px] break-words whitespace-normal",

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
  onActionClick: (id: number, event: React.MouseEvent) => void;
}
const TableBody = ({
  columns,
  data,
  showActions,
  onActionClick,
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
      }, 200),
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
        />
      )),
    [
      data,
      columns,
      showActions,
      handleActionClick,
      handleCellMouseEnter,
      handleCellMouseLeave,
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
}

const TableHeader = ({ columns, showActions, isEmpty }: TableHeaderProps) => (
  <thead className={styles.thead}>
    <tr className={styles.headerRow}>
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
          Actions
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
}

const TableRow = ({
  row,
  columns,
  showActions,
  onActionClick,
  onCellMouseEnter,
  onCellMouseLeave,
}: TableRowProps) => (
  <tr>
    {columns.map((col, index) => {
      const isImageColumn = col.key === "image";
      const cellValue = row[col.key];
      const isTruncated = !isImageColumn && String(cellValue).length > 25;

      return (
        <td
          key={`row-${row.id}-col-${index}`}
          className={twMerge(
            styles.bodyCell,
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
          className={styles.actionButton}
          onClick={(e) => onActionClick(row.id, e)}
        >
          Actions
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
