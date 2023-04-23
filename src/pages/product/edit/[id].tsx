import { useRouter } from "next/router";
import { type NextPage } from "next";

import CreateEditForm from "~/shared/products/components/create-edit-form";
import Layout from "~/components/layout";
import { api } from "~/utils/api";

const EditProductPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id?.toString() ?? "";
  const { data: initialValue } = api.product.getProductById.useQuery({ id });

  return (
    <Layout>
      <div className="flex  h-full items-center justify-center">
        {initialValue && (
          <CreateEditForm
            initialValueProps={{
              name: initialValue.name,
              price: initialValue.price.toString(),
            }}
            id={id}
          />
        )}
      </div>
    </Layout>
  );
};
export default EditProductPage;
