import React, { useCallback } from 'react';
import { useEvents } from '../../../context/EventsController';
import { IEventList } from '../../../core/interface/events';
import { ILabel } from '../../../core/interface/labels';
import { useLabels } from '../../../context/LabelsContext';
import { Button } from '../../base/buttons/style';

export const PasteButton: React.FC = () => {
  const { setDataFromJSON } = useEvents();
  const { setDataFromJSON: setDataForLabelsFromJSON } = useLabels();
  const onClick = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const { events, labels } = JSON.parse(text) as {
        events: IEventList;
        labels: ILabel[];
      };

      if (!events || !labels) {
        alert('You try to paste smth strange)');
        return;
      }
      setDataFromJSON(events);
      setDataForLabelsFromJSON(labels);
    } catch (e) {
      console.error(e);
      alert('You try to paste smth strange)');
      return;
    }
  }, []);
  return <Button onClick={onClick}>Read Clipboard</Button>;
};
