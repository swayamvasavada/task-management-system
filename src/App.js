// import { useState, useEffect } from "react";
// import './App.css';
// import './style/base.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Home from "./components/home";
import CreateTask from "./components/admin/create-task";
import TaskDetail from "./components/admin/task-detail";
import UpdateTask from "./components/admin/update-task";

// function App() {

//   const [data, setData] = useState();

//   useEffect(() => {
//     async function fetchData() {

//       try {
//         console.log('fetching');
//         const res = await fetch('http://localhost:5000/users', {
//           headers: {
//             'X-Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjVhMmM4NDhjMGZiNTBmZjYyN2YyOTAyIiwiZGVzZyI6IlN0dWRlbnQifSwiaWF0IjoxNzA1ODE5NDI3LCJleHAiOjE3MDU5MDU4Mjd9.8WJpi6oFdPEsJs54ZrgrtgIqtRmSpkVKiLDPlWbONzM',
//             'Content-Type': 'application/json'
//           }
//         });
//         const resData = await res.json();
//         // console.log(resData);
//         setData(resData.data);
//         return resData;
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchData();
//   },[]);


//   console.log(data);

//   return (
//     <div className="App">
//       <header className="App-header">
//       </header>
//     </div>
//   );
// }

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