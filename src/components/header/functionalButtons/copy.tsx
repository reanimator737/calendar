import React, { useCallback } from 'react';
import { Button } from '../../base/buttons/style';
import { useEvents } from '../../../context/EventsController';
import { useLabels } from '../../../context/LabelsContext';

export const CopyButton: React.FC = () => {
  const { labels } = useLabels();
  const { events } = useEvents();
  const onClick = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify({ events, labels }));
  }, [events, labels]);
  return <Button onClick={onClick}>Copy JSON</Button>;
};
