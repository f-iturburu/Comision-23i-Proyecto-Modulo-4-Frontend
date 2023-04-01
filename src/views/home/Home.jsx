import React, { useEffect, useState } from "react";
import { Input, Space, Button, Dropdown } from "antd";
import Row from "react-bootstrap/Row";
import SurveyCard from "./components/surveyCard";
import { Pagination } from "antd";
import axios from "axios";
import Loader from "../../components/loader/loader";
import CarouselHome from "./components/carousel";

const { Search } = Input;

const Home = ({ URL }) => {
  const [surveys, setSurveys] = useState();
  const [surveysComponents, setSurveysComponents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchCategories, setSearchCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchApi().then(() => {
      setLoading(false);
    });
  }, [searchName, searchCategories]);

  const fetchApi = async () => {
    try {
      let searchBody = {
        name: searchName,
        categories: searchCategories,
      };

      const res = await axios.post(`${URL}/surveys/active`, searchBody);

      if (res.status == 200) {
        const data = res.data;
        setSurveys(data);
        setSurveysComponents(
          data
            .map((i) => (
              <SurveyCard
                surveyTitle={i.name}
                surveyCategory={i.categories[0]}
                id={i._id}
                surveyDescription={i.description}
                surveyEndDate={i?.endDate}
                createdAt={i?.createdAt.slice(0,10)}
              />
            ))
            .reverse()
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      key: "0",
      label: <div onClick={() => setSearchCategories([])}>Todas</div>,
    },
    {
      key: "1",
      label: (
        <div
          onClick={() =>
            setSearchCategories(["Encuesta de satisfacción del cliente"])
          }
        >
          Encuesta de satisfacción del cliente
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => setSearchCategories(["Encuesta demografica"])}>
          Encuesta demografica
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={() => setSearchCategories(["Encuesta academica"])}>
          Encuesta academica
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div onClick={() => setSearchCategories(["Encuesta medica"])}>
          Encuesta medica
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div onClick={() => setSearchCategories(["Gastronomia"])}>
          Gastronomia
        </div>
      ),
    },
    {
      key: "6",
      label: (
        <div onClick={() => setSearchCategories(["Deporte"])}>Deporte</div>
      ),
    },
    {
      key: "7",
      label: (
        <div onClick={() => setSearchCategories(["Economía"])}>Economía</div>
      ),
    },
    {
      key: "8",
      label: (
        <div onClick={() => setSearchCategories(["Política"])}>Política</div>
      ),
    },
  ];

  const onSearch = (value) => {
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\(\)\.,;:¿¡?!\s]{1,55}$/;
    if (regex.test(value)) {
      setSearchName(value);
    } else {
      setSearchName("");
    }
  };

  const pageSize = 4;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageSurveys = surveysComponents.slice(startIndex, endIndex);

  return (
    <>
      <CarouselHome />
      <div className="container mt-3">
        <div className="d-md-flex mb-3 justify-content-center">
          <Search
            className="w-50"
            placeholder="Buscar por titulo de la encuesta"
            onSearch={onSearch}
          />
          <Dropdown menu={{ items }} placement="bottom" className="ms-3">
            <Button>Buscar por categoria</Button>
          </Dropdown>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className=" d-flex flex-column justify-content-center">
              {currentPageSurveys}
            </div>
            <div className="d-flex w-100 justify-content-center mb-3">
              <div>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={surveysComponents.length}
                  onChange={(page) => setCurrentPage(page)}
                  className="ms-auto"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
