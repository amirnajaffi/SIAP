import {Alert, Button, Form, notification} from 'antd'
import {useEffect} from 'react'
import {useNavigate, useSearchParams} from 'react-router'
import {
  useCreateInsurance,
  useGetInsuranceForms,
} from '../../../api/insurance/useCase'
import useFormDraft from '../../../hooks/useFormDraft'
import {data} from '../data'
import SmartField from '../smartField/smartField'
import {convertDatesToDayjs} from './formView.util'

const FormView = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const insuranceType = searchParams.get('t')
  const formIds = data.map((item) => item.formId)
  const insuranceForms = useGetInsuranceForms()
  const createInsurance = useCreateInsurance()
  const {draft, removeDraft} = useFormDraft(insuranceType)

  const handleFinish = (data: any) => {
    createInsurance.mutate(data, {
      onSuccess(data) {
        removeDraft()
        notification.success({message: data.data.message})
        navigate('/')
      },
    })
  }

  useEffect(() => {
    if (!formIds.includes(insuranceType!)) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!insuranceForms.isLoading && Object.keys(draft).length > 0) {
      form.setFieldsValue(convertDatesToDayjs(draft))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insuranceForms.isLoading])

  return (
    <Form onFinish={handleFinish} form={form} layout="horizontal">
      {insuranceType === 'home_insurance_application' && (
        <Alert
          message="In the 'home_insurance_application', there's a backend issue where the 'state' field depends on the 'country' field. However, the backend response doesn't include the 'country' field. Since 'state' requires a 'country' to proceed with the server fetch, the form is currently non-functional."
          type="error"
          style={{marginBottom: '8px'}}
        />
      )}
      {insuranceForms.data?.data
        .find((item) => item.formId === insuranceType)
        ?.fields.map((field) => (
          <SmartField
            key={field.id}
            field={field}
            form={form}
            formId={insuranceType}
          />
        ))}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={createInsurance.isPending}
        >
          Submit Application
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormView
