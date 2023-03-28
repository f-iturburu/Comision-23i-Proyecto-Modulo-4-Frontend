import { useEffect } from "react"

const  QuestionComponentSurveyDetails = ({question}) => {
    return <div>
        <h3>{question.question}</h3>
        <h5>{question.type}</h5>
    </div> 
}

export default QuestionComponentSurveyDetails