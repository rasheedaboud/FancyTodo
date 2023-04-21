import { Col, Row } from "react-bootstrap";

import error from "./FallBack.module.css";

export const FallBack = () => (
  <Row className={error.errorBox + " align-middle mt-1 mb-2 me-auto ms-auto"}>
    <Col className='align-middle'>
      <p className={error.errorText + " text-center mb-0"}>
        Error loading component
      </p>
    </Col>
  </Row>
);
