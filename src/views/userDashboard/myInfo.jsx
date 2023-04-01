import axios from "axios"
import { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

const MyInfo = ({URL, token}) =>{
 const [data,setData] = useState()
 const [loading,setLoading] = useState(false)

    useEffect( ()=>{
        getMyInfo()
    },[])

    const getMyInfo = async () =>{
        setLoading(true)
        try {
            const res = await axios.get(`${URL}/user`,{
                headers: {
                    'auth-token': token.token
                }
            })    

            if (res.status == 200) {
                const data = res.data
                setData(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return <>
    {loading? <div className="w-100 d-flex justify-content-center mt-5 pt-2">
    <Spinner animation="border" style={{color:'purple'}} />
    </div>: <div className='d-flex flex-column mx-auto'>
    <Form.Label className='mb-0'>Nombre de usuario</Form.Label>
        <InputGroup className="mb-3">
        <Form.Control
           disabled={true}
          placeholder={data?.username}
          aria-label="Username"
        />
      </InputGroup>
      <Form.Label className='mb-0'>Email</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
           disabled={true}
          placeholder={data?.email}
          aria-label="email"
        />
      </InputGroup>
    </div>}
    </>
    
}

export default MyInfo