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

export default (state, action) => {
  switch(action.type) {
    case GET_EVENTS :
      return {
        ...state,
        events : action.payload,
        events_loading : false,
        events_error : null
      };

    case EVENTS_FAIL :
      return {
        ...state,
        events_error : action.payload,
        events_loading : false
      }

    case GET_MY_PROFILE :
      localStorage.setItem('smente', action.payload.mentees[0]);
      return {
        ...state,
        myprofile : action.payload,
        myprofile_loading : false,
        myprofile_error : null
      };

    case MY_PROFILE_FAIL :
      return {
        ...state,
        myprofile_error : action.payload,
        myprofile_loading : false
      }

    case GET_PROFILE :
      return {
        ...state,
        profile : action.payload,
        profile_loading : false,
        profile_error : null
      };

    case PROFILE_FAIL :
      return {
        ...state,
        profile_error : action.payload,
        profile_loading : false
      }

    case GET_TASKS :
      return {
        ...state,
        tasks : action.payload,
        tasks_loading : false,
        tasks_error : null
      }

    case TASKS_FAIL :
      return {
        ...state,
        tasks_error : action.payload,
        tasks_loading : false
      }

    case GET_SCORE :
      return {
        ...state,
        score : action.payload,
        score_loading : false,
        score_error : null
      }

    case SCORE_FAIL :
      return {
        ...state,
        score_error : action.payload,
        score_loading : false
      }

    case GET_ASSESSMENTS :
      return {
        ...state,
        assessments : action.payload,
        assessments_loading : false,
        assessments_error : null
      }

    case ASSESSMENTS_FAIL :
      return {
        ...state,
        assessments_error : action.payload,
        assessments_loading : false
      }

    case GET_ATTENDANCE :
      return {
        ...state,
        attendance : action.payload,
        attendance_loading : false,
        attendance_error : null
      }

    case ATTENDANCE_FAIL :
      return {
        ...state,
        attendance_error : action.payload,
        attendance_loading : false
      }

    case GET_COURSES :
      return {
        ...state,
        courses : action.payload,
        courses_loading : false,
        courses_error : null
      }

    case COURSES_FAIL :
      return {
        ...state,
        courses_error : action.payload,
        courses_loading : false
      }

    case GET_NOTIFICATIONS :
      return {
        ...state,
        notifications : action.payload,
        notifications_loading : false,
        notifications_error : null
      }

    case NOTIFICATINOS_FAIL :
      return {
        ...state,
        notifications_error : action.payload,
        notifications_loading : false
      }

    default : return state;
  }
}
