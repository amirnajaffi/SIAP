import type {AxiosResponse} from 'axios'

export const getInsuranceFormDynamicValuesTransformer = (
  endpoint: string,
  data: AxiosResponse<any>,
) => {
  /*
   normalize different types of data to options so i component i can call options on different types
   */
  if (endpoint === '/api/getStates') {
    data.data.options = data.data?.states
    return data
  }

  return data
}
