import React, {useContext, useEffect} from 'react';
import Loading from './Loading';
import Error from './Error';
import {Table} from 'react-bootstrap';
import DataContext from '../context/data/dataContext';

const Attendance = () => {

  const dataContext = useContext(DataContext);
  const { attendance, attendance_loading, attendance_error, getAttendance } = dataContext;

  useEffect(() => {
    getAttendance();
    //eslint-disable-next-line
  },[]);

  if(attendance_loading){
      return <Loading/>
    }

  else if(attendance_error){
    console.log(attendance_error);
    return <Error />
  }

  return(
    <div className="container" style={{fontSize: '22px'}}>
      <center className="row">
        <div className="col-10 offset-1"><h1>Attendance</h1></div>
        <Table size bordered className="col-10 offset-1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Present/Absent</th>
            </tr>
          </thead>
          <tbody>
            {
              attendance.map((data) => {
                if(data.value){
                  return(<tr key={data._id} style={{backgroundColor:'rgba(0,255,0,0.2)'}}><td>{data.date}</td><td>P</td></tr>);
                }
                  return(<tr key={data._id} style={{backgroundColor:'rgba(255,0,0,0.2)'}}><td>{data.date}</td><td>A</td></tr>);
                })
            }
          </tbody>
        </Table>
      </center>
    </div>
  );
};

export default Attendance;
