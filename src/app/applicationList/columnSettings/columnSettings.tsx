import {TableOutlined} from '@ant-design/icons'
import {Button, Popover, Switch, Typography, type TableColumnsType} from 'antd'
import type {Dispatch, SetStateAction} from 'react'

export interface ColumnSettingPropType {
  columns: TableColumnsType<unknown>
  setHiddenColumns: Dispatch<SetStateAction<string[]>>
}
const ColumnSetting = ({columns, setHiddenColumns}: ColumnSettingPropType) => {
  const handleSwitchChange = (checked: boolean, column: string) => {
    setHiddenColumns((prev) =>
      checked ? prev.filter((id) => id !== column) : [...prev, column],
    )
  }

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      title={<Typography.Title level={4}>Column Settings</Typography.Title>}
      content={columns?.map((col) => {
        return (
          <div
            key={col.key}
            style={{
              minWidth: '300px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
            }}
          >
            <Typography.Text>{col.title as string}</Typography.Text>
            <Switch
              disabled={col.key === columns[0].key}
              onChange={(checked) =>
                handleSwitchChange(checked, col.key as unknown as string)
              }
              checked={!col.hidden}
              size="small"
            />
          </div>
        )
      })}
    >
      <Button icon={<TableOutlined />} />
    </Popover>
  )
}

export default ColumnSetting
