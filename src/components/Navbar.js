import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import UserContext from '../context/user/UserContext';
import DataContext from '../context/data/dataContext';

const MyNavbar = () => {

  const userContext = useContext(UserContext);
  const {user, logout} = userContext;

  const dataContext = useContext(DataContext);
  const { myprofile, myprofile_loading, myprofile_error,getEvents, getMyProfile, getProfile, getTasks, getScore, getAttendance, getAssessments, getNotifications, getCourses } = dataContext;

  useEffect(()=>{
    getMyProfile().then(
      () => {
        getEvents();
        getNotifications();
        getProfile();
        getTasks();
        getScore();
        getAssessments();
        getAttendance();
        getCourses();
      }
    )
    //eslint-disable-next-line
  },[])

  const onChange = e => {
    localStorage.setItem('smente', e.target.value);
    getProfile();
    getTasks();
    getScore();
    getAttendance();
  }

  return (
    <Navbar bg="primary" expand="sm">
      <Navbar.Toggle
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="mr-auto" >
          <Link className="nav-link" style={{color : 'white'}} to={"/f40-sm/"}>Home</Link>
          <Link className="nav-link" to={"/f40-sm/Profile"} style={{color : 'white'}}>Profile</Link>
          <Link className="nav-link" to={"/f40-sm/Tasks"} style={{color : 'white'}}>Tasks</Link>
          <Link className="nav-link" to={"/f40-sm/Score"} style={{color : 'white'}}>Score</Link>
          <Link className="nav-link" to={"/f40-sm/Assessments"} style={{color : 'white'}}>Assessments</Link>
          <Link className="nav-link" to={"/f40-sm/Attendance"} style={{color : 'white'}}>Attendance</Link>
          <Link className="nav-link" to={"/f40-sm/Courses"} style={{color : 'white'}}> Courses </Link>
        </Nav>
      </Navbar.Collapse>
      {
        !myprofile_loading && myprofile_error === null &&  <select className="form-control col-2" onChange={onChange}>
          {myprofile.mentees.map((m,i) => <option key={i}>{m}</option>)}
        </select>
      }
      <span className="navbar-text mr-2" style={{color : 'white'}}>&nbsp; Hi {user}!</span>
      <Link className="btn btn-outline-danger" to = {"/f40-sm/"} onClick={() => logout()}> Logout </Link>
    </Navbar>
  );
};

export default MyNavbar;
