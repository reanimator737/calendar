import React from 'react';
import { CommonModal } from '../base/commonModal';
import { ButtonContainer, Container } from './style';
import { SubHeader } from '../base/text/style';
import { Button, RejectButton } from '../base/buttons/style';
import { CommonModalProps } from '../../core/interface/extra';

export const ConfirmModal: React.FC<CommonModalProps & { handleClick: () => void }> = ({ modalRef, handleClick }) => {
  return (
    <CommonModal modalRef={modalRef}>
      <Container>
        <SubHeader>
          Are you certain that you
          <br />
          wish to delete this item?
        </SubHeader>

        <ButtonContainer>
          <Button onClick={() => modalRef.current?.close()}>Cancel</Button>
          <RejectButton onClick={handleClick}>Delete</RejectButton>
        </ButtonContainer>
      </Container>
    </CommonModal>
  );
};
