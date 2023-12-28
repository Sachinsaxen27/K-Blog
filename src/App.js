import NavBar from "./Component/NavBar";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NewsComp from "./Component/NewsComp";
import Home from "./Component/Home";
import Blog from "./Component/Blog";
import LoginPage from "./Component/LoginPage";
import SignUP from "./Component/SignUP";
import AddBlog from "./Component/AddBlog";
import BlogState from "./ComponentAPI/BlogState";
import Profile from "./Component/Profile";
import Favourite from "./Component/Favourite";
import MyBlog from "./Component/MyBlog";
import Editblog from "./Component/Editblog";
import OpenBlog from "./Component/OpenBlog";
// import Science from "./Component/Science";
function App() {
  return (
    <>
      <BlogState>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home key='tech' category='tech' />}></Route>
            <Route exact path="/news" element={<Home category='technology' key='technology' />}></Route>
            <Route exact path="/space" element={<Home category='space' key="space" />}></Route>
            <Route exact path="/science" element={<Home category='science' key="science" />}></Route>
            <Route exact path="/entertainment" element={<Home category='entertainment' key="entertainment" />}></Route>
            <Route exact path="/blog" element={<Blog />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/signup" element={<SignUP />}></Route>
            <Route exact path="/addblog" element={<AddBlog />}></Route>
            <Route exact path="/profile" element={<Profile/>}></Route>
            <Route exact path="/favourite" element={<Favourite/>}></Route>
            <Route exact path="/myblog" element={<MyBlog/>}></Route>
            <Route exact path="/edit" element={<Editblog/>}></Route>
            <Route exact path="/open" element={<OpenBlog/>}></Route>
          </Routes>
        </Router>
      </BlogState>
    </>
  );
}

export default App;
