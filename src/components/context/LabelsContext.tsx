import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { ILabel } from '../../interface/labels';
import { LabelGeneration } from '../../entities/labels';

interface ILabelsContext {
  labels: ILabel[];
  removeLabel: (id: number) => void;
  createNewLabel: (data: Omit<ILabel, 'id'>) => void;
  updateLabel: (label: ILabel) => void;
  setDataFromJSON: (data: ILabel[]) => void;
}

const LabelsContext = React.createContext<ILabelsContext>({
  labels: [],
  removeLabel: () => undefined,
  createNewLabel: () => undefined,
  updateLabel: () => undefined,
  setDataFromJSON: () => undefined,
});
export const useLabels = (): ILabelsContext => useContext(LabelsContext);

export const LabelsContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const controller = useMemo(() => new LabelGeneration(), []);

  const [labels, setLabels] = useState<ILabel[]>(controller.list);

  const removeLabel = useCallback((id: number) => {
    const newArrayOfLabels = controller.deleteLabel(id);
    setLabels(newArrayOfLabels);
  }, []);

  const createNewLabel = useCallback((data: Omit<ILabel, 'id'>) => {
    const newArrayOfLabels = controller.generateNewLabel(data);
    setLabels(newArrayOfLabels);
  }, []);

  const updateLabel = useCallback((label: ILabel) => {
    const newArrayOfLabels = controller.updateLabel(label);
    setLabels(newArrayOfLabels);
  }, []);

  const setDataFromJSON = useCallback((data: ILabel[]) => {
    const newArrayOfLabels = controller.setDataFromJSON(data);
    setLabels(newArrayOfLabels);
  }, []);

  return (
    <LabelsContext.Provider value={{ labels, removeLabel, createNewLabel, updateLabel, setDataFromJSON }}>
      {children}
    </LabelsContext.Provider>
  );
};
