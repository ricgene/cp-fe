import React, { ReactNode } from "react";
import Modal from "@/components/ui/modal";
import { twMerge } from "tailwind-merge";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  className?: string;
  footerClassName?: string;
  cancelButtonText?: string;
  centerContent?: ReactNode;
  approveButtonText?: string;
  onApprove: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const styles = {
  container: "w-[400px]",
  contentWrapper:
    "!min-h-auto flex flex-col justify-center items-center !text-center",
  footer: "!pt-0 !flex-row-reverse gap-5",
};

const ConfirmationModal = ({
  title,
  isOpen,
  onCancel,
  onApprove,
  className,
  description,
  centerContent,
  footerClassName,
  isLoading = false,
  cancelButtonText = "Cancel",
  approveButtonText = "Proceed",
}: ConfirmationModalProps) => {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      showFooter={true}
      showCancelButton={false}
      description={description}
      className={twMerge(styles.container, className)}
      isPrimaryLoading={isLoading}
      footerClassName={twMerge(styles.footer, footerClassName)}
      primaryButtonText={approveButtonText}
      secondaryButtonText={cancelButtonText}
      contentWrapperClassName={styles.contentWrapper}
      onClose={onCancel}
      onPrimaryClick={onApprove}
      onSecondaryClick={onCancel}
    >
      {centerContent}
    </Modal>
  );
};

export default ConfirmationModal;
