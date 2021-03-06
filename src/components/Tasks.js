import React, { useState, useContext, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button, Accordion } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";
import server from "../config/server";
import DataContext from "../context/data/dataContext";

const Tasks = () => {
  //context data
  const dataContext = useContext(DataContext);
  const { tasks, tasks_loading, tasks_error, getTasks } = dataContext;

  //get all tasks for this student
  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  const [add, setAdd] = useState({
    addTopic: "",
    addTasktype: "Daily",
    addDate: "",
    addTime: ""
  });
  const [deleteId, setDeleteId] = useState(1);
  const [update, setUpdate] = useState({
    updateId: 1,
    updateDate: "",
    updateTime: ""
  });

  const { addTopic, addTasktype, addDate, addTime } = add;
  const { updateId, updateDate, updateTime } = update;

  const [isAddModalOpen, toggleAddModal] = useState(false);
  const [isUpdateModalOpen, toggleUpdateModal] = useState(false);
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);

  const onChangeAdd = e => setAdd({ ...add, [e.target.name]: e.target.value });
  const onChangeUpdate = e =>
    setUpdate({ ...update, [e.target.name]: e.target.value });
  const onChangeDelete = e => setDeleteId(e.target.value);

  const addTask = event => {
    const headers = {
      "Content-Type": "application/json",
      "X-Access-Token": localStorage.getItem("stoken")
    };
    event.preventDefault();
    let task = {};
    task.topic = addTopic;
    task.taskType = addTasktype;
    task.date = addDate;
    task.time = addTime;
    task.rollNo = localStorage.getItem("smente");
    toggleAddModal(!isAddModalOpen);
    axios.post(server + "/addtask", task, { headers }).then(() => {
      getTasks();
      setAdd({
        addTopic: "",
        addTasktype: "Daily",
        addDate: "",
        addTime: ""
      });
    });
  };

  const UpdateTask = event => {
    const headers = {
      "Content-Type": "application/json",
      "X-Access-Token": localStorage.getItem("stoken")
    };
    event.preventDefault();
    const id = tasks[updateId - 1]._id;
    let task = tasks[updateId - 1];
    task.date = updateDate;
    task.time = updateTime;
    toggleUpdateModal(!isUpdateModalOpen);
    axios
      .post(
        server +
          "/modifytask?rollNo=" +
          localStorage.getItem("smente") +
          "&taskId=" +
          id,
        task,
        { headers }
      )
      .then(() => {
        getTasks();
        setUpdate({
          updateId: 1,
          updateDate: "",
          updateTime: ""
        });
      });
  };

  const DeleteTask = event => {
    const headers = {
      "Content-Type": "application/json",
      "X-Access-Token": localStorage.getItem("stoken")
    };
    event.preventDefault();
    const id = tasks[deleteId - 1]._id;
    toggleDeleteModal(!isDeleteModalOpen);
    axios.get(server + "/removetask?taskId=" + id, { headers }).then(() => {
      getTasks();
      setDeleteId(1);
    });
  };

  //function for not post attachment
  const postAttachement = (task, i) => {
    return (
      <div className="row shadow m-2" key={task._id}>
        <div className="col-12 p-0 m-0">
          <Accordion.Toggle
            as={Button}
            className="col-12 m-negative-bg"
            eventKey={task._id}
          >
            <p className="text-white float-left font-big">
              <b className="text-dark">Topic : </b>
              {task.topic}
            </p>
            <p className="float-right badge badge-light p-3">
              {task.taskType[0].toUpperCase() + task.taskType.slice(1)}
            </p>
            <br />
            <br />
            <p className="text-white float-left font-big">
              <b className="text-dark">Uploaded at : </b>
              {task.uploadTime}
            </p>

            <p className="text-white float-right font-big">
              <b className="text-dark">Deadline : </b>
              {task.deadline}
            </p>
          </Accordion.Toggle>
        </div>
      </div>
    );
  };

  //function for showing the attachment that already submited
  const showAttachement = (task, i) => {
    return (
      <div className="row shadow m-2" key={task._id}>
        <div className="col-12 p-0 m-0">
          <Accordion.Toggle
            as={Button}
            className="col-12 m-positive-bg"
            eventKey={task._id}
          >
            <p className="text-white float-left font-big">
              <b className="text-dark">{i + 1} Topic : </b>
              {task.topic}
            </p>
            <p className="float-right badge badge-light p-3">
              {task.taskType[0].toUpperCase() + task.taskType.slice(1)}
            </p>
            <br />
            <br />
            <p className="text-white float-left font-big">
              <b className="text-dark">Uploaded at : </b>
              {task.uploadTime}
            </p>
            <p className="text-white float-right font-big">
              <b className="text-dark">Deadline : </b>
              {task.deadline}
            </p>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey={task._id} className="col-12 p-2 m-2">
          <div className="col-12">
            <div className="row form-group p-2">
              <div className="col-12 col-md-2">
                <b className="font-big text-dark">Attachment: </b>
              </div>
              <div className="col-12 col-md-10">
                <div className="row rounded shadow-sm">
                  {" "}
                  <a
                    href={server + task.attachment.url}
                    rel="noopener noreferrer"
                    className="font-big col-10 col-md-11 m-overflow"
                    target="_blank"
                  >
                    {task.attachment.url.slice(7)}
                  </a>
                </div>
              </div>
            </div>
            <div className="row form-group p-2">
              <div className="col-12 col-md-2">
                <b className="font-big text-dark">Feedback: </b>
              </div>
              <div className="font-big col-12 col-md-10">
                {task.attachment.feedback}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-md-3">
                <b className="text-dark font-big">Submitted At: </b>
              </div>
              <div className="col-12 col-md-9 font-big">
                {task.attachment.timeStamp}
              </div>
            </div>
            <form className="row form-group ml-1" onSubmit={handleGrade}>
              <input type="hidden" name="taskId" value={task._id} />
              <input
                type="number"
                min="0"
                max="100"
                name="Score"
                className="col-10 col-md-5 form-control"
                defaultValue={0}
              />
              <button
                type="submit"
                name="submit"
                className="btn col-md-3 mt-2 mt-md-0 col-10 btn-primary ml-md-4 pl-5 pr-5"
              >
                Grade
              </button>
              <div className="text-white font-big badge badge-warning col-10 col-md-3 mt-2 mt-md-0 ml-md-2 p-2">
                {task.attachment.Score !== null
                  ? task.attachment.Score + "/100"
                  : "Not Graded"}
              </div>
            </form>
          </div>
        </Accordion.Collapse>
      </div>
    );
  };

  //function that can handle the unsubmit process
  const handleGrade = event => {
    const headers = {
      "Content-Type": "application/json",
      "X-Access-Token": localStorage.getItem("stoken")
    };
    event.preventDefault();
    let body = event.target.children;
    let data = {};
    for (let i = 0; i < body.length; i++) {
      if (body[i].value && body[i].name !== "") {
        data[body[i].name] = body[i].value;
      }
    }
    axios
      .post(
        server + "/gradetask?rollNo=" + localStorage.getItem("smente"),
        data,
        { headers }
      )
      .then(res => console.log(res))
      .then(() =>
        setTimeout(() => {
          getTasks();
        }, 3000)
      );
  };

  //will loading during initial
  if (tasks_loading) {
    return <Loading />;
  }

  //any error can be handle by this
  else if (tasks_error) {
    return <Error />;
  }

  //this is will call either show attachment or post attachment functions
  return (
    <>
      <Accordion className="container">
        <div className="row ml-1 mr-1">
          <div className="col-12 d-none d-md-block">
            <h3 className="float-left m-accent">Tasks</h3>
            <button
              onClick={() => toggleDeleteModal(!isDeleteModalOpen)}
              className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold"
              type="button"
            >
              Delete
            </button>
            <button
              onClick={() => toggleUpdateModal(!isUpdateModalOpen)}
              className="btn btn-success float-right bold pl-3 pr-3 mr-1 font-weight-bold"
              type="button"
            >
              Update
            </button>
            <button
              onClick={() => toggleAddModal(!isAddModalOpen)}
              className="btn btn-primary float-right bold pl-4 pr-4 mr-1 font-weight-bold"
              type="button"
            >
              Add
            </button>
          </div>
        </div>
        <div className="row d-md-none">
          <center className="col-12">
            <h3 className="m-accent">Tasks</h3>
          </center>
          <center className="col-12">
            <button
              onClick={() => toggleAddModal(!isAddModalOpen)}
              className="btn btn-primary bold pl-4 pr-4 mr-1 font-weight-bold"
              type="button"
            >
              Add
            </button>
            <button
              onClick={() => toggleUpdateModal(!isUpdateModalOpen)}
              className="btn btn-success bold pl-3 pr-3 mr-1 font-weight-bold"
              type="button"
            >
              Update
            </button>
            <button
              onClick={() => toggleDeleteModal(!isDeleteModalOpen)}
              className="btn btn-danger bold pl-3 pr-3 font-weight-bold"
              type="button"
            >
              Delete
            </button>
          </center>
        </div>
        {tasks.map((task, i) =>
          !task.attachment ? postAttachement(task, i) : showAttachement(task, i)
        )}
      </Accordion>

      <Modal
        isOpen={isAddModalOpen}
        toggle={() => toggleAddModal(!isAddModalOpen)}
      >
        <ModalHeader toggle={() => toggleAddModal(!isAddModalOpen)}>
          Add Task
        </ModalHeader>
        <ModalBody>
          <form onSubmit={addTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTopic">
                Topic
              </label>
              <div className="col-12">
                <input
                  type="text"
                  onChange={onChangeAdd}
                  className="form-control"
                  id="addTopic"
                  name="addTopic"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTaskType">
                Task Type
              </label>
              <div className="col-12">
                <select
                  onChange={onChangeAdd}
                  className="form-control"
                  id="addTasktype"
                  name="addTasktype"
                >
                  <option value="Daily">Daily</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addDate">
                Deadline Date
              </label>
              <div className="col-12">
                <input
                  type="date"
                  onChange={onChangeAdd}
                  className="form-control"
                  id="addDate"
                  name="addDate"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="addTime">
                Deadline Time
              </label>
              <div className="col-12">
                <input
                  type="time"
                  onChange={onChangeAdd}
                  className="form-control"
                  id="addTime"
                  name="addTime"
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => toggleAddModal(!isAddModalOpen)}
            >
              Cancel
            </button>{" "}
            &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">
              Add
            </button>
          </form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        toggle={() => toggleUpdateModal(!isUpdateModalOpen)}
      >
        <ModalHeader toggle={() => toggleUpdateModal(!isUpdateModalOpen)}>
          Update Task
        </ModalHeader>
        <ModalBody>
          <form onSubmit={UpdateTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updateId">
                Id Number
              </label>
              <div className="col-12">
                <input
                  type="number"
                  min="1"
                  max={tasks.length}
                  onChange={onChangeUpdate}
                  className="form-control"
                  id="updateId"
                  value={updateId}
                  name="updateId"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updateDate">
                Deadline Date
              </label>
              <div className="col-12">
                <input
                  type="date"
                  onChange={onChangeUpdate}
                  className="form-control"
                  id="updateDate"
                  name="updateDate"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="updateTime">
                Deadline Time
              </label>
              <div className="col-12">
                <input
                  type="time"
                  onChange={onChangeUpdate}
                  className="form-control"
                  id="updateTime"
                  name="updateTime"
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => toggleUpdateModal(!isUpdateModalOpen)}
            >
              Cancel
            </button>{" "}
            &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">
              Update
            </button>
          </form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        toggle={() => toggleDeleteModal(!isDeleteModalOpen)}
      >
        <ModalHeader toggle={() => toggleDeleteModal(!isDeleteModalOpen)}>
          Delete Task
        </ModalHeader>
        <ModalBody>
          <form onSubmit={DeleteTask}>
            <div className="form-group row">
              <label className="form-label col-12" htmlFor="deleteId">
                Id Number
              </label>
              <div className="col-12">
                <input
                  type="number"
                  min="1"
                  max={tasks.length}
                  onChange={onChangeDelete}
                  className="form-control"
                  id="deleteId"
                  value={deleteId}
                  name="deleteId"
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => toggleDeleteModal(!isDeleteModalOpen)}
            >
              Cancel
            </button>{" "}
            &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">
              Delete
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Tasks;
