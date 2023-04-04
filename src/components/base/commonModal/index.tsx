import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BackDrop, ModalWrap, Root } from './styles';
import classNames from 'classnames';
import { CommonModalProps } from '../../../core/interface/extra';

const open: Keyframe[] | PropertyIndexedKeyframes = [
  { opacity: 0, transform: 'translate(0, -75vh)', pointerEvents: 'none' },
  { opacity: 1, transform: 'translate(0, 0)', pointerEvents: 'initial' },
];

const animationTiming: KeyframeAnimationOptions = { duration: 250, iterations: 1 };

export function CommonModal({ children, modalRef }: CommonModalProps): React.ReactPortal {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // support state for animation, add delay to display modal after close
  const [isShown, setIsShown] = useState<boolean>(false);
  //if true = set start position transform(0, 75vh)
  const [isOpenAnimation, setIsOpenAnimation] = useState<boolean>(true);

  const modalControls = useMemo(
    () => ({
      close: () => setIsOpen(false),
      open: () => {
        setIsOpen(true);
        setIsShown(true);
      },
    }),
    [],
  );

  // connect ref and controls
  useEffect(() => {
    if (modalRef) {
      modalRef.current = modalControls;
    }
  }, [modalRef]);

  // manage animation
  useEffect(() => {
    if (!wrapRef.current) {
      return;
    }

    if (!isOpen) {
      const id = setTimeout(() => {
        setIsShown(false);
        setIsOpenAnimation(true);
      }, 200);

      return () => clearTimeout(id);
    }

    const animation = wrapRef.current.animate(open, animationTiming);
    animation.onfinish = () => setIsOpenAnimation(false);

    return () => {
      animation.onfinish = null;
      animation.finish();
    };
  }, [isOpen]);

  const modalWrapper = isShown ? (
    <Root
      className={classNames([
        'modalRoot',
        {
          close: isShown && !isOpen,
          isOpenAnimation: isOpenAnimation,
        },
      ])}
    >
      <BackDrop className={classNames({ active: isOpen })} onClick={() => modalControls.close()} />
      <ModalWrap
        ref={wrapRef}
        className={classNames({
          modal: true,
          close: isShown && !isOpen,
        })}
      >
        {children}
      </ModalWrap>
    </Root>
  ) : null;

  return createPortal(modalWrapper, document.getElementById('modalWrapper') as HTMLElement);
}
