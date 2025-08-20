import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="text-center mx-auto my-10 w-screen">
            <h1>We are building your app...</h1>
            <p className="read-the-docs mx-auto">
              <div className="my-8 items-center flex flex-col space-y-3 animate-pulse">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              Just a moment. You should see updates shortly.
            </p>
          </div>
        } />
      </Routes>
    </Router>
  )
}
export default App
