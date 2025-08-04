import { SquareArrowLeft, SquareArrowRight } from "lucide-react";

type TablePaginationProp = {
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
};

function TablePagination({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
}: TablePaginationProp) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-4 flex items-center justify-center gap-4">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="rounded bg-primary-700 p-2 text-white disabled:opacity-50 dark:text-primary-100">
                <SquareArrowLeft />
            </button>
            <span className="font-semibold dark:text-primary-100">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="rounded bg-primary-700 p-2 text-white disabled:opacity-50 dark:text-primary-100">
                <SquareArrowRight />
            </button>
        </div>
    );
}

export default TablePagination;
