import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CurriculumPage from './pages/CurriculumPage'
import UnitPage from './pages/UnitPage'
import LessonPage from './pages/LessonPage'
import Layout from './components/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/unit/:unitId" element={<UnitPage />} />
          <Route path="/unit/:unitId/lesson/:lessonId" element={<LessonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
