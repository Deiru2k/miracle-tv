import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react";
import { QueryLimit } from "miracle-tv-shared/graphql";
import React, { useCallback, useMemo, useState } from "react";

export type UsePaginationReturn = {
  pageCount: number;
  page: number;
  targetSkip: number;
  nextPage: () => void;
  prevPage: () => void;
  changePage: (page: number) => void;
  limit: QueryLimit;
};

export const usePagination = (
  count: number,
  limit: number = 25,
  skip: number = limit
): UsePaginationReturn => {
  const [page, setPage] = useState<number>(1);

  const pageCount = useMemo(() => {
    return Math.ceil(count / limit);
  }, [count, limit]);

  const targetSkip = useMemo(() => {
    const realPage = page > 0 ? page - 1 : 0;
    return skip * realPage;
  }, [skip, page]);

  const nextPage = useCallback(() => {
    if (page + 1 > pageCount) {
      setPage(pageCount);
      return;
    }
    setPage(page + 1);
  }, [page, pageCount, setPage]);

  const prevPage = useCallback(() => {
    if (page - 1 < 1) {
      setPage(1);
      return;
    }
    setPage(page - 1);
  }, [page, pageCount, setPage]);

  const changePage = useCallback(
    (targetPage: number) => {
      if (targetPage < 1) {
        setPage(1);
        return;
      }
      if (targetPage > pageCount) {
        setPage(pageCount);
        return;
      }
      setPage(targetPage);
    },
    [page, pageCount, setPage]
  );

  const queryLimit: QueryLimit = useMemo(
    () => ({
      limit: limit,
      skip: targetSkip,
    }),
    [limit, targetSkip]
  );

  return {
    pageCount,
    page,
    targetSkip,
    nextPage,
    prevPage,
    changePage,
    limit: queryLimit,
  };
};

type PaginationProps = {
  pagesOnDisplay?: number;
} & UsePaginationReturn;

export const Pagination = ({
  pagesOnDisplay = 5,
  page,
  pageCount,
  changePage,
  nextPage,
  prevPage,
}: PaginationProps) => {
  const pageSlice = useMemo(() => {
    let startPage: number,
      endPage: number = 0;
    if (pageCount < pagesOnDisplay) {
      startPage = 1;
      endPage = pageCount;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(pagesOnDisplay / 2);
      let maxPagesAfterCurrentPage = Math.ceil(pagesOnDisplay / 2) - 1;
      if (page <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = pagesOnDisplay;
      } else if (page + maxPagesAfterCurrentPage >= pageCount) {
        // current page near the end
        startPage = pageCount - pagesOnDisplay + 1;
        endPage = pageCount;
      } else {
        // current page somewhere in the middle
        startPage = page - maxPagesBeforeCurrentPage;
        endPage = page + maxPagesAfterCurrentPage;
      }
    }
    const pageSlice = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );
    return pageSlice;
  }, [pagesOnDisplay, page, pageCount]);

  return pageSlice.length > 0 ? (
    <Flex w="100%" justify="center" mt={2}>
      <ButtonGroup size="md" isAttached variant="outline">
        <IconButton
          isDisabled={page === 1}
          borderColor="primary.500"
          aria-label="Add to friends"
          icon={<ChevronLeftIcon />}
          onClick={prevPage}
        />
        {pageSlice.map((pageNumber) => (
          <Button
            key={pageNumber}
            borderColor={page === pageNumber ? "primary.200" : "primary.500"}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <IconButton
          isDisabled={page === pageCount}
          borderColor="primary.500"
          aria-label="Add to friends"
          icon={<ChevronRightIcon />}
          onClick={nextPage}
        />
      </ButtonGroup>
    </Flex>
  ) : null;
};
