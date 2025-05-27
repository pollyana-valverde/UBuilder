import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { InputMask } from "primereact/inputmask";
import loginVid from './imagens/login-cadastro-vid.mp4';
import "./css/cadastro.css";

const Cadastro = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    endereco: '',
    telefone: '',
    senha: '',
    tipoUser: '',
  });

  const [errors, setErrors] = useState({
    senhaMatch: false,
    requiredFields: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors.requiredFields[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        requiredFields: {
          ...prevErrors.requiredFields,
          [name]: false
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      await axios.post('http://localhost:3002/usuarios', formData);
      toast.current.show({
        severity: 'success',
        summary: 'Cadastro concluído com sucesso!',
        detail: <a href="/login">Ok</a>,
        life: 3000
      });
      setFormData({
        nome: '',
        sobrenome: '',
        email: '',
        cpf: '',
        endereco: '',
        telefone: '',
        senha: '',
        tipoUser: '',
      });
      setStep(1);
      navigate("/login");
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
    }
  };


  const handlePrivaciadeClick = () => {
    window.open(`/Privacidade`, '_blank');
  };

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setFormData((prevData) => ({
      ...prevData,
      cpf: value
    }));
  };
  return (
    <Container fluid className="cadastro align-items-center justify-content-center flex">
      <Toast ref={toast} />
      <Row >
        <Col lg={6} className='cadastro_form'>
          <h2 className="font-bold text-center">Cadastre-se!</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className='flex gap-3 w-12'>
              <Form.Group controlId="formnome" className="mb-3 relative w-12">
                <label >Nome</label>
                <Form.Control
                  className="shadow-none"
                  type="text"
                  name="nome"
                  placeholder="Coloque seu nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* <Form.Group controlId="formsobrenome" className="mb-3 relative w-12">
                <label >Sobrenome</label>
                <Form.Control
                  className="shadow-none"
                  type="text"
                  name="sobrenome"
                  placeholder="Coloque seu sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                />
              </Form.Group> */}
            </div>
            <div className='flex gap-3 w-12'>
              <Form.Group controlId="formcpf" className='mb-3 relative w-12'>
                <label>CPF</label>
                <Form.Control
                  className="shadow-none"
                  type="text"
                  name="cpf"
                  placeholder="Coloque seu cpf"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  maxLength="14"
                />
              </Form.Group>

              <Form.Group controlId="formtelefone" className="mb-3 relative flex flex-column w-12">
                <label>Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  className="shadow-none"
                  style={{ padding: ' 0.35rem 0.7rem' }}
                  type="text"
                  name="telefone"
                  placeholder="Coloque seu telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                ></InputMask>
              </Form.Group>
            </div>

            <Form.Group controlId="formemail" className="mb-3 relative">
              <label >Email</label>
              <Form.Control
                className="shadow-none"
                type="text"
                name="email"
                placeholder="Coloque seu email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3 relative">
              <label >Senha</label>
              <Form.Control
                className="shadow-none"
                type="password"
                name="senha"
                placeholder="Coloque sua senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </Form.Group>
            <button className="w-12 my-3 p-2 border-none border-round-lg font-medium text-lg" type="submit">Cadastrar</button>
          </form>

          <div className="flex justify-content-center mt-3">
            <p className="mr-2 text-brownMedium1 font-medium">Já possui uma conta?</p>
            <Link to="/login" className="text-brownMedium1 font-medium opacity-80">Faça Login</Link>
          </div>
        </Col>

        <Col lg={6} className="cadastro_video">
          <h4>UCIe Builder</h4>
          <video width={'100%'} src={loginVid} autoPlay loop controls />
        </Col>
      </Row>
    </Container>
  );
};

export default Cadastro;