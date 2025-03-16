import {ConfigProvider, theme} from 'antd'
import {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router'
import Layout from './components/layout/layout'
import usePreferredColorScheme from './hooks/usePreferredColorScheme'
import './App.css'

const ApplicationList = lazy(
  () => import('./app/applicationList/applicationList'),
)
const Wizard = lazy(() => import('./app/wizard/wizard'))

function App() {
  const {preferredColor} = usePreferredColorScheme()

  return (
    <ConfigProvider
      theme={{
        algorithm:
          preferredColor === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Wizard />} />
            <Route path="/list" element={<ApplicationList />} />
          </Routes>
        </Suspense>
      </Layout>
    </ConfigProvider>
  )
}

export default App
