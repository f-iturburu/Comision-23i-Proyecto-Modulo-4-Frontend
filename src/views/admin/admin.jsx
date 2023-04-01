import { Container } from "react-bootstrap"
import AdminSurveysTable from "./components/adminSurveysTable"

function AdminView({URL, token}) {
    return <Container className="mt-4">
        <AdminSurveysTable URL={URL} token={token}/>
    </Container>
    
}

export default AdminView