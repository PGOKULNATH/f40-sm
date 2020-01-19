import React, {Fragment, useState} from 'react';
import MyNavbar from './Navbar';
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound.js";
import HomeContent from './HomeContent';
import Profile from './Profile';
import Attendance from './Attendance';
import Tasks from './Tasks';
import Score from './Score';
import Courses from './Courses';
import Assessments from './Assessments';

const Home = () => {

  const [j, setJ] = useState(true);

  const View = (Comp) => {
    setJ(true)
    return( <Comp />)
  }

  const Jumb = () => {
    if(j){
      return(
        <div className="jumbotron d-none d-md-block">
          <center>
            <div className="container">
              <img src="images.jpeg" alt="KCT" style={{float : 'left', width : '150px'}} />
              <img src="ece_logo.png" alt="ECE" style={{float : 'right', width : '150px'}} />
              <h1>Department of Electronics & Communication Engineering</h1>
              <h2>Kumaraguru College of Technology</h2>
            </div>
          </center>
        </div>
      )
    }
    else{
      return(<div />)
    }
  }

  const not = () => {
    setJ(false);
    return(<NotFound />)
  }

  return (
    <Fragment>
      <MyNavbar />
      <Jumb />
      <Switch>
        <Route exact path="/f40-sm/" component={()=>View(HomeContent)} />
        <Route exact path={"/f40-sm/Profile"} component={()=>View(Profile)} />
        <Route exact path={"/f40-sm/Tasks"} component={()=>View(Tasks)} />
        <Route exact path={"/f40-sm/Score"} component={()=>View(Score)} />
        <Route exact path={"/f40-sm/Attendance"} component={()=>View(Attendance)} />
        <Route exact path={"/f40-sm/Assessments"} component={()=>View(Assessments)} />
        <Route exact path={"/f40-sm/Courses"} component={()=>View(Courses)} />
        <Route component={not} />
      </Switch>
    </Fragment>
  );
};

export default Home;
