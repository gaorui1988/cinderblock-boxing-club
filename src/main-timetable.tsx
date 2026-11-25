import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { Timetable } from './pages/Timetable.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Timetable />
  </StrictMode>,
)
