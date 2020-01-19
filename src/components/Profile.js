import React, {useState ,useContext, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';
import server from '../config/server';
import { Card } from "react-bootstrap";
import DataContext from '../context/data/dataContext';

const Profile = () => {

  const dataContext = useContext(DataContext);
  var { profile, profile_loading, profile_error, getProfile, myprofile, myprofile_loading, myprofile_error } = dataContext;

  useEffect(() => {
    getProfile();
    //eslint-disable-next-line
  },[]);

  const [newpwd, setnewpwd] = useState({
    otp : '',
    pwd : ''
  });
  const { otp, pwd } = newpwd;
  const [isnewpwdModalOpen, togglenewpwdModal] = useState(false)

  const onnewpwdChange = e => setnewpwd({
    ...newpwd,
    [e.target.name] : e.target.value
  });

  const onChangepwd = () => {
    let user = {};
    user.username = localStorage.getItem('suser');

    axios.post(server + '/otprequestmentor',user)
    .then(()=>{
      togglenewpwdModal(!isnewpwdModalOpen)
    })
    .catch(err => console.log(err))
  }

  const submitnewpwd = e => {
    e.preventDefault();

    let userpwd = {};
    userpwd.username = localStorage.getItem('suser');
    userpwd.password = pwd;
    userpwd.OTP = otp;

    axios.post(server + '/passwordchange',userpwd)
    .then(()=>{
      togglenewpwdModal(!isnewpwdModalOpen)
    })
    .catch(err => console.log(err))
  }

  const [achievement, setAchievement] = useState('')
  const [deleteId, setDeleteId] = useState(1)

  const [isAddAchievementModalOpen, toggleAddAchievementModal] = useState(false)
  const [isDeleteAchievementModalOpen, toggleDeleteAchievementModal] = useState(false)

  const onChangeAddAchievement = e => setAchievement(e.target.value)
  const onChangeDeleteAchievement = e => setDeleteId(e.target.value)

  const addAchievement = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('stoken')};
    event.preventDefault();
    const achieve = {achievement};
    toggleAddAchievementModal(!isAddAchievementModalOpen);
    profile_loading = true;
    axios.post(server+'/addachievement?rollNo='+localStorage.getItem('smente'), achieve, {headers})
    .then(() => {
      setTimeout(() => {
        getProfile()
      },1000)
      setAchievement('')
    });
  }

  const deleteAchievement = (event) => {
    const headers={"Content-Type": "application/json","X-Access-Token":localStorage.getItem('stoken')};
    event.preventDefault();
    const id = {'id':deleteId-1};
    toggleDeleteAchievementModal(!isDeleteAchievementModalOpen);
    profile_loading = true;
    axios.post(server+'/removeachievement?rollNo='+localStorage.getItem('smente'), id, {headers})
    .then(() => {
      getProfile()
      setDeleteId(1)
    });
  }

  const Achievements = (achievements) => {
    if (achievements === undefined || achievements.length === 0) {
      return null;
    }
    var i=0;
    return (
      <Card className="col-12" >
          <ol>
            {achievements.map(data => {
              return <li key={i++}>{data}</li>;
            })}
          </ol>
      </Card>
    );
  };

  const mentorProfile = () => {

    if(myprofile_loading){
        return <Loading/>
      }

    else if(myprofile_error){
      console.log(myprofile_error);
      return <Error />
    }

    return(
      <div className="container">
        <center>
          <h1>My Profile</h1>
        </center>

        <div className="row justify-content-center" style={{ border: "1px solid black", margin: "10px", padding: "5px" }} >
          <Card className="col-12 col-md-6">
            <center>
              <img
                className="card-img rounded-circle top"
                style={{ width: "250px", height: "300px" }}
                src={server + myprofile.id}
                alt={myprofile.name}
              />
            </center>
          </Card>
          <div className="col-10 offset-2 col-md-5 offset-md-1">
            <div>
              <p></p><br />
              <p><b>Name: </b>{myprofile.name}</p>
              <p><b>RollNo:</b>{myprofile.rollNo}</p>
              <p><b>Batch:</b>{myprofile.batch}</p>
              <p><b>Email:</b>{myprofile.mailId}</p>
              <button className="btn btn-success" onClick={onChangepwd}>Change Password</button>
            </div>
          </div>
        </div>
        <Modal isOpen = {isnewpwdModalOpen} toggle = {() =>togglenewpwdModal(!isnewpwdModalOpen)}>
        <ModalHeader toggle={() => togglenewpwdModal(!isnewpwdModalOpen)}>Change Password</ModalHeader>
        <ModalBody>
          <center className='h5' style={{color:'green'}}>Check Your Email for OTP</center>
            <form onSubmit = {submitnewpwd}>
              <div className="form-group row">
                <label className="form-label col-12">OTP</label>
                <div className="col-12"><input type="text" required onChange={onnewpwdChange} className="form-control" value={otp} name="otp"/></div>
              </div>
              <div className="form-group row">
                <label className="form-label col-12">New password</label>
                <div className="col-12"><input type="text" required onChange={onnewpwdChange} className="form-control" value={pwd} name="pwd"/></div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => togglenewpwdModal(!isnewpwdModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Submit</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  const studentProfile = () => {

    if(profile_loading){
        return <Loading/>
      }

    else if(profile_error){
      console.log(profile_error);
      return <Error />
    }

    return(
      <div className="container">
        <center>
          <h1>{localStorage.getItem('smente')} Profile</h1>
        </center>

        <div className="row justify-content-center" style={{ border: "1px solid black", margin: "10px", padding: "5px" }} >
          <Card className="col-12 col-md-6">
            <center>
              {
                profile && <img
                  className="card-img rounded-circle top"
                  style={{ width: "250px", height: "300px" }}
                  src={server + profile.id}
                  alt={profile.name}
                />
              }
            </center>
          </Card>
          <div className="col-10 offset-2 col-md-5 offset-md-1">
            <div>
              <p></p><br />
              <p><b>Name: </b>{profile.name}</p>
              <p><b>RollNo:</b>{profile.rollNo}</p>
              <p><b>Batch:</b>{profile.batch}</p>
              <p><b>Email:</b>{profile.mailId}</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-cente" style={{ border: "1px solid black", margin: "10px", padding: "5px"}}>
          <Card className="col-12 col-md-6">
            <div>
            <h3>Student Mentor Details</h3>
              <p><b>Name:</b>{profile.studentMentorName}</p>
              <p><b>Email:</b>{profile.studentMentorMail}</p>
              <p><b>Contact No.:</b>{profile.studentMentorPhone}</p>
            </div>
          </Card>
          <Card className="col-12 col-md-6">
            <div>
              <h3>Faculty Mentor Details</h3>
              <p><b>Name:</b>{profile.facultyMentorName}</p>
              <p><b>Email:</b>{profile.facultyMentorMail}</p>
              <p><b>Contact No.:</b>{profile.facultyMentorPhone}</p>
            </div>
          </Card>
        </div>

        <div className="row" style={{ border: "1px solid black", margin: "10px", padding: "5px" }}>

          <div className="col-12 d-none d-md-block">
            <h3 className="float-left">Achievements</h3>
            <button type="button" className="btn btn-danger float-right bold pl-3 pr-3 font-weight-bold" onClick={() => toggleDeleteAchievementModal(!isDeleteAchievementModalOpen)}>Delete</button>
            <button type="button" className="btn btn-success float-right bold pl-4 pr-4 mr-1 font-weight-bold" onClick={() => toggleAddAchievementModal(!isAddAchievementModalOpen)}>Add</button>
          </div>

          <div className="col-12 d-md-none">
            <center className="h3">Achievements</center>
          </div>

          <center className="col-12 md-1 d-md-none">
            <button type="button" className="btn btn-success bold pl-4 pr-4 mr-1 font-weight-bold" onClick={() => toggleAddAchievementModal(!isAddAchievementModalOpen)}>Add</button>
            <button type="button" className="btn btn-danger bold pl-3 pr-3 font-weight-bold" onClick={() => toggleDeleteAchievementModal(!isDeleteAchievementModalOpen)}>Delete</button>
          </center>

          <div className="col-12">
            {Achievements(profile.achievements)}
          </div>

        </div>

        <Modal isOpen = {isAddAchievementModalOpen} toggle = {() =>toggleAddAchievementModal(!isAddAchievementModalOpen)}>
          <ModalHeader toggle={() => toggleAddAchievementModal(!isAddAchievementModalOpen)}>Add Achievement</ModalHeader>
          <ModalBody>
            <form onSubmit = {addAchievement}>
              <div className="form-group row">
                <label className="form-label col-12" htmlFor="achievement">Achievement</label>
                <div className="col-12"><input type="text" onChange={onChangeAddAchievement} className="form-control" id="achievement" value={achievement} name="achievement"/></div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => toggleAddAchievementModal(!isAddAchievementModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Add</button>
            </form>
          </ModalBody>
        </Modal>

        <Modal isOpen = {isDeleteAchievementModalOpen} toggle = {() =>toggleDeleteAchievementModal(!isDeleteAchievementModalOpen)}>
          <ModalHeader toggle={() => toggleDeleteAchievementModal(!isDeleteAchievementModalOpen)}>Delete Achievement</ModalHeader>
          <ModalBody>
            <form onSubmit = {deleteAchievement}>
              <div className="form-group row">
                <label className="form-label col-12" htmlFor="deleteId">Id Number</label>
                <div className="col-12"><input type="number" min="1" max={profile.achievements.length} onChange={onChangeDeleteAchievement} className="form-control" id="deleteId" value={deleteId} name="deleteId"/></div>
              </div>
              <button type="button" className="btn btn-success" onClick={() => toggleDeleteAchievementModal(!isDeleteAchievementModalOpen)}>Cancel</button> &nbsp;
              <button type="submit" className="btn btn-primary pl-4 pr-4">Delete</button>
            </form>
          </ModalBody>
        </Modal>

      </div>
    );
  }

  return(
    <>
      {mentorProfile()}
      {studentProfile()}
    </>
  )

};

export default Profile;
