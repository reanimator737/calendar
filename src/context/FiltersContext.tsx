import React, { PropsWithChildren, useCallback, useContext, useState } from 'react';

interface Filters {
  labelsFilter: number[];
  labelClick: (id: number) => void;
  textFilter: string;
  setTextFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersContext = React.createContext<Filters>({
  textFilter: '',
  setTextFilter: () => undefined,
  labelsFilter: [],
  labelClick: () => undefined,
});

export const useFilters = (): Filters => useContext(FiltersContext);

export const FiltersContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [labelsFilter, setLabelFilter] = useState<number[]>([]);
  const [textFilter, setTextFilter] = useState<string>('');

  const labelClick = useCallback(
    (id: number) => {
      const index = labelsFilter.indexOf(id);
      if (index === -1) {
        return setLabelFilter((prev) => [...prev, id]);
      }

      return setLabelFilter((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
    },
    [labelsFilter],
  );

  return (
    <FiltersContext.Provider value={{ labelsFilter, labelClick, textFilter, setTextFilter }}>
      {children}
    </FiltersContext.Provider>
  );
};
