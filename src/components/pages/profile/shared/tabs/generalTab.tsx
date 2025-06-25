import React from "react";
import { IUser } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneralFormData, generalSchema } from "@/schemas";
import { Button, LabeledInput, Typography } from "@/components/ui";

interface Props {
  userData: IUser | null;
}

const styles = {
  container: "flex flex-col gap-8",
  grid: "grid grid-cols-3 gap-8",
  emailInputWrapper: "opacity-70",
  buttonWrapper: "flex justify-end mt-10",
};

const GeneralTab = ({ userData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GeneralFormData>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phone: userData?.phone,
    },
  });

  const onSubmit = (data: GeneralFormData) => {
    // TODO: handle save changes
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Typography level="h2">Profile</Typography>

      <div className={styles.grid}>
        <LabeledInput
          label="First Name"
          leftIcon="user"
          variant="secondary"
          placeholder="Enter your First Name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <LabeledInput
          label="Last Name"
          leftIcon="user"
          variant="secondary"
          placeholder="Enter your Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <LabeledInput
          label="Phone Number"
          leftIcon="phone"
          variant="secondary"
          placeholder="Enter your Number"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <LabeledInput
          label="Email"
          leftIcon="mail"
          variant="secondary"
          value={userData?.email}
          wrapperClassName={styles.emailInputWrapper}
          disabled
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          size="small"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default GeneralTab;
