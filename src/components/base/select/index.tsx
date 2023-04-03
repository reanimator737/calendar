import { SelectContainer, SelectOptionItem, SelectOptionList, SelectInput, SelectArrow } from './style';
import React, { useCallback, useRef, useState } from 'react';
import { BaseText } from '../text/style';
import { ReactComponent as Arrow } from '../../../assets/arrowDown.svg';
import { useOutsideClick } from '../../../hooks/clickOutsideEl';
import { getMonthNumber } from '../../../helpers';

interface SelectProps {
  options: string[];
  value: string | number;
  onChange: (value: number) => void;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const outsideClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useOutsideClick(ref, outsideClick);
  const handleContainerClick = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const handleSelect = useCallback((option: string) => {
    onChange(getMonthNumber(option));
    setIsOpen(false);
  }, []);

  return (
    <SelectContainer ref={ref}>
      <SelectInput onClick={handleContainerClick}>
        <BaseText>{value}</BaseText>
        <SelectArrow>
          <Arrow />
        </SelectArrow>
      </SelectInput>
      <SelectOptionList isOpen={isOpen}>
        {options.map((option) => (
          <SelectOptionItem
            key={option}
            onClick={() => handleSelect(option)}
            className={option === value ? 'active' : ''}
          >
            <BaseText>{option}</BaseText>
          </SelectOptionItem>
        ))}
      </SelectOptionList>
    </SelectContainer>
  );
};
