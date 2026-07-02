import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.tsx'
import './index.css'
import PostScheduleApp from './screens/postSchedule/PostscheduleApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostScheduleApp />
    {/* <App /> */}
  </StrictMode>,
)
