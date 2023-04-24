import React, { useEffect, useState } from "react";
import { Input, Space, Button, Dropdown, Select } from "antd";
import Row from "react-bootstrap/Row";
import SurveyCard from "./components/surveyCard";
import { Pagination } from "antd";
import axios from "axios";
import Loader from "../../components/loader/loader";
import CarouselHome from "./components/carousel";
import Image from "react-bootstrap/Image";
import Wave from "react-wavify";
import css from "./Home.css";

const { Search } = Input;

const Home = ({ URL }) => {
  const [surveys, setSurveys] = useState();
  const [surveysComponents, setSurveysComponents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchCategories, setSearchCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [surveysNotFound, setSurveysNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchApi().then(() => {
      setLoading(false);
    });
  }, [searchName, searchCategories]);

  const fetchApi = async () => {
    setSurveysNotFound(false);

    try {
      let searchBody = {
        name: searchName,
        categories: searchCategories[0]?.length == 0 ? [] : searchCategories,
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
                createdAt={i?.createdAt.slice(0, 10)}
              />
            ))
            .reverse()
        );

        if (data?.length == 0) {
          setSurveysNotFound(true);
        }
      }
    } catch (error) {
      setFetchError(true);
    }
  };

  const onSearch = (value) => {
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ().,;:¿¡?!/-_\s]{1,55}$/;
    if (regex.test(value)) {
      setSearchName(value);
    } else {
      setSearchName("");
    }
  };

  const handleChange = (value) => {
    setSearchCategories([value]);
  };

  const pageSize = 4;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageSurveys = surveysComponents.slice(startIndex, endIndex);

  const RenderHandler = () => {
    if (loading) {
      return <Loader />;
    } else if (fetchError) {
      return (
        <div className="text-center">
          <Image fluid={true} src="/assets/img/Error message/error1.png" />
        </div>
      );
    } else if (surveysNotFound) {
      return (
        <div className="text-center">
          <Image
            fluid={true}
            src="/assets/img/Survey not found/Lo sentimos, no hemos podido encontrar la encusta que buscabas.png"
          />
        </div>
      );
    } else {
      return (
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
                className="ms-auto pagNum"
              />
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <CarouselHome />
      <Wave
        fill="#7531f9"
        style={{ transform: "rotateX(180deg)" }}
        paused={false}
        options={{
          height: 15,
          amplitude: 50,
          speed: 0.15,
          points: 5,
        }}
      />

      <div className="text-center">
        <Image
          className="mb-2"
          style={{ maxHeight: "15vh" }}
          fluid={true}
          src="/assets/img/Home/Últimas encuestas blanco.png"
        />
      </div>

      <div className="container mt-3">
        <div className="d-flex mb-3 justify-content-center">
          <Search
            className="w-50"
            placeholder="Buscar por titulo de la encuesta"
            onSearch={onSearch}
          />
          <Select
            className="ms-3 w-50"
            onChange={handleChange}
            defaultValue="Buscar por categoria"
            options={[
              {
                value: "",
                label: "Todas",
              },
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
        </div>
      </div>

      <RenderHandler />
    </>
  );
};

export default Home;
