import React, { useEffect, useState } from 'react';
import { Table, Switch, Button } from 'antd';
import Swal from 'sweetalert2'
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from 'axios';

const SurveysTable = ({URL, token}) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [data, setData] = useState([]);
  const [fetchApi, setFetchApi] = useState(true)
  console.log(data);

  useEffect(()=>{
    if (fetchApi) {
      fetchMySurveys().then(()=>{
        setDeleteLoading(false);
        setFetchApi(false)
      })   
      
    }
},[fetchApi])

  const fetchMySurveys = async ()=>{
    try {
      const res = await axios.get(`${URL}/surveys`,{
        headers:{
          "Content-Type": "application/json",
          'auth-token': token.token
        }
      })

      if (res.status == 200) {
        const data = res.data; 
        setData(data) 
      }
    } catch (error) {
      console.log(error);
    }
 }

  const handleSwitchChange = async (checked, record) => {
    setLoading(true);
    const patchObj = {
      'published': checked
    }
    try {
      const res = await axios.patch(`${URL}/survey/${record._id}/published`,patchObj,{
        headers:{
          'Content-Type': 'application/json',
          'auth-token': token.token
        }
      })

      if (res.status == 200) {
        setLoading(false);
        setData(
          data.map((prevArray) => {
            if (prevArray._id === record._id) {
              return { ...prevArray, published: checked };
            }
            return prevArray;
          })
        );

      }
    } catch (error) {
      setLoading(false);
      Swal.fire(
          '',
          'Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.',
          'error'
        )
    }
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
        try {
          const res = await axios.delete(`${URL}/survey/${record._id}`,{
            headers:{
              'Content-Type': 'application/json',
              'auth-token': token.token
            }
          })

          if (res.status == 200) {
            setFetchApi(true)
          }
        } catch (error) {
          setDeleteLoading(false);
              Swal.fire(
                  '',
                  'Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.',
                  'error'
                )
        }
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
      title: 'Fecha de subida',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: (a, b) => a.createDate?.localeCompare(b?.createDate),
      render: (record) =>{
              return record.slice(0,10)      
      }
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
        title: 'Eliminar',
        render: (record) =>{
           return  <div className='d-flex justify-content-center'>
            <Button type="primary" danger icon={<DeleteOutlined />} loading={deleteLoading} onClick={()=> handleDeleteSurvey(record)}>
                Eliminar
            </Button>
            </div>
            
  
        } 
      },
      {
        title: 'Informacion detallada',
        key: `name`,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(record){
          return  <div className='d-flex justify-content-center'>
            <Link  to={`/survey/details/${record._id}`}>
            <i class="bi bi-graph-down"></i>
        </Link>
          </div>
        
        }
      },

  ];


  return (
    <div className='containerTable'>
    <Table columns={columns}  dataSource={data} pagination={{pageSize: 10}}>
    </Table>
    </div>
  );
};

export default SurveysTable;
