import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Home from "./components/home";
import CreateTask from "./components/admin/create-task";
import TaskDetail from "./components/admin/task-detail";
import UpdateTask from "./components/admin/update-task";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} > Signup </Route>
        <Route path="/login" element={<Login />} > Login </Route>
        <Route path="/" element={<Home />} > Home </Route>
        <Route path="/create-task" element={<CreateTask />} > Create Task </Route>
        <Route path="/task/:taskId" element={<TaskDetail />} > Task </Route>
        <Route path="/update-task/:taskId" element={<UpdateTask />} > Update Task </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;