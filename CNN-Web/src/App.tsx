import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {HomePage} from '@/route/HomePage.tsx'
import {Navbar} from '@/component/Navbar.tsx'
import {ThemeProvider} from '@/component/ThemeProvider.tsx'
import {Toaster} from '@/components/ui/toaster.tsx'

function App() {
  return (
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vite-ui-theme'>
      <Router>
        {/*<AuthProvider>*/}
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
        </Routes>
        <Toaster />
        {/*</AuthProvider>*/}
      </Router>
    </ThemeProvider>
  )
}

export default App
