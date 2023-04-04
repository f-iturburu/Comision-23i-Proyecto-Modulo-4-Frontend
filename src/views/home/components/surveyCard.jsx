import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
import { ClockCircleOutlined } from '@ant-design/icons';
import TooltipQuestionmark from '../../../layouts/tooltip';
import css from './surveyCard.css' ;


function SurveyCard({surveyTitle,surveyCategory, id, surveyEndDate,surveyDescription,createdAt}) {
  return (
    <div className='m-auto'>
<Link className="mb-2 text-decoration-none text-dark" to={`/survey/${id}`}>
    <Card className='mb-2 card' >
      <Card.Body>
        <div className='d-md-flex justify-content-end'>
        <Card.Title className='fw-bold'>{surveyTitle}</Card.Title>
          <div className='ms-auto d-flex'>
        <ClockCircleOutlined className='pt-1 me-1' />
        <p>{createdAt}</p>
          </div>
        </div>
        <div className='mb-1'><span className='categoryPill p-1 rounded-2'>{surveyCategory}</span></div>
        <Card.Text className='fw-normal'>
          {surveyDescription}
        </Card.Text>
        <div className='d-flex'>
        <Card.Subtitle className="mb-2 text-muted">{surveyEndDate ? <div>
          {surveyEndDate.slice(0,10)} <TooltipQuestionmark message={'Fecha de finalización de encuesta'} item={<i className="bi bi-hourglass-split"></i>}/> 
        </div>
        : ''}</Card.Subtitle>         
        </div>
      </Card.Body>
    </Card>
</Link>
  </div>
  );
}

export default SurveyCard;