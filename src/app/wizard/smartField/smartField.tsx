import {
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Typography,
} from 'antd'
import {useEffect, useState} from 'react'
import {useGetInsuranceFormDynamicValues} from '../../../api/insurance/useCase'
import useFormDraft from '../../../hooks/useFormDraft'

const inputComponents = {
  text: Input,
  number: InputNumber,
  date: DatePicker,
  select: Select,
  radio: Radio.Group,
  checkbox: Checkbox.Group,
}

const SmartField = ({field, form, formId}) => {
  const [options, setOptions] = useState(field.options || [])
  const {setDraft} = useFormDraft(formId)

  const dynamicDependOnFieldValue =
    Form.useWatch(field.dynamicOptions?.dependsOn ?? '', form) || undefined
  const visibilityDependOnFieldValue =
    Form.useWatch(field?.visibility?.dependsOn ?? '', form) || undefined

  const dynamicOptions = useGetInsuranceFormDynamicValues(
    field?.dynamicOptions?.endpoint,
    field?.dynamicOptions?.method,
    {[field.dynamicOptions?.dependsOn]: dynamicDependOnFieldValue},
    !!field?.dynamicOptions?.endpoint && !!dynamicDependOnFieldValue,
  )

  useEffect(() => {
    if (dynamicOptions.data?.data) {
      setOptions(dynamicOptions.data?.data.options)
    }
  }, [dynamicDependOnFieldValue, dynamicOptions.data?.data])

  if (field.visibility) {
    if (
      field.visibility.condition === 'equals' &&
      visibilityDependOnFieldValue !== field.visibility.value
    ) {
      return null
    }
  }

  if (field.type === 'group') {
    return (
      <Card style={{marginBottom: '16px'}}>
        <Typography.Title level={5}>{field.label}</Typography.Title>
        {field.fields.map((subField) => (
          <SmartField
            key={subField.id}
            field={subField}
            form={form}
            formId={formId}
          />
        ))}
      </Card>
    )
  }

  const generateRules = () => {
    const rules = []
    if (field.required) {
      rules.push({required: true, message: `required`})
    }
    if (field.validation) {
      if (field.validation.min !== undefined) {
        rules.push({
          type: 'number',
          min: field.validation.min,
          message: `Minimum value is ${field.validation.min}`,
        })
      }
      if (field.validation.max !== undefined) {
        rules.push({
          type: 'number',
          max: field.validation.max,
          message: `Maximum value is ${field.validation.max}`,
        })
      }
      if (field.validation.pattern) {
        rules.push({
          pattern: new RegExp(field.validation.pattern),
          message: field.validation.message || 'Invalid format',
        })
      }
    }
    return rules
  }

  const Component = inputComponents[field.type]

  const inputProps = {
    placeholder: `Enter ${field.label}`,
    loading: dynamicOptions.isFetching,
    style: {width: '100%'},
    onBlur: () => setDraft(form.getFieldsValue()),
    options: options.map((opt) =>
      typeof opt === 'string' ? {label: opt, value: opt} : opt,
    ),
  }

  return (
    <Form.Item name={field.id} label={field.label} rules={generateRules()}>
      <Component {...inputProps} />
    </Form.Item>
  )
}

export default SmartField
