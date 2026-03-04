import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Feed from "./pages/Feed";
// import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path="/register" element={<Register />} />

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
   </BrowserRouter>
  )
}

export default App
