
import axios, {type AxiosResponse} from 'axios'
import {BASE_URL} from '../../constants'
import type {ApplicationSubmissions, InsuranceForms} from './entities'
import {getInsuranceFormDynamicValuesTransformer} from './transaformer'

export const getInsuranceForms = async (
  signal: AbortSignal,
): Promise<AxiosResponse<InsuranceForms[]>> => {
  return axios.get(`${BASE_URL}/api/insurance/forms`, {
    signal,
  })
}

export const createInsurance = async (data: any): Promise<any> => {
  return axios.post(`${BASE_URL}/api/insurance/forms/submit`, data)
}

export const getInsuranceFormDynamicValues = async <T = any>(
  endpoint: string,
  method: 'POST' | 'GET',
  data?: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<AxiosResponse<T>> => {
  const res = await axios.request<T>({
    method,
    url: `${BASE_URL}${endpoint}`,
    data: method.toLowerCase() === 'get' ? undefined : data,
    params: method.toLowerCase() === 'get' ? data : undefined,
    signal,
  })

  return getInsuranceFormDynamicValuesTransformer(endpoint, res)
}

export const getInsuranceSubmissions = async (
  signal: AbortSignal,
): Promise<AxiosResponse<ApplicationSubmissions>> => {
  return axios.get(`${BASE_URL}/api/insurance/forms/submissions`, {
    signal,
  })
}