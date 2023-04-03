import React, { useCallback } from 'react';
import html2canvas from 'html2canvas';
import { useScreenShotRef } from '../../context/ScreenShotRefContext';
import { Button } from '../../base/buttons/style';

export const ScreenButton: React.FC = () => {
  const { calendarRef } = useScreenShotRef();
  const screen = useCallback(() => {
    if (calendarRef.current) {
      html2canvas(calendarRef.current).then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = dataURL;
        link.click();
        document.body.removeChild(link);
      });
    }
  }, [calendarRef.current]);
  return <Button onClick={screen}>Screen</Button>;
};
