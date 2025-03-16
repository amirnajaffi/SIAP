import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import type {AxiosResponse} from 'axios'
import type {ApplicationSubmissions, InsuranceForms} from './entities'
import {
  createInsurance,
  getInsuranceFormDynamicValues,
  getInsuranceForms,
  getInsuranceSubmissions,
} from './repository'

export const useGetInsuranceForms = (): UseQueryResult<
  AxiosResponse<InsuranceForms[]>
> => {
  return useQuery({
    queryKey: ['insurance-forms'],
    queryFn: ({signal}) => getInsuranceForms(signal),
    
  })
}

export const useCreateInsurance = (): UseMutationResult<
  AxiosResponse<{message: string; status: string}>,
  any,
  any
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => {
      return createInsurance(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['insurance-submissions'],
      })
    },
  })
}

export const useGetInsuranceFormDynamicValues = (
  endpoint: string,
  method: 'POST' | 'GET',
  params: Record<string, unknown>,
  enabled: boolean,
): UseQueryResult<AxiosResponse> => {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: ({signal}) =>
      getInsuranceFormDynamicValues(endpoint, method, params, signal),
    enabled,
  })
}

export const useGetInsuranceSubmissions = (): UseQueryResult<
  AxiosResponse<ApplicationSubmissions>
> => {
  return useQuery({
    queryKey: ['insurance-submissions'],
    queryFn: ({signal}) => getInsuranceSubmissions(signal),
  })
}
