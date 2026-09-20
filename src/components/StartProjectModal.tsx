import React from 'react';
import { GoogleProjectFormModal } from './GoogleProjectFormModal';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  initialData?: {
    title?: string;
    type?: string;
    description?: string;
  };
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  initialData,
}) => {
  return (
    <GoogleProjectFormModal
      isOpen={isOpen}
      onClose={onClose}
      initialData={{
        type: defaultService,
        ...initialData,
      }}
    />
  );
};
