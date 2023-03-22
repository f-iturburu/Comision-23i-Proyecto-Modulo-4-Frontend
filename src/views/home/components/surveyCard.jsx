import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";

function SurveyCard({surveyTitle,surveyCategory, id,  surveyEndDate}) {
  return (
    <div className='w-50 m-auto'>
      

    <Card className='mb-2' >
      <Card.Body>
        <Card.Title>{surveyTitle}</Card.Title>
        <Badge pill bg="primary">{surveyCategory}</Badge>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div className='d-flex'>
        <Card.Subtitle className="mb-2 text-muted">{surveyEndDate ? surveyEndDate.slice(0,10) : ''}</Card.Subtitle>
         <Link className="mb-2 text-muted ms-auto" to={`/survey/${id}`}>
                   Responder
                </Link>
            
        </div>
      </Card.Body>
    </Card>

    
  </div>
  );
}

export default SurveyCard;