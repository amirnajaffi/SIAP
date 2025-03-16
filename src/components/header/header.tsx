import {IdcardOutlined, PlusCircleOutlined} from '@ant-design/icons'
import {Layout as AntdLayout, Menu, Typography} from 'antd'
import type {ItemType} from 'antd/es/menu/interface'
import {useNavigate} from 'react-router'
import ThemeSwitch from '../themeSwitch/themeSwitch'

const items: ItemType[] = [
  {
    key: '/',
    label: 'New Application',
    icon: <PlusCircleOutlined />,
  },
  {
    key: '/list',
    label: 'Submitted Applications',
    icon: <IdcardOutlined />,
  },
]

const Header = () => {
  const navigate = useNavigate()

  const menuClickHandler = (item: ItemType) => {
    if (item?.key) navigate(item?.key as string)
  }

  return (
    <AntdLayout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography.Title level={4} type="warning" style={{margin: 0}}>
        Insurance Portal
      </Typography.Title>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{flex: 1, minWidth: 0, justifyContent: 'flex-end'}}
        onClick={menuClickHandler}
      />
      <ThemeSwitch />
    </AntdLayout.Header>
  )
}

export default Header
