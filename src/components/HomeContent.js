import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import DataContext from "../context/data/dataContext";
import server from "../config/server";

const HomeContent = () => {
  const dataContext = useContext(DataContext);
  const {
    events,
    events_loading,
    events_error,
    getEvents,
    notifications,
    notifications_loading,
    notifications_error,
    getNotifications
  } = dataContext;

  useEffect(() => {
    getEvents();
    getNotifications();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <center className="row h1 m-2 m-accent">Events</center>
          <div className="row">
            {events_loading ? (
              <Loading />
            ) : events_error ? (
              <Error />
            ) : (
              events.map(item => (
                <div className="card shadow border m-1" key={item._id}>
                  <div className="card-title h3 p-2 m-0 m-primary-bg text-light">
                    {item.title} :
                  </div>
                  <img
                    className="card-img-top"
                    src={server + item.id}
                    alt={item.title}
                    width="100%"
                  />
                  <p className="card-text p-2" style={{ textAlign: "justify" }}>
                    {" "}
                    &nbsp; {item.desc}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <center className="row h1 m-2 m-accent">Notifications</center>
          <div className="row">
            {notifications_loading ? (
              <Loading />
            ) : notifications_error ? (
              <Error />
            ) : (
              notifications.map(item => (
                <div
                  className="card col-12 m-2 shadow-sm border"
                  key={item._id}
                >
                  <h1 className="p-2 card-title">{item.title}</h1>
                  <p className="p-2 card-text"> &nbsp; {item.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <p />
    </div>
  );
};

export default HomeContent;
