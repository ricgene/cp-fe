"use client";

import { twMerge } from "tailwind-merge";
import React, { useState, useRef, useCallback, useMemo, memo } from "react";
import { useOutsideClick } from "@/hooks";
import { TableBody, TableEmpty, TableHeader, TableSkeleton } from "./body";
import { IAction, IKeyLabelPair, ITableData, OfferActionType } from "@/types";
import { OfferActionEnum } from "@/enums";

// Types

interface TableProps {
  data: ITableData[];
  actions?: IAction[];
  columns: IKeyLabelPair[];
  loading?: boolean;
  isEmpty?: boolean;
  className?: string;
  showActions?: boolean;
  wrapperClassName?: string;
  onAction?: (itemId: number, action: OfferActionType) => void;
}

interface DropdownPosition {
  top: number;
  left: number;
}

// Styles
const styles = {
  // container
  wrapper: "relative border border-divider rounded-2xl overflow-hidden mt-10",
  tableContainer: "h-full overflow-auto",
  table: "w-full text-sm text-left",

  // dropdown
  dropdown:
    "fixed bg-white rounded shadow-lg z-50 border border-divider overflow-hidden -ml-7 -mt-1",
  dropdownItem:
    "px-3 py-3 text-sm hover:bg-stroke text-paragraph cursor-pointer",
  divider: "mx-1 border-b-[0.5px] border-stroke",
  dropdownItemDisabled: "opacity-40 cursor-default hover:bg-white",

  // skeleton
  skeletonCell:
    "animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] rounded h-5 w-full",
  skeletonWideCell: "min-w-48",
  skeletonActionCell:
    "animate-pulse bg-gradient-to-r from-stroke/50 via-stroke to-stroke/50 bg-[length:200%_100%] rounded h-5 w-24 mx-auto",
} as const;

// Main Table component
const Table = ({
  data,
  actions = [],
  columns,
  isEmpty = false,
  loading = false,
  className,
  showActions = false,
  wrapperClassName,
  onAction,
}: TableProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
  });

  // Memoize dropdown position calculation
  const calculateDropdownPosition = useCallback(
    (button: HTMLElement) => {
      const rect = button.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = actions.length * 50;

      const wouldGoBelowViewport =
        rect.bottom + dropdownHeight > viewportHeight;

      return {
        top: wouldGoBelowViewport
          ? rect.bottom + window.scrollY - dropdownHeight
          : rect.bottom + window.scrollY,
        left: rect.right - 120,
      };
    },
    [actions.length]
  );

  // Memoized event handlers
  const handleActionClick = useCallback(
    (id: number, event: React.MouseEvent) => {
      const button = event.currentTarget as HTMLElement;
      const position = calculateDropdownPosition(button);
      setDropdownPosition(position);
      setActiveDropdown(activeDropdown === id ? null : id);
    },
    [activeDropdown, calculateDropdownPosition]
  );

  const handleActionSelect = useCallback(
    (action: OfferActionType, id: number) => {
      onAction?.(id, action);
      setActiveDropdown(null);
    },
    [onAction]
  );

  // Close dropdown when clicking outside
  useOutsideClick(dropdownRef, () => setActiveDropdown(null));

  return (
    <div className={twMerge(styles.wrapper, wrapperClassName)}>
      <div className={styles.tableContainer}>
        <table className={twMerge(styles.table, className)}>
          <TableHeader
            columns={columns}
            showActions={showActions}
            isEmpty={isEmpty}
          />
          {loading ? (
            <TableSkeleton columns={columns} showActions={showActions} />
          ) : isEmpty ? (
            <TableEmpty columns={columns} />
          ) : (
            <TableBody
              columns={columns}
              data={data}
              showActions={showActions}
              onActionClick={handleActionClick}
            />
          )}
        </table>
      </div>

      {activeDropdown && (
        <ActionDropdown
          actions={actions}
          activeDropdown={activeDropdown}
          position={dropdownPosition}
          onActionSelect={handleActionSelect}
          dropdownRef={dropdownRef}
          data={data}
        />
      )}
    </div>
  );
};

export default memo(Table);

// ------------------------------------------------------------------------------
// Action Dropdown
interface ActionDropdownProps {
  data: ITableData[];
  actions: IAction[];
  position: DropdownPosition;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  activeDropdown: number;
  onActionSelect: (action: OfferActionType, id: number) => void;
}

const ActionDropdown = memo(
  ({
    data,
    actions,
    position,
    dropdownRef,
    activeDropdown,
    onActionSelect,
  }: ActionDropdownProps) => {
    // Find the current row data to check isPerk
    const currentRow = useMemo(
      () => data.find((row: ITableData) => row.id === activeDropdown),
      [data, activeDropdown]
    );

    return (
      <div
        ref={dropdownRef}
        className={styles.dropdown}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          minWidth: "90px",
        }}
      >
        {actions.map((action: IAction, index: number) => (
          <React.Fragment key={action.key + index}>
            <div
              className={twMerge(
                styles.dropdownItem,
                !currentRow?.isPerk &&
                  action.key === OfferActionEnum.QR_CODE &&
                  styles.dropdownItemDisabled
              )}
              onClick={() => {
                if (
                  !currentRow?.isPerk &&
                  action.key === OfferActionEnum.QR_CODE
                )
                  return;
                onActionSelect(action.key, activeDropdown);
              }}
            >
              {action.label}
            </div>
            {index !== actions.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
ActionDropdown.displayName = "ActionDropdown";
