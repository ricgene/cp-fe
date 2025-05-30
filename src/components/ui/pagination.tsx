import React from "react";
import Icon from "@/Icons";
import { Button } from ".";
import { twMerge } from "tailwind-merge";

interface PaginationProps {
  page: number;
  loading?: boolean;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const styles = {
  container:
    "flex items-center justify-center gap-2.5 mt-auto ml-auto pt-8 select-none duration-300 ease-in-out",
  disabled: "opacity-30 cursor-default pointer-events-none",
  arrowButton:
    "p-1 disabled:!bg-transparent hover:bg-element rounded-full disabled:opacity-40 duration-300 ease-in-out",
  pageButton: {
    base: "text-sm w-7 h-7 p-0 rounded-full shadow disabled:opacity-100",
    active: "text-white shadow cursor-default",
    inactive: "text-paragraph bg-transparent !shadow-none hover:!bg-element",
  },
  leftArrow: "!rotate-90 !stroke-paragraph h-5",
  rightArrow: "!-rotate-90 !stroke-paragraph h-5",
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  loading,
  totalPages,
  onPageChange,
}) => {
  const isDisabled = totalPages <= 1 || loading;

  let pages: number[] = [];
  if (isDisabled) {
    pages = [1];
  } else if (totalPages <= 3) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (page === 1) {
    pages = [1, 2, 3];
  } else if (page === totalPages) {
    pages = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [page - 1, page, page + 1];
  }

  return (
    <div className={twMerge(styles.container, isDisabled && styles.disabled)}>
      <button
        className={styles.arrowButton}
        disabled={page === 1 || isDisabled}
        onClick={() => onPageChange(page - 1)}
      >
        <Icon name="chevronDown" className={styles.leftArrow} />
      </button>

      {pages?.map((p, index) => (
        <Button
          key={`pagination-${index}-${p}`}
          onClick={() => onPageChange(p)}
          className={twMerge(
            styles.pageButton.base,
            p === page ? styles.pageButton.active : styles.pageButton.inactive
          )}
          disabled={p === page || isDisabled}
          style={{
            ...(p !== page && !isDisabled && { background: "transparent" }),
          }}
        >
          {p}
        </Button>
      ))}

      <button
        className={styles.arrowButton}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || isDisabled}
      >
        <Icon name="chevronDown" className={styles.rightArrow} />
      </button>
    </div>
  );
};

export default Pagination;
