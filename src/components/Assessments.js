import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import DataContext from "../context/data/dataContext";

const Assessments = () => {
  const dataContext = useContext(DataContext);
  const {
    assessments,
    assessments_loading,
    assessments_error,
    getAssessments
  } = dataContext;

  useEffect(() => {
    getAssessments();
    //eslint-disable-next-line
  }, []);

  if (assessments_loading) {
    return <Loading />;
  } else if (assessments_error) {
    console.log(assessments_error);
    return <Error />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="m-accent">Assessments</h1>
        </div>
      </div>
      <div className="row m-2">
        {assessments.map(val => (
          <div
            className="col-12 rounded shadow m-neutral-bg m-1 p-2"
            key={val._id}
          >
            <p className="font-big float-left text-white">
              <b className="text-dark">Topic:</b>
              {val.topic}
            </p>
            <p className="badge badge-info float-right p-3">
              {val.assessmentType[0].toUpperCase() +
                val.assessmentType.slice(1)}
            </p>
            <br />
            <br />
            <p className="text-center text-white font-big m-overflow">
              <b className="text-dark">Link:</b>
              <a className="text-white" href={val.link}>
                {val.link}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assessments;
