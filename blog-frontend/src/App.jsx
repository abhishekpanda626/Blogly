import Header from './Header';
import Signup from './Component/Auth/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom';
import Home from './Component/Home';
import UserLogin from './Component/Auth/Login';
import Account from './Component/User/Account';
import AddPost from './Component/Post/AddPost';
import { useQuery, gql } from '@apollo/client';
import ShowPost from './Component/Post/ShowPost';
import AddComment from './Component/Comment/AddComment';
import ShowComment from './Component/Comment/ShowComment';
function App() {
  return (
    <Router>
  <Header/>
    <Routes>
      <Route exact path="/profile" element={<Account/>}>
      </Route>
      <Route exact path="/" element={<UserLogin/>}/>
      <Route exact path="/signIn" element={<UserLogin/>}/>
      <Route exact path="/signUp" element={<Signup/>}/>
      

      <Route exact path="/post/add" element={<AddPost/>}/>
      <Route exact path="/post/show" element={<ShowPost/>}/>
      <Route exact path="/comment/add" element={<ShowPost/>}/>
      <Route exact path="/comment/show" element={<ShowPost/>}/>
      


    </Routes>
    </Router>
    

  );

}

export default App;
// import { useQuery, gql } from '@apollo/client';
// import React, { useState, useEffect } from 'react';
// export default function App() {
//   const [id,setId]=useState("");

//   const Get_Users = gql`
//   query  get_user{
//     users{
//       id
//      name
//        email
//        gender
//        posts{
//         title
//         comments{
//           comment
//         }
//       }
//     }
//    }
// `;
// function DisplayUsers() {
// const { loading, error, data } = useQuery(Get_Users);

//   if (loading) return <p>Loading... {console.log(loading)}  </p>;
//   if (error) return <p>Error :( {console.log(error.graphQLErrors)}  </p>;

//   return data.users.map(({ id, name, email, gender }) => (
    
//     <div key={id}>
//       <h3>{name}</h3>
      
//       <br />
//       <b>Details:</b>
//       <p>{email} <br /> {gender}</p>
//       <br />
//     </div>
//   ));
// }

//   return (
//     <div>
//       <h2>My first Apollo app 🚀</h2>
//       <br />
//       <DisplayUsers />
//     </div>
//   );
// }