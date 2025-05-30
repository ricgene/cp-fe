import React, { useRef } from "react";
import { Modal } from "@/components/ui";
import { Typography } from "@/components/ui";
import { QRCodeSVG } from "qrcode.react";
import { IOffer } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  offer: IOffer;
}

const styles = {
  modal: "max-w-[450px]",
  contentWrapper: "!min-h-0 text-center",
  container: "flex flex-col items-center gap-6",
  qrWrapper: "bg-white p-6 rounded-lg shadow-sm border border-divider",
  description: "text-center text-paragraph max-w-[300px]",
  footer: "flex flex-col items-center gap-2",
  cancelButton: "m-auto",
};

const QRCodeModal = ({ isOpen, onClose, offer }: Props) => {
  const qrRef = useRef<HTMLDivElement>(null);

  if (!offer?.id) return null;

  const handleDownload = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const scale = 4;
    const size = 200 * scale;
    const padding = 80 * scale;
    const totalHeight = size + padding;

    img.onload = () => {
      canvas.width = size;
      canvas.height = totalHeight;

      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Draw QR code
        ctx.drawImage(img, 0, 0, size, size);

        // Load and draw logo
        const logoImg = new Image();
        logoImg.onload = () => {
          const logoSize = 30 * scale;
          const logoX = (size - logoSize) / 2;
          const logoY = (size - logoSize) / 2;
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

          // Add white background for text
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, size, size, padding);

          // Add text
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Draw offer name
          const text = offer?.name || "QR Code";
          ctx.font = `600 ${
            12 * scale
          }px Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
          ctx.fillText(text, size / 2, size + padding / 3);

          // Draw dates
          ctx.font = `${
            10 * scale
          }px Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
          const formatDate = (date: string) => {
            return new Date(date).toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          };

          const startDate = offer?.startDate
            ? formatDate(offer.startDate)
            : "N/A";
          const endDate = offer?.endDate ? formatDate(offer.endDate) : "N/A";
          const dateText = `${startDate} - ${endDate}`;
          ctx.fillText(dateText, size / 2, size + (padding * 2) / 3);

          // Create and trigger download
          const pngFile = canvas.toDataURL("image/png", 1.0);
          const downloadLink = document.createElement("a");
          downloadLink.download = `qr-code-${offer?.name || "code"}.png`;
          downloadLink.href = pngFile;
          downloadLink.click();
        };
        logoImg.src = "/logo.png";
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      showFooter={true}
      onClose={onClose}
      title={offer?.name || "QR Code"}
      className={styles.modal}
      showCancelButton={true}
      footerClassName={styles.footer}
      primaryButtonText="Download"
      showSecondaryButton={false}
      cancelButtonClassName={styles.cancelButton}
      contentWrapperClassName={styles.contentWrapper}
      onPrimaryClick={handleDownload}
    >
      <div className={styles.container}>
        <Typography level="p1" className={styles.description}>
          Scan the QR code to view offer details
        </Typography>

        <div className={styles.qrWrapper} ref={qrRef}>
          <QRCodeSVG
            value={offer.redeemToken}
            size={240}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/assets/shared/logo.png",
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
