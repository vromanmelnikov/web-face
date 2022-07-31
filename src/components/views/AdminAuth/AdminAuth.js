import { Outlet } from "react-router"
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"

import Class from './Auth.module.css'

function AdminAuth(props) {

    return (
        <Container className="p-4">
            <Row>
                <Col >
                    <Card className="text-center">
                        <Outlet />
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAuth