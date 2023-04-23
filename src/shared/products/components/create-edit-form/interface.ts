export interface CreateEditFormProps {
  id?: string;
  initialValueProps?: Inputs;
}

export type Inputs = {
  name: string;
  price: string;
};
