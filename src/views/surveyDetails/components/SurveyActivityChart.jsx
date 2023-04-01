import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";

const SurveyActivity = ({ questions }) => {
    const data = []
    const userAnswers = questions?.surveyQuestions[0].userAnswers
    const answersDates = []
   
    for (let i = 0; i < userAnswers?.length; i++) {
        answersDates.push(userAnswers[i].answerDate?.slice(0,10))
    }

    const uniqueDates = [...new Set(answersDates)]
    uniqueDates.map((i)=> data.push({date: i.toString(), answers: 0}))
 
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < answersDates.length; j++) {
            if (data[i].date == answersDates[j]) {
                data[i].answers ++
            }  
        }
    }

data.push({ date: "2023-04-1", answers: 5 })
data.push({ date: "2023-04-2", answers: 2 })
data.push({ date: "2023-04-3", answers: 4 })
data.push({ date: "2023-04-4", answers: 1 })
data.push({ date: "2023-04-5", answers: 9})


  const config = {
    data,
    padding: "auto",
    xField: "date",
    yField: "answers",
    xAxis: {
      tickCount: 5,
    },
    meta:{
      answers: {alias: 'Cantidad de respuestas'}
    }
  };

  return <div className="mt-4 mb-4">
    <h4>Actividad de la encuesta</h4>
    <p className="text-muted pb-3">Cantidad de respuestas en funcion del tiempo</p>
      <Line {...config} />
  </div>

};

export default SurveyActivity;
