import React, { useReducer } from 'react';
import axios from 'axios';
import DataContext from './dataContext';
import DataReducer from './dataReducer';
import server from '../../config/server';
import {
  GET_EVENTS,
  EVENTS_FAIL,
  GET_MY_PROFILE,
  MY_PROFILE_FAIL,
  GET_PROFILE,
  PROFILE_FAIL,
  GET_TASKS,
  TASKS_FAIL,
  GET_SCORE,
  SCORE_FAIL,
  GET_ASSESSMENTS,
  ASSESSMENTS_FAIL,
  GET_ATTENDANCE,
  ATTENDANCE_FAIL,
  GET_COURSES,
  COURSES_FAIL,
  GET_NOTIFICATIONS,
  NOTIFICATINOS_FAIL
} from '../types';

const DataState = props => {

  const initialState = {
    events : null ,
    myprofile : null,
    profile : null ,
    tasks : null,
    score : null,
    assessments : null,
    attendance : null,
    courses : null,
    notifications : null,
    events_loading : true,
    myprofile_loading : true,
    profile_loading : true,
    tasks_loading : true,
    score_loading : true,
    assessments_loading : true,
    attendance_loading : true,
    courses_loading : true,
    notifications_loading : true,
    events_error : null,
    myprofile_error : null,
    profile_error : null,
    tasks_error : null,
    score_error : null,
    assessments_error : null,
    attendance_error : null,
    courses_error : null,
    notifications_error : null
  }

  const [state, dispatch] = useReducer(DataReducer, initialState);

  const getEvents = async () => {

    try {
      const res =  await axios.get(server + "/getallevents");

      dispatch({
        type : GET_EVENTS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : EVENTS_FAIL, payload : err});
    }
  }

  const getProfile = () => {

    axios.get(server + '/studentprofiledetails?rollNo=' + localStorage.getItem('mente'))
    .then((res) => dispatch({
      type : GET_PROFILE,
      payload : res.data
    })).catch((err) => dispatch({type : PROFILE_FAIL, payload : err}))

  }

  const getMyProfile = async () => {

    try {
      const res =  await axios.get(server + '/mentorprofiledetails?rollNo=' + localStorage.getItem('user'));
      dispatch({
        type : GET_MY_PROFILE,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : MY_PROFILE_FAIL, payload : err});
    }
  }

  const getTasks = async () => {

    try {
      const res =  await axios.get(server + "/alltasks?rollNo=" + localStorage.getItem('mente'));
      dispatch({
        type : GET_TASKS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : TASKS_FAIL, payload : err});
    }
  }

  const getScore = async () => {

    try {
      const res =  await axios.get(server + '/allscores?rollNo=' + localStorage.getItem('mente'));
      dispatch({
        type : GET_SCORE,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : SCORE_FAIL, payload : err});
    }
  }

  const getAssessments = async () => {

    try {
      const res =  await axios.get(server + "/allassessments");
      dispatch({
        type : GET_ASSESSMENTS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : ASSESSMENTS_FAIL, payload : err});
    }
  }

  const getAttendance = async () => {

    try {
      const res =  await axios.get(server + '/studentattendance?rollNo=' + localStorage.getItem('mente'));
      dispatch({
        type : GET_ATTENDANCE,
        payload : res.data.dates
      });
    }

    catch(err) {
        dispatch({type : ATTENDANCE_FAIL, payload : err});
    }
  }

  const getCourses = async () => {

    try {
      const res =  await axios.get(server + '/getallcourses');
      dispatch({
        type : GET_COURSES,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : COURSES_FAIL, payload : err});
    }
  }

  const getNotifications = async () => {

    try {
      const res =  await axios.get(server + '/getallnotifications');
      dispatch({
        type : GET_NOTIFICATIONS,
        payload : res.data
      });
    }

    catch(err) {
        dispatch({type : NOTIFICATINOS_FAIL, payload : err});
    }
  }

  return(
    <DataContext.Provider
      value = {{
        events : state.events,
        myprofile : state.myprofile,
        profile : state.profile,
        tasks : state.tasks,
        score : state.score,
        assessments : state.assessments,
        attendance : state.attendance,
        courses : state.courses,
        notifications : state.notifications,
        events_loading : state.events_loading,
        profile_loading : state.profile_loading,
        myprofile_loading : state.myprofile_loading,
        tasks_loading : state.tasks_loading,
        score_loading : state.score_loading,
        assessments_loading : state.assessments_loading,
        attendance_loading : state.attendance_loading,
        courses_loading : state.courses_loading,
        notifications_loading : state.notifications_loading,
        events_error : state.events_error,
        myprofile_error : state.myprofile_error,
        profile_error : state.profile_error,
        tasks_error : state.tasks_error,
        score_error : state.score_error,
        assessments_error : state.assessments_error,
        attendance_error : state.attendance_error,
        courses_error : state.courses_error,
        notifications_error : state.notifications_error,
        getEvents,
        getMyProfile,
        getProfile,
        getTasks,
        getScore,
        getAssessments,
        getAttendance,
        getCourses,
        getNotifications
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
