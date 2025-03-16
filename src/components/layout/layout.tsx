import {Layout as AntdLayout, theme} from 'antd'
import type {ReactNode} from 'react'
import Header from '../header/header'

const {Content} = AntdLayout

const Layout = ({children}: {children: ReactNode}) => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken()

  return (
    <AntdLayout>
      <Header />
      <Content style={{padding: '24px 12px'}}>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: 24,
          }}
        >
          {children}
        </div>
      </Content>
    </AntdLayout>
  )
}

export default Layout
