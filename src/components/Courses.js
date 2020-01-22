import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import DataContext from "../context/data/dataContext";
import { Accordion, Button } from "react-bootstrap";

const Courses = () => {
  const dataContext = useContext(DataContext);
  const { courses, courses_loading, courses_error, getCourses } = dataContext;

  useEffect(() => {
    getCourses();
    //eslint-disable-next-line
  }, []);

  if (courses_loading) {
    return <Loading />;
  } else if (courses_error) {
    console.log(courses_error);
    return <Error />;
  }

  return (
    <div className="container">
      <center>
        <h1 className="m-accent">Courses</h1>
      </center>
      <div>
        <center>
          <h4>Here are some courses recommended for you</h4>
        </center>
        <Accordion className="container">
          {courses.map(item => {
            return (
              <div className="row m-2 shadow" key={item._id}>
                <div className="col-12 m-0 p-0">
                  <Accordion.Toggle
                    as={Button}
                    eventKey={item._id}
                    className="col-12 p-2 font-big m-neutral-bg"
                  >
                    <p className="float-left font-big">{item.title}</p>
                    <p className="badge badge-success float-right p-3">
                      {item.price}
                    </p>
                  </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey={item._id} className="col-12">
                  <div className="row p-2">
                    <div className="col-12">
                      <h5>
                        <b>Description : </b>
                      </h5>
                      <p>{item.desc}</p>
                      <h5>
                        <b>
                          Financial Aid available :{" "}
                          {item.financialaid === "Yes" ? (
                            <span className="text-success">Yes</span>
                          ) : item.financialaid === "No" ? (
                            <span className="text-danger">No</span>
                          ) : (
                            <span className="text-warning">Not Required</span>
                          )}{" "}
                        </b>
                      </h5>
                    </div>
                    <div className="col-8 offset-2 col-md-4 offset-md-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-block m-primary-bg text-white"
                      >
                        Go to Course
                      </a>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default Courses;
