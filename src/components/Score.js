import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { Table } from "react-bootstrap";
import DataContext from "../context/data/dataContext";

const Score = () => {
  //context data
  const dataContext = useContext(DataContext);
  const { score, score_loading, score_error, getScore } = dataContext;

  //get scores
  useEffect(() => {
    getScore();
    //eslint-disable-next-line
  }, []);

  //loading score
  if (score_loading) {
    return <Loading />;
  }

  //handling error
  else if (score_error) {
    console.log(score_error);
    return <Error />;
  }

  //this will show scores
  return (
    <div className="container">
      <center className="row m-2">
        <div className="col-12">
          <h1 className="m-accent">Scores</h1>
        </div>
        <Table size bordered className="col-12 text-center">
          <thead>
            <tr className="font-big m-primary-bg m-text-light">
              <td>Date</td>
              <td>Topic</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody>
            {score.data.map(data =>
              data.Score === null ? null : data.Score <= 50 ? (
                <tr className="m-negative-bg-50" key={data.taskId}>
                  <td>{data.uploadTime}</td>
                  <td>{data.taskTopic}</td>
                  <td>{data.Score}</td>
                </tr>
              ) : (
                <tr className="m-positive-bg-50" key={data.taskId}>
                  <td>{data.uploadTime}</td>
                  <td>{data.taskTopic}</td>
                  <td>{data.Score}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </center>
    </div>
  );
};

export default Score;
