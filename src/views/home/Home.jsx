import React, { useEffect, useState } from "react";
import { Input, Space, Button, Dropdown } from "antd";
import Row from "react-bootstrap/Row";
import SurveyCard from "./components/surveyCard";
import { Pagination } from "antd";
import axios from "axios";
import Loader from "../../components/loader/loader";
import CarouselHome from "./components/carousel";
import Image from "react-bootstrap/Image";
import Wave from 'react-wavify'
import css from "./Home.css";

const { Search } = Input;

const Home = ({ URL }) => {
  const [surveys, setSurveys] = useState();
  const [surveysComponents, setSurveysComponents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchCategories, setSearchCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false)
  const [surveysNotFound, setSurveysNotFound] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetchApi().then(() => {
      setLoading(false);
    });
  }, [searchName, searchCategories]);

  const fetchApi = async () => {
    setSurveysNotFound(false)
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
                createdAt={i?.createdAt.slice(0, 10)}
              />
            ))
            .reverse()
        );

        if (data?.length == 0) {
          setSurveysNotFound(true)
        }
      }
    } catch (error) {
      setFetchError(true)
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
    {
      key: "9",
      label: (
        <div onClick={() => setSearchCategories(["Tecnología"])}>Tecnología</div>
      ),
    },
    {
      key: "10",
      label: (
        <div onClick={() => setSearchCategories(["Videojuegos"])}>Videojuegos</div>
      ),
    },
    {
      key: "11",
      label: (
        <div onClick={() => setSearchCategories(["Habitos y vida diaria"])}>Habitos y vida diaria</div>
      ),
    },
    {
      key: "12",
      label: (
        <div onClick={() => setSearchCategories(["Moda"])}>Moda</div>
      ),
    },
    {
      key: "13",
      label: (
        <div onClick={() => setSearchCategories(["Otro"])}>Otro</div>
      ),
    },
  ];

  const onSearch = (value) => {
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ().,;:¿¡?!/-_\s]{1,55}$/;
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

const RenderHandler = () =>{
  if (loading) {
    return  <Loader />
  }else if (fetchError){
    return  <div className="text-center">
      <Image fluid={true} src="/assets/img/Error message/error1.png"/>
    </div>
    
  }else if(surveysNotFound){
    return  <div className="text-center">
      <Image fluid={true} src="/assets/img/Survey not found/Lo sentimos, no hemos podido encontrar la encusta que buscabas.png"/>     
    </div>
    
    
  }else{
    return  <>
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
  }
}
  return  <>
      <CarouselHome />
       <Wave  fill='#7531f9'
        style={{transform:'rotateX(180deg)'}}
       paused={false} options={{
        height: 15,
    amplitude: 50,
    speed: 0.15,
    points: 5,}} />

      
<div className="text-center">
        <Image
        className="mb-2"
         style={{maxHeight:'15vh'}}
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
          <Dropdown menu={{ items }} placement="bottom" className="ms-3">
            <Button>Buscar por categoria</Button>
          </Dropdown>
        </div> 
      </div>

      <RenderHandler />
    </>
};

export default Home;
