import {Space, Table} from 'antd'
import {useDebounceValue, useLocalStorage} from 'usehooks-ts'
import {useGetInsuranceSubmissions} from '../../api/insurance/useCase'
import ColumnSetting from './columnSettings/columnSettings'
import SearchInput from './searchInput/searchInput'

const ApplicationList = () => {
  const [hiddenColumns, setHiddenColumns] = useLocalStorage(
    'insurance-table',
    [],
  )
  const [searchText, setSearchText] = useDebounceValue('', 300)
  const insuranceSubmissions = useGetInsuranceSubmissions()

  const columns =
    insuranceSubmissions.data?.data?.columns.map((col) => {
      return {
        title: col,
        dataIndex: col,
        key: col,
        sorter: (a, b) => {
          if (col === 'Age') {
            return a[col] - b[col]
          }
          return a[col]?.localeCompare?.(b[col])
        },
        hidden: hiddenColumns.includes(col),
      }
    }) ?? []

  const filteredData =
    insuranceSubmissions.data?.data?.data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchText.toLowerCase()),
      ),
    ) ?? []

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Space direction="horizontal">
        <SearchInput setSearchText={setSearchText} />
        <ColumnSetting columns={columns} setHiddenColumns={setHiddenColumns} />
      </Space>
      <Table
        rowSelection={{type: 'checkbox'}}
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{pageSize: 10}}
        scroll={{x: true}}
      />
    </Space>
  )
}

export default ApplicationList
