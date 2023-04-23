import { SubmitHandler, useForm } from "react-hook-form";
import { CreateEditFormProps, Inputs } from "./interface";
import { api } from "~/utils/api";
import { defaultInputs } from "./data";
import { useRouter } from "next/router";

function CreateEditForm(props: CreateEditFormProps) {
  const { id, initialValueProps } = props;
  const router = useRouter();
  const initialValue = initialValueProps ?? defaultInputs;
  const { register, handleSubmit, formState } = useForm<Inputs>({
    defaultValues: initialValue,
  });
  const { refetch } = api.product.getProducts.useQuery();
  const { mutate: createMutate } = api.product.createProduct.useMutation();
  const { mutate: editMutate } = api.product.updateProduct.useMutation();
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (id) {
      editMutate({ id, ...data });
    } else {
      createMutate(data);
    }
    // refetch();
    router.push("/product").then(() => {
      refetch();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  rounded-xl bg-violet-900 px-8 py-10 shadow-sm"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-medium text-white" htmlFor="name">
            Nombre:
          </label>
          <input
            className="block w-full rounded-lg border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Introduce el nombre"
          />
        </div>
        <div>
          <label className="block font-medium text-white" htmlFor="price">
            Precio:
          </label>
          <input
            className="block w-full rounded-lg border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            type="number"
            id="price"
            {...register("price", { required: true })}
            placeholder="Introduce el precio"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-lime-500 px-4 py-2 text-white"
        >
          {id ? "Editar Producto" : "Crear producto"}
        </button>
      </div>
    </form>
  );
}

export default CreateEditForm;
