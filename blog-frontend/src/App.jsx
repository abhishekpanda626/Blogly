import Header from './Header';
import Signup from './Component/Auth/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom';
import Home from './Component/Home';
import UserLogin from './Component/Auth/Login';
import Account from './Component/User/Account';
import AddPost from './Component/Post/AddPost';
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

// export default function App() {

//   const GET_LOCATIONS = gql`
//   query GetLocations {
//     users {
//       id
//       name
//       email
//       gender
//     }
//   }
// `;
// function DisplayLocations() {
//   const { loading, error, data } = useQuery(GET_LOCATIONS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.locations.map(({ id, name, email, gender }) => (
//     <div key={id}>
//       <h3>{name}</h3>
      
//       <br />
//       <b>About this location:</b>
//       <p>{email}{gender}</p>
//       <br />
//     </div>
//   ));
// }

//   return (
//     <div>
//       <h2>My first Apollo app 🚀</h2>
//       <br />
//       <DisplayLocations />
//     </div>
//   );
// }