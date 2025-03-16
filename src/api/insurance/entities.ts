export interface InsuranceForms {
  formId: string
  title: string
  fields: Field[]
}

export type ApplicationSubmissions = {
  columns: string[];
  data: Array<{
    id: string;
    "Full Name": string;
    Age: number;
    Gender: "Male" | "Female";
    "Insurance Type": string;
    City: string;
  }>;
};

type Field =
  | GroupField
  | TextField
  | DateField
  | SelectField
  | RadioField
  | CheckboxField
  | NumberField

interface BaseField {
  id: string
  label: string
  type: string
  required?: boolean
  visibility?: VisibilityCondition
}

interface GroupField extends BaseField {
  type: 'group'
  fields: Field[]
}

interface TextField extends BaseField {
  type: 'text'
  validation?: {
    pattern?: string
  }
}

interface DateField extends BaseField {
  type: 'date'
}

interface SelectWithOptions extends BaseField {
  type: 'select'
  options: string[]
}

interface SelectWithDynamic extends BaseField {
  type: 'select'
  dynamicOptions: DynamicOptions
}

type SelectField = SelectWithOptions | SelectWithDynamic

interface RadioField extends BaseField {
  type: 'radio'
  options: string[]
}

interface CheckboxField extends BaseField {
  type: 'checkbox'
  options: string[]
}

interface NumberField extends BaseField {
  type: 'number'
  validation?: {
    min?: number
    max?: number
  }
}

interface VisibilityCondition {
  dependsOn: string
  condition: string
  value: string | number | boolean
}

interface DynamicOptions {
  dependsOn: string
  endpoint: string
  method: string
}
