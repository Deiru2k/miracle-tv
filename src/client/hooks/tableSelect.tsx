import { uniq } from "ramda";
import { useState, useCallback, useMemo, useEffect } from "react";

type UseTableSelectReturn = {
  selectedIds: string[];
  toggleId: (id: string) => void;
  toggleAllIds: () => void;
  isChecked: (id: string) => boolean;
  isAllChecked: boolean;
  isIntermediate: boolean;
};

export const useTableSelect = (entities: any[]): UseTableSelectReturn => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleId = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((userId) => userId !== id));
      } else {
        setSelectedIds(uniq([...selectedIds, id]));
      }
    },
    [selectedIds, setSelectedIds]
  );

  const toggleAllIds = useCallback(() => {
    if (selectedIds.length < entities.length) {
      setSelectedIds(entities.map((user) => user.id));
    } else if (selectedIds.length === entities.length) {
      setSelectedIds([]);
    }
  }, [selectedIds, setSelectedIds, entities]);

  const isChecked = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  );

  const isAllChecked = useMemo(() => selectedIds.length > 0, [selectedIds]);
  const isIntermediate = useMemo(
    () => selectedIds.length > 0 && selectedIds.length !== entities.length,
    [selectedIds, entities]
  );

  useEffect(() => {
    setSelectedIds([]);
  }, [entities]);

  return {
    selectedIds,
    toggleId,
    toggleAllIds,
    isChecked,
    isAllChecked,
    isIntermediate,
  };
};
