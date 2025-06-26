import Image from "next/image";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/Icons";
import { RoleEnum } from "@/enums";
import { handleError } from "@/utils";
import { updateProfile } from "@/requests";
import { useUserData } from "@/store/userData.atom";
import { Button, Typography } from "@/components/ui";
import { ImageUpdateFormData, imageUpdateSchema } from "@/schemas";

const styles = {
  container: "flex items-center gap-8",
  imageWrapper: "relative",
  imageContainer:
    "relative h-[100px] aspect-square rounded-full overflow-hidden bg-gray-100",
  cameraButton:
    "absolute z-10 bottom-0 right-0 -translate-x-1/6 -translate-y-1/6 rounded-full p-0 h-6 w-6 !opacity-100",
  cameraIcon: "h-4 w-4",
  hiddenInput: "hidden",
  name: "mb-1 font-semibold text-3xl text-heading",
  role: "text-paragraph capitalize",
  shareButtonWrapper: "ml-auto",
  shareButton: "rounded-full p-0 h-10 w-10",
  shareIcon: "h-4 w-4",
};

const ImageSection = () => {
  const { userData } = useUserData();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const userDescription =
    userData?.role === RoleEnum.ADMIN
      ? "Admin"
      : `${userData?.businessName} | ${userData?.businessType?.toLowerCase()}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ImageUpdateFormData>({
    resolver: zodResolver(imageUpdateSchema),
  });

  // for image input
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    ref: registerInputRef,
    onChange: registerInputOnChange,
    ...inputProps
  } = register("image");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isSubmitting) return;

    const files = event.target.files;
    if (!files) return;

    if (files && files[0]) {
      setPreviewUrl(URL.createObjectURL(files[0]));
    }

    handleSubmit((data) => onSubmit(data))();
  };

  const onSubmit = async (data: ImageUpdateFormData) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    try {
      const response = await updateProfile(formData);
      toast.success(
        response?.data?.message || "Profile image updated successfully"
      );
    } catch (error) {
      toast.error((error as Error).message || "Failed to update image");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "CityPerks",
          text: "Check out CityPerks!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
        handleError("Share Failed");
      }
    } else {
      handleError("Share not supported in this browser");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={
              previewUrl ||
              userData?.image?.url ||
              "/assets/shared/fallback-avatar.png"
            }
            alt="profile"
            fill
          />
        </div>

        <Button
          variant="primary"
          className={styles.cameraButton}
          onClick={() => fileInputRef.current?.click()}
          loading={isSubmitting}
          type="button"
        >
          <Icon name="camera" className={styles.cameraIcon} />
        </Button>

        <input
          type="file"
          accept="image/*"
          multiple={false}
          className={styles.hiddenInput}
          ref={(e) => {
            registerInputRef(e);
            fileInputRef.current = e;
          }}
          onChange={(e) => {
            registerInputOnChange(e);
            handleFileChange(e);
          }}
          {...inputProps}
        />
      </div>

      <div>
        <Typography level="custom" className={styles.name}>
          {userData?.name}
        </Typography>

        <Typography level="custom" className={styles.role}>
          {userDescription}
        </Typography>

        {errors.image && (
          <Typography level="custom" className="text-red-500 text-xs mt-1">
            {errors.image.message as string}
          </Typography>
        )}
      </div>

      <div className={styles.shareButtonWrapper}>
        <Button
          type="submit"
          variant="primary"
          onClick={handleShare}
          className={styles.shareButton}
        >
          <Icon name="share" className={styles.shareIcon} />
        </Button>
      </div>
    </div>
  );
};

export default ImageSection;
