import React, { FormEvent, useMemo, useState } from 'react';
import { Label, Search } from './style';
import { debounce } from '../../../helpers/debounce';
import { useFilters } from '../../context/FiltersContext';

export const TextFilter: React.FC = () => {
  const { textFilter, setTextFilter } = useFilters();
  const [state, setState] = useState<string>(textFilter);

  const debouncedFunc = useMemo(() => debounce((value: string) => setTextFilter(value), 500), [setState]);

  const onInputInput = (event: FormEvent<HTMLInputElement>) => {
    setState(event.currentTarget.value);
    debouncedFunc(event.currentTarget.value);
  };
  return (
    <Label>
      Text filter
      <Search value={state} onInput={onInputInput} />
    </Label>
  );
};
