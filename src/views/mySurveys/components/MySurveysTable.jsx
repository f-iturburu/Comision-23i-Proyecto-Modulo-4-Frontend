import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Switch,
  Button,
  Modal,
  Form,
  Input,
  Dropdown,
  Select,
} from "antd";
import Swal from "sweetalert2";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import todayDate from "../../../helpers/todayDate";
import compareDates from "../../../helpers/compareDates";
import axios from "axios";
import Loader from "../../../components/loader/loader";
import { Image } from "react-bootstrap";
import css from "./mySurveysTable.css";

const SurveysTable = ({ URL, token }) => {
  const [loading, setLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetchApi, setFetchApi] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalValues, setEditModalValues] = useState();
  const editDescriptionErrorRef = useRef(false);
  const editNameErrorRef = useRef(false);
  const [editLoading, setEditLoading] = useState(false);
  const editSurveyDescriptionRef = useRef();
  const editSurveyNameRef = useRef();
  const editSurveyCategoryRef = useRef();

  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    if (fetchApi) {
      fetchMySurveys().then(() => {
        setDeleteLoading(false);
        setFetchApi(false);
        setViewLoading(false);
      });
    }
  }, [fetchApi]);

  const showModal = (survey) => {
    setEditModalValues();
    setIsModalOpen(true);
    setEditModalValues({
      name: survey.name,
      categories: survey.categories,
      description: survey.description,
      surveyId: survey._id,
    });
  };

  const handleOk = async () => {
    const patchObj = {
      name: editSurveyNameRef.current,
      description: editSurveyDescriptionRef.current,
      categories: [editSurveyCategoryRef.current],
    };

    if (
      !editNameErrorRef.current &&
      !editDescriptionErrorRef.current &&
      editSurveyDescriptionRef.current &&
      editSurveyNameRef.current &&
      editSurveyCategoryRef.current
    ) {
      setEditLoading(true);
      try {
        const res = await axios.patch(
          `${URL}/survey/${editModalValues.surveyId}`,
          patchObj,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token.token,
            },
          }
        );
        if (res.status == 200) {
          Swal.fire(
            "",
            "Su encuesta ha sido actualizada exitosamente!",
            "success"
          );
          setEditLoading(false);
          setIsModalOpen(false);
          setFetchApi(true);
        }
      } catch (error) {
        setEditLoading(false);
        Swal.fire(
          "",
          "Lo sentimos, ha ocurrido un error. Intente de nuevo mas tarde.",
          "error"
        );
      }
    } else {
      setEditLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

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
      title: "Cantidad de respuestas",
      key: "answersAmount",
      sorter: (a, b) =>
        a.surveyQuestions[0].userAnswers.length -
        b.surveyQuestions[0].userAnswers.length,
      render(record) {
        return <p>{record?.surveyQuestions[0].userAnswers.length}</p>;
      },
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
      title: "Editar",
      render(record) {
        return (
          <div className="d-flex justify-content-center">
            <Button type="primary" onClick={() => showModal(record)}>
              {" "}
              Editar <i className="bi bi-pencil ms-2"></i>
            </Button>
          </div>
        );
      },
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
              Eliminar <i className="bi bi-trash3 ms-2"></i>
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

  const validateEditDescription = (rule, value, callback) => {
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ().,;:¿¡?!/-_\s]{1,220}$/;
    if (!regex.test(value)) {
      callback("La descripción ingresada es invalida");
      editDescriptionErrorRef.current = true;
    } else {
      callback();
      editDescriptionErrorRef.current = false;
      editSurveyDescriptionRef.current = value;
    }
  };

  const validateEditName = (rule, value, callback) => {
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ().,;:¿¡?!/-_\s]{1,55}$/;
    if (!regex.test(value)) {
      callback("El titulo ingresado es invalido");
      editNameErrorRef.current = true;
    } else {
      callback();
      editNameErrorRef.current = false;
      editSurveyNameRef.current = value;
    }
  };

  const handleChange = (value) => {
    editSurveyCategoryRef.current = value;
  };

  const RenderHandler = () => {
    if (viewLoading) {
      return <Loader />;
    } else if (fetchError) {
      return (
        <div className="text-center">
          <Image fluid={true} src="/assets/img/Error message/error1.png" />
        </div>
      );
    } else if (data.length == 0) {
      return (
        <div className="text-center">
          <Image
            fluid={true}
            src="/assets/img/No survey/Vaya, parece que no has creado una encuesta todavía (5).png"
          />
        </div>
      );
    } else {
      return (
        <div className="containerTable">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
          ></Table>

          <Modal
            centered
            transitionName=""
            maskTransitionName=""
            okText="Finalizar edición"
            cancelText="Cancelar"
            okButtonProps={{ loading: editLoading }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical" id="edit-modal">
              <Form.Item label="Elegir categoria">
                <Select
                  defaultValue="Elija una categoria"
                  className="w-75"
                  onChange={handleChange}
                  options={[
                    {
                      value: "Encuesta de satisfacción del cliente",
                      label: "Encuesta de satisfacción del cliente",
                    },
                    {
                      value: "Encuesta demografica",
                      label: "Encuesta demografica",
                    },
                    {
                      value: "Encuesta academica",
                      label: "Encuesta academica",
                    },
                    {
                      value: "Encuesta medica",
                      label: "Encuesta medica",
                    },
                    {
                      value: "Gastronomia",
                      label: "Gastronomia",
                    },
                    {
                      value: "Tecnología",
                      label: "Tecnología",
                    },
                    {
                      value: "Videojuegos",
                      label: "Videojuegos",
                    },
                    {
                      value: "Habitos y vida diaria",
                      label: "Habitos y vida diaria",
                    },
                    {
                      value: "Deporte",
                      label: "Deporte",
                    },
                    {
                      value: "Moda",
                      label: "Moda",
                    },
                    {
                      value: "Economía",
                      label: "Economía",
                    },
                    {
                      value: "Política",
                      label: "Política",
                    },
                    {
                      value: "Otro",
                      label: "Otro",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Titulo de la encuesta"
                name="surveyTitle"
                rules={[{ validator: validateEditName }]}
                tooltip="El titulo debe tener un maximo de 55 caracteres y no puede contener caracteres especiales."
              >
                <Input defaultValue={editModalValues?.name} />
              </Form.Item>

              <Form.Item
                label="Descripción"
                name="surveyDescription"
                rules={[{ validator: validateEditDescription }]}
                tooltip="La descripción debe tener un maximo de 220 caracteres y no puede contener caracteres especiales."
              >
                <TextArea
                  defaultValue={editModalValues?.description}
                  showCount
                  maxLength={220}
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    }
  };

  return (
    <div className="my-surveys-table" style={{ minHeight: "40vh" }}>
      <RenderHandler />
    </div>
  );
};

export default SurveysTable;
