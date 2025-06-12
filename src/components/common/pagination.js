import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ activePage, totalPages, onPageChange }) {
  const getItemProps = (index) => ({
    variant: activePage === index ? "filled" : "text",
    color: "gray",
    onClick: () => onPageChange(index),
    className: "rounded-full",
  });

  const next = () => {
    if (activePage < totalPages) {
      onPageChange(activePage + 1);
    }
  };

  const prev = () => {
    if (activePage > 1) {
      onPageChange(activePage - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <IconButton key={i} {...getItemProps(i + 1)}>
            {i + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={activePage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
