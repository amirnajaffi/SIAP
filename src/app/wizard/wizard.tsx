import {Spin} from 'antd'
import {useSearchParams} from 'react-router'
import {useGetInsuranceForms} from '../../api/insurance/useCase'
import FormView from './formView/formView'
import IntroOptionsForm from './introOptionsForm/introOptionsForm'

const Wizard = () => {
  const [searchParams] = useSearchParams()
  const insuranceType = searchParams.get('t')
  const insuranceForms = useGetInsuranceForms()

  if (insuranceForms.isLoading) {
    return <Spin spinning={true} fullscreen />
  }

  if (!insuranceType) return <IntroOptionsForm />

  return <FormView />
}

export default Wizard
