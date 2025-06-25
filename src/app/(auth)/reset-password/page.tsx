import { Suspense } from "react";
import { Typography } from "@/components/ui";
import { ResetPasswordForm } from "@/components/pages/auth";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="m-auto md:min-w-md bg-primary/10 py-8 px-10 md:px-12 rounded-3xl">
          <Typography level="p1">Lodaing Token...</Typography>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
