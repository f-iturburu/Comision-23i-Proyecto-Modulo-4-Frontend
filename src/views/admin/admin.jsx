import { Container } from "react-bootstrap"
import AdminSurveysTable from "./components/adminSurveysTable"
import {Image} from "react-bootstrap"
import Wave from "react-wavify"

function AdminView({URL, token}) {
    return <>
    <div className='bannerContainer'>
       <Image
className="mb-2 mt-2"
style={{maxHeight:'15vh'}}
fluid={true}
src="/public/assets/img/admin/admin negro.png"
/>
    </div>


<Wave  fill='#7531f9'
  style={{transform:'rotateX(180deg)'}}
 paused={false} 
 options={{
  height: 15,
amplitude: 50,
speed: 0.15,
points: 5,}} />;   
    <Container className="mt-4">
        <AdminSurveysTable URL={URL} token={token}/>
    </Container>
    </>
    
}

export default AdminView