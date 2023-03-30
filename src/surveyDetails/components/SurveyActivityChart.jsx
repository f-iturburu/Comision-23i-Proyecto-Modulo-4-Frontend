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
    const uniqueDates = [[...new Set(answersDates)]]
    uniqueDates.map((i)=> data.push({Fecha: i.toString(), CantidadDeRespuestas: 0}))
 
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < answersDates.length; j++) {
            if (data[i].Fecha == answersDates[j]) {
                data[i].CantidadDeRespuestas ++
            }  
        }  
    }

data.push({ Fecha: "2023-04-1", CantidadDeRespuestas: 5 })

  const config = {
    data,
    padding: "auto",
    xField: "Fecha",
    yField: "CantidadDeRespuestas",
    xAxis: {
      tickCount: 5,
    },
  };

  return <div className="mt-4">
    <h4>Actividad de la encuesta</h4>
    <p className="text-muted">Cantidad de respuestas en funcion del tiempo</p>
      <Line {...config} />
  </div>

};

export default SurveyActivity;
