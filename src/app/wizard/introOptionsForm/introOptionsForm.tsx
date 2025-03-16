import {Button, Form, Radio, Typography} from 'antd'
import {useNavigate} from 'react-router'
import {useGetInsuranceForms} from '../../../api/insurance/useCase'

const IntroOptionsForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const insuranceForms = useGetInsuranceForms()

  const handleNext = () => {
    const type = form.getFieldValue('type')
    if (type) {
      navigate(`?t=${type}`)
    }
  }

  const formTypeOptions =
    insuranceForms.data?.data.map((item) => ({
      value: item.formId,
      label: item.title,
    })) ?? []

  return (
    <>
      <Typography.Title level={3}>
        Pick your application type to continue
      </Typography.Title>
      <Form onFinish={handleNext} form={form}>
        <Form.Item
          rules={[{required: true, message: 'Select type to continue'}]}
          name="type"
        >
          <Radio.Group
            style={{display: 'flex', flexDirection: 'column', gap: 8}}
            options={formTypeOptions}
            optionType="button"
            buttonStyle="solid"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            size="large"
            color="primary"
            variant="outlined"
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default IntroOptionsForm
