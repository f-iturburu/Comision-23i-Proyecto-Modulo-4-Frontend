import React, { useEffect, useState } from 'react';
import { Table, Switch, Button } from 'antd';
import Swal from 'sweetalert2'
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const SurveysTable = ({fetchApi, setFetchApi}) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [data, setData] = useState([]);
  

  useEffect(()=>{
    if(fetchApi){
        fetchMySurveys().then(()=>{
          setDeleteLoading(false);
          setFetchApi(false)
        })
    }
},[fetchApi])

  const fetchMySurveys = async ()=>{
    await fetch('https://comision-23i-proyecto-modulo-4-backend.onrender.com/surveys',{
        method:'GET' ,
        headers: {
          "Content-Type": "application/json",
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEzZjZiNmNjZDAyMWJlNmM3YWNjZjAiLCJ1c2VyUm9sZSI6MCwidXNlckVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc5MTc2MjQ3fQ.AR7PXqETqCZ44DYMcw0GBarpYmDd9RS09u8YlIc9oeY'
        }
    })
    .then(res => res.json())
    .then(body => {
      setData(body) 
    })
  }

  const handleSwitchChange = (checked, record) => {
    setLoading(true);
        updateData(record._id, checked)
        .then(res => res.json()).then(() =>{
          setLoading(false);
          setData(
            data.map((prevArray) => {
              if (prevArray._id === record._id) {
                return { ...prevArray, published: checked };
              }
              return prevArray;
            })
          );
        }).catch((error)=>{
        setLoading(false);
        Swal.fire(
            '',
            'Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.',
            'error'
          )
      })
  };

  const updateData = (id, published) => {
    return fetch(`https://comision-23i-proyecto-modulo-4-backend.onrender.com/survey/${id}/published`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEzZjZiNmNjZDAyMWJlNmM3YWNjZjAiLCJ1c2VyUm9sZSI6MCwidXNlckVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc5MTc2MjQ3fQ.AR7PXqETqCZ44DYMcw0GBarpYmDd9RS09u8YlIc9oeY'
      },
      body: JSON.stringify({ published: published }),
    });
  };

  const handleDeleteSurvey =(record)=>{
    Swal.fire({
      title: 'Estas seguro que deses eliminar esta encuesta?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        setDeleteLoading(true)
         await deleteSurvey(record._id)
        .then(res => res.json()).then(() =>{
            setFetchApi(true)
          }).catch((error)=>{
              setDeleteLoading(false);
              Swal.fire(
                  '',
                  'Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.',
                  'error'
                )
          })
      }
        
  })
  }
  
  const deleteSurvey = (id)=>{
    return fetch (`https://comision-23i-proyecto-modulo-4-backend.onrender.com/survey/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEzZjZiNmNjZDAyMWJlNmM3YWNjZjAiLCJ1c2VyUm9sZSI6MCwidXNlckVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc5MTk5MTI1fQ.QhHQXwFRW92K1tKhtIygagsBACOEbb_MEEPNxRLO0mY'
        }
    })
  }

  const columns = [
    {
      title: 'Nombre de la encuesta',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(record){
        return  <Link to={`/survey/${record._id}`}>
        {record.name}
        </Link>
      }
    },
    {
      title: 'Categorias',
      dataIndex: 'categories',
      key: 'categories',
      sorter: (a, b) => a.categories[0].localeCompare(b.categories[0]),
    },
    {
        title: 'Fecha de finalización',
        dataIndex: 'endDate',
        key: 'endDate',
        sorter: (a, b) => a.endDate?.localeCompare(b?.endDate),
        render: (record) =>{
              if(record){
                return record.slice(0,10)
              }else{
                return "No fue asignada"
              }
        }
      },
      {
        title: 'Estado de publicación',
        key: 'published',
        sorter: (a, b) => a.published.toString().localeCompare(b.published.toString()),
        render: (record) =>{
           return  (
              <Switch
                checked={record.published}
                onChange={(checked) =>handleSwitchChange(checked, record)}
                loading={loading }
              />
            )
  
        } 
        ,
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
          value: false,
        },
      ],
      onFilter: (value, record) => record.published === value,
      },
      {
        title: 'Acciones',
        render: (record) =>{
           return  (
            <Button type="primary" danger icon={<DeleteOutlined />} loading={deleteLoading} onClick={()=> handleDeleteSurvey(record)}>
                Eliminar
            </Button>
            )
  
        } 
      },

  ];


  return (
    <Table columns={columns}  dataSource={data} pagination={{pageSize: 10}}>
    </Table>
  );
};

export default SurveysTable;
