import Header from './Header';
import Signup from './Component/Auth/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom';
import Home from './Component/Home';
import UserLogin from './Component/Auth/Login';
import Account from './Component/User/Account';
import AddPost from './Component/Post/AddPost';
import EditProfile from './Component/User/EditProfile';
import ShowPost from './Component/Post/ShowPost';
import EditComment from './Component/Comment/EditComment';
import ShowComment from './Component/Comment/ShowComment';
import Protected from './Protected';
import EditPost from './Component/Post/EditPost';
import { gql,useQuery } from '@apollo/client';
// const USERS=gql`
// query{
// users{
//   id,name,gender,email,avatar
// }
// }
// `;
function App() {
  let token=localStorage.getItem('access-token')
  //const{loading,error,data}=useQuery(USERS);
  //localStorage.setItem("users",JSON.stringify(data.users));
  return (
    <Router>
  <Header/>
    <Routes>

      
      <Route exact path="/" element={token?<Account/>:<UserLogin/>}/>
      <Route exact path="*" element={token?<Account/>:<UserLogin/>}/>
      <Route exact path="/signIn" element={<UserLogin/>}/>
      <Route exact path="/signUp" element={<Signup/>}/>
      
    <Route element={<Protected/>}>
    <Route exact path="/profile" element={<Account/>}/>
    <Route exact path="/profile/edit" element={<EditProfile/>}/>
    <Route exact path="/post/add" element={<AddPost/>}/>
    <Route exact path="/post/edit" element={<EditPost/>}/>
      <Route exact path="/post/show" element={<ShowPost/>}/>
      <Route exact path="/comment/edit" element={<EditComment/>}/>
      <Route exact path="/comment/show" element={<ShowComment/>}/>
    </Route>
     
    </Routes>
    </Router>
    

  );

}

export default App;