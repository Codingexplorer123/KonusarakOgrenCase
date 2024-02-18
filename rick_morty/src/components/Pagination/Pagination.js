import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(35);

  useEffect(() => {
    setCurrentPage(props.page[0]);
    setMaxPage(props.page[1]);
  }, [props.page]);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const pagesToShow = 7;

    for (
      let i = Math.max(1, currentPage - 3);
      i <= Math.min(maxPage, currentPage + 3);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </a>
        <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </a>
      </div>
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage * 20 - 19}</span>{" "}
            to <span className="font-medium">{currentPage * 20}</span> of{" "}
            <span className="font-medium">{maxPage * 20}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={() => {
                props.setPage([currentPage - 1, maxPage]);
              }}
              className="relative inline-flex items-center cursor-pointer px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only ">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {pages[0] > 1 && (
              <span
                onClick={() => {
                  props.setPage([1, maxPage]);
                }}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
              >
                ...
              </span>
            )}
            {pages.map((page, index) => (
              <a
                key={index}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer ${
                  page === currentPage
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                } focus:z-20 focus:outline-offset-0`}
                onClick={() => {
                  console.log(page, maxPage);
                  props.setPage([page, maxPage]);
                }}
              >
                {page}
              </a>
            ))}
            {pages[pages.length - 1] < maxPage && (
              <span
                onClick={() => {
                  props.setPage([maxPage, maxPage]);
                }}
                className="relative cursor-pointer inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                ...
              </span>
            )}

            <a
              onClick={() => {
                props.setPage([currentPage + 1, maxPage]);
              }}
              className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;