import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Container, FunctionalButtons, TimeContainer, YearPicker } from './style';
import { MonthPicker } from './monthPicker';
import { ScreenButton } from './functionalButtons/screen';
import { CopyButton } from './functionalButtons/copy';
import { PasteButton } from './functionalButtons/paste';
import { debounce } from '../../helpers/debounce';
import { useDate } from '../context/DateContext';
import { containsOnlyDigits } from '../../helpers';

export const DatePicker: React.FC = () => {
  const { year, setYear } = useDate();
  const [inputValue, setInputValue] = useState<number>(year);

  useEffect(() => setInputValue(year), [year]);

  const debouncedFunc = useMemo(() => debounce(setYear, 500), [setYear]);

  const handleSetYear = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (containsOnlyDigits(value)) {
      setInputValue(+value);
      debouncedFunc(+value);
    }
  }, []);

  return (
    <Container>
      <TimeContainer>
        <YearPicker value={inputValue} onChange={handleSetYear} />
        <MonthPicker />
      </TimeContainer>
      <FunctionalButtons>
        <ScreenButton />
        <CopyButton />
        <PasteButton />
      </FunctionalButtons>
    </Container>
  );
};
