import React, {useContext, useEffect} from 'react';
import Loading from './Loading';
import DataContext from '../context/data/dataContext';

const Assessments = () => {

  const dataContext = useContext(DataContext);
  const { assessments, assessments_loading, assessments_error, getAssessments } = dataContext;

  useEffect(() => {
    getAssessments();
    //eslint-disable-next-line
  },[]);

  if(assessments_loading){
      return <Loading/>
    }

  else if(assessments_error){
    console.log(assessments_error);
    return <h1>Something goes wrong</h1>
  }

  return(
    <div className="container" style={{fontSize: '22px'}}>
      <div className="row">
        <div className="col-12 text-center">
          <h1>Assessments</h1>
        </div>
      </div>
      <div className="row m-1">
        {
          assessments.map(val=>
           <div className="col-12" key={val._id} style={{backgroundColor: '#d2d3d4' ,border:'1px solid blue',padding :'10px', borderRadius : '10px', margin : '5px'}}>
             <p style={{float:'left'}}><b style={{padding:'2px', fontSize:'20px', textShadow:'1px 1px gray'}}>Topic:</b>{val.topic}</p>
             <p style={{float:'right', padding:'10px 20px', fontSize:'17px', borderRadius : '5px'}} className="badge badge-info">{val.assessmentType[0].toUpperCase() + val.assessmentType.slice(1)}</p>
             <p  style={{clear:'both'}}/>
             <p className="text-center"><b>Link:</b><a style={{wordWrap:'break-word'}} href={val.link}>{val.link}</a></p>
           </div>
          )
        }
      </div>
    </div>
  );
};

export default Assessments;
