"use client";

import { ReactNode, useEffect, useState } from "react";
import { Button, Typography } from "@/components/ui";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  title: string;
  isOpen: boolean;
  className?: string;
  children?: ReactNode;
  description?: string;
  showFooter?: boolean;
  footerClassName?: string;
  cancelButtonText?: string;
  primaryButtonText?: string;
  showCancelButton?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  isPrimaryLoading?: boolean;
  isSecondaryLoading?: boolean;
  secondaryButtonText?: string;
  cancelButtonClassName?: string;
  contentWrapperClassName?: string;
  onClose: () => void;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

const styles = {
  container:
    "fixed inset-0 h-screen w-screen flex items-center justify-center p-8 [background:var(--gradient-background)] z-50 overflow-hidden transition-opacity duration-300 opacity-0",
  modalContent:
    "max-h-full w-full max-w-[600px] bg-white rounded-xl p-8 border border-divider overflow-y-auto transition-all duration-300 transform",
  modalContentVisible: "opacity-100 translate-y-0",
  modalContentHidden: "opacity-0 translate-y-4",
  contentWrapper: "h-full min-h-[500px] flex flex-col",
  description: "mt-2",
  content: "my-6",
  footer: "flex items-center max-sm:flex-col gap-2 pt-5 mt-auto",
  cancelButton: "sm:ml-auto",
  overlay:
    "fixed inset-0 bg-black/50 transition-opacity duration-300 opacity-0",
  itemVisible: "!opacity-100",
};

const Modal = ({
  title,
  isOpen,
  children,
  className,
  description,
  footerClassName,
  cancelButtonClassName,
  contentWrapperClassName,
  showPrimaryButton = true,
  showSecondaryButton = true,
  showCancelButton = true,
  showFooter = true,
  isPrimaryLoading = false,
  isSecondaryLoading = false,
  cancelButtonText = "Cancel",
  primaryButtonText = "Submit",
  secondaryButtonText,
  onClose,
  onPrimaryClick,
  onSecondaryClick,
}: ModalProps) => {
  const isLoading = isPrimaryLoading || isSecondaryLoading;
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div className={twMerge(styles.container, isVisible && styles.itemVisible)}>
      <div
        className={twMerge(styles.overlay, isVisible && styles.itemVisible)}
      />
      <div
        className={twMerge(
          styles.modalContent,
          isVisible ? styles.modalContentVisible : styles.modalContentHidden,
          className
        )}
      >
        <div
          className={twMerge(styles.contentWrapper, contentWrapperClassName)}
        >
          {/* title */}
          <Typography level="h2">{title}</Typography>

          {/* description */}
          {description && (
            <Typography level="p1" className={styles.description}>
              {description}
            </Typography>
          )}

          {/* content */}
          <div className={styles.content}>{children}</div>

          {/* footer */}
          {showFooter && (
            <div className={twMerge(styles.footer, footerClassName)}>
              {showPrimaryButton && (
                <Button
                  className="min-w-[110px]"
                  size="small"
                  variant="primary"
                  onClick={onPrimaryClick}
                  loading={isPrimaryLoading}
                  disabled={isLoading}
                >
                  {primaryButtonText}
                </Button>
              )}

              {showSecondaryButton && (
                <Button
                  className="min-w-[100px]"
                  variant="secondary"
                  size="small"
                  onClick={() => onSecondaryClick?.()}
                  loading={isSecondaryLoading}
                  disabled={isLoading}
                >
                  {secondaryButtonText}
                </Button>
              )}

              {showCancelButton && (
                <Button
                  variant="text"
                  size="small"
                  className={twMerge(
                    styles.cancelButton,
                    cancelButtonClassName
                  )}
                  onClick={onClose}
                  disabled={isLoading}
                >
                  {cancelButtonText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
