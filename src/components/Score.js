import React, {useContext, useEffect} from 'react';
import Loading from './Loading';
import {Table} from 'react-bootstrap';
import DataContext from '../context/data/dataContext';

const Score = () => {

  //context data
  const dataContext = useContext(DataContext);
  const { score, score_loading, score_error, getScore } = dataContext;

  //get scores
  useEffect(() => {
    getScore();
    //eslint-disable-next-line
  },[]);

  //loading score
  if(score_loading){
    return <Loading/>
  }

  //handling error
  else if(score_error){
    console.log(score_error);
    return <h1>Something goes wrong</h1>
  }

  //this will show scores
  return(
    <div className="container" style={{fontSize: '22px'}}>
      <center className="row">
        <div className="col-10 offset-1"><h1>Scores</h1></div>
        <Table size bordered className="col-10 offset-1">
          <thead>
            <tr className="bg-primary text-light">
              <td>Date</td>
              <td>Topic</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody>
            {
              score.data.map((data) =>
                data.Score === null ? null : (data.Score <= 50 ?
                  <tr style={{backgroundColor:'rgba(255,0,0,0.2)'}} key={data.taskId}>
                    <td>{data.uploadTime}</td>
                    <td>{data.taskTopic}</td>
                    <td>{data.Score}</td>
                  </tr>:
                  <tr style={{backgroundColor:'rgba(0,255,0,0.2)'}} key={data.taskId}>
                    <td>{data.uploadTime}</td>
                    <td>{data.taskTopic}</td>
                    <td>{data.Score}</td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </center>
    </div>
  );
};

export default Score;
