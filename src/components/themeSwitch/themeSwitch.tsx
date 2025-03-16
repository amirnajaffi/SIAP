import {MoonFilled, SunFilled} from '@ant-design/icons'
import {Switch} from 'antd'
import usePreferredColorScheme from '../../hooks/usePreferredColorScheme'

const ThemeSwitch = () => {
  const {preferredColor, setPreferredColor} = usePreferredColorScheme()

  return (
    <div
      style={{
        marginLeft: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {preferredColor === 'light' ? (
        <SunFilled style={{color: '#fff'}} />
      ) : (
        <MoonFilled style={{color: '#fff'}} />
      )}
      <Switch
        onChange={(checked) => setPreferredColor(checked ? 'dark' : 'light')}
        checked={preferredColor === 'dark'}
        size="small"
      />
    </div>
  )
}

export default ThemeSwitch
