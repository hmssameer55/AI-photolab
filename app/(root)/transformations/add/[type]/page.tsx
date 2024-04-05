import Header from "@/components/shared/header";
import TransformationForm from "@/components/shared/transformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/libs/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AddTransformationPageType = async ({
  params: { type },
}: SearchParamProps) => {
  const transformation = transformationTypes[type];

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          creditBalance={user.creditBalance}
          type={transformation.type as TransformationTypeKey}
        />
      </section>
    </>
  );
};

export default AddTransformationPageType;
