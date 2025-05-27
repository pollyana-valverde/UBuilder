import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../../src/provider/AuthProvider";

import Rotas from "../Routes";

export default function Navbar () {
  return (
    <>
     <Col ><Rotas /></Col>
    </>
  );
};


