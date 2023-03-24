import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
import css from './surveyCard.css' ;

function SurveyCard({surveyTitle,surveyCategory, id,  surveyEndDate}) {
  return (
    <div className='w-50 m-auto'>
<Link className="mb-2 text-decoration-none text-dark" to={`/survey/${id}`}>
    <Card className='mb-2 card' >
      <Card.Body className='card-body'>
        <Card.Title className='cardTitle'>{surveyTitle}</Card.Title>
        <div className='mb-1'><span className='categoryPill p-1 rounded-2'>{surveyCategory}</span></div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div className='d-flex'>
        <Card.Subtitle className="mb-2 text-muted">{surveyEndDate ? surveyEndDate.slice(0,10) : ''}</Card.Subtitle>         
        </div>
      </Card.Body>
    </Card>
    </Link>
  </div>
  );
}

export default SurveyCard;