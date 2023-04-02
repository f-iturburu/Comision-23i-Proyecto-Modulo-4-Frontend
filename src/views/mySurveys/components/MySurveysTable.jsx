import React, { useEffect, useState } from "react";
import { Table, Switch, Button } from "antd";
import Swal from "sweetalert2";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import todayDate from "../../../helpers/todayDate";
import compareDates from "../../../helpers/compareDates";
import axios from "axios";
import Loader from "../../../components/loader/loader";
import { Image } from "react-bootstrap";

const SurveysTable = ({ URL, token }) => {
  const [loading, setLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetchApi, setFetchApi] = useState(true);

  useEffect(() => {
    if (fetchApi) {
      fetchMySurveys().then(() => {
        setDeleteLoading(false);
        setFetchApi(false);
        setViewLoading(false);
      });
    }
  }, [fetchApi]);

  const fetchMySurveys = async () => {
    try {
      const res = await axios.get(`${URL}/surveys`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token.token,
        },
      });

      if (res.status == 200) {
        const data = res.data;
        setData(data);
      }
    } catch (error) {
      setFetchError(true);
    }
  };

  const handleSwitchChange = async (checked, record) => {
    setLoading(true);
    const patchObj = {
      published: checked,
    };
    try {
      const res = await axios.patch(
        `${URL}/survey/${record._id}/published`,
        patchObj,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token.token,
          },
        }
      );

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
        "",
        "Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.",
        "error"
      );
    }
  };

  const handleDeleteSurvey = (record) => {
    Swal.fire({
      title: "Estas seguro que deses eliminar esta encuesta?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeleteLoading(true);
        try {
          const res = await axios.delete(`${URL}/survey/${record._id}`, {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token.token,
            },
          });

          if (res.status == 200) {
            setFetchApi(true);
          }
        } catch (error) {
          setDeleteLoading(false);
          Swal.fire(
            "",
            "Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    {
      title: "Nombre de la encuesta",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(record) {
        return <Link to={`/survey/${record._id}`}>{record.name}</Link>;
      },
    },
    {
      title: "Categorias",
      dataIndex: "categories",
      key: "categories",
      sorter: (a, b) => a.categories[0].localeCompare(b.categories[0]),
    },
    {
      title: "Fecha de creacion",
      dataIndex: "createDate",
      key: "createDate",
      sorter: (a, b) => a.createDate?.localeCompare(b?.createDate),
      render: (record) => {
        return record.slice(0, 10);
      },
    },
    {
      title: "Fecha de finalización",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => a.endDate?.localeCompare(b?.endDate),
      render: (record) => {
        if (record) {
          return record.slice(0, 10);
        } else {
          return "No fue asignada";
        }
      },
    },
    {
      title: "Estado de publicación",
      key: "published",
      sorter: (a, b) =>
        a.published.toString().localeCompare(b.published.toString()),
      render: (record) => {
        if (record.endDate) {
          if (compareDates(record.endDate.slice(0, 10), todayDate())) {
            return <Switch checked={false} disabled={true} />;
          } else {
            return (
              <Switch
                checked={record.published}
                onChange={(checked) => handleSwitchChange(checked, record)}
                loading={loading}
              />
            );
          }
        } else {
          return (
            <Switch
              checked={record.published}
              onChange={(checked) => handleSwitchChange(checked, record)}
              loading={loading}
            />
          );
        }
      },
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      onFilter: (value, record) => record.published === value,
    },
    {
      title: "Eliminar",
      render: (record) => {
        return (
          <div className="d-flex justify-content-center">
            <Button
              type="primary"
              danger
              loading={deleteLoading}
              onClick={() => handleDeleteSurvey(record)}
            >
              Eliminar <i class="bi bi-trash3 ms-2"></i>
            </Button>
          </div>
        );
      },
    },
    {
      title: "Informacion detallada",
      key: `name`,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(record) {
        return (
          <div className="d-flex justify-content-center">
            <Link to={`/survey/details/${record._id}`}>
              <Button type="primary">
                {" "}
                Detalles <i className="bi bi-graph-down ms-2"></i>
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const RenderHandler = () => {
    if (viewLoading) {
      return <Loader />;
    } else if (fetchError) {
      return (
        <div className="text-center">
          <Image fluid={true} src="/src/assets/img/Error message/error1.png" />
        </div>
      );
    } else if (data.length == 0) {
      return (
        <div className="text-center">
          <Image
            fluid={true}
            src="/src/assets/img/No survey/Vaya, parece que no has creado una encuesta todavía (5).png"
          />
        </div>
      );
    } else {
      return (
        <div className='containerTable'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        ></Table>      
        </div>
      );
    }
  };
  return (
    <div style={{ minHeight: "40vh" }}>
      <RenderHandler />
    </div>
  );
};

export default SurveysTable;
