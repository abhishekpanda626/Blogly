import Header from './Header';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom'
import Home from './Home';
import UserLogin from './Auth/login';
import { useQuery } from '@apollo/client';
import { GET_GEN_3 } from "./gql/Query";
function App() {
  // return (
  //   <Router>
  // <Header/>
  //   <Routes>
  //     <Route exact path="/" element={<Home/>}>
  //     </Route>
  //     <Route exact path="/login" element={<UserLogin/>}>

  //     </Route>
  //   </Routes>
  //   </Router>
    

  // );
  const { loading, error, data } = useQuery(GET_GEN_3);
  console.log(data);
}

export default App;
