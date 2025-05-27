import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "./provider/AuthProvider";
import axios from "axios";
import "./css/login.css";
import { Toast } from 'primereact/toast';
import { Form } from 'react-bootstrap';

import loginVid from './imagens/login-cadastro-vid.mp4';

export default function Login() {
    const toast = useRef(null);
    const { setToken } = useAuth();
    const navegacao = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [data] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3002/login/${email}/${senha}`);
            const userData = response.data;

            if (userData) {
                setToken(JSON.stringify(userData)); // Salva os dados do usuário no contexto
                navegacao("/");
            } else {
                toast.current.show({ severity: 'error', summary: 'Erro ao entrar.', detail: 'Usuário ou senha incorretos.', life: 3000 });
            }
        } catch (error) {
            console.error('Erro ao autenticar:', error);
            toast.current.show({ severity: 'error', summary: 'Erro ao entrar.', detail: 'Erro no servidor. Tente novamente.', life: 3000 });
        }
    };


    useEffect(() => {
        if (data) {
            console.log("resposta: ", data);
        }
    }, [data]);

    useEffect(() => {
        document.title = "Login";
    }, []);


    return (
        <Container fluid className="login  align-items-center justify-content-between flex" >
            <Toast ref={toast} />
            <Row>
                <Col lg={6} className="login_video">
                    <h4>UCIe Builder</h4>
                    <video width={'100%'} src={loginVid} autoPlay loop controls />
                </Col>
                <Col lg={6} className="login_form">
                    <h2 className="font-bold">Bem-vindo de volta!</h2>
                    <form onSubmit={handleLogin} className=" mt-4">
                        <Form.Group controlId="formemail" className="mb-3 relative">
                            <label >Email</label>
                            <Form.Control
                                className="shadow-none"
                                type="text"
                                name="email"
                                placeholder="Coloque seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3 relative">
                            <label >Senha</label>
                            <Form.Control
                                className="shadow-none"
                                type="password"
                                name="senha"
                                placeholder="Coloque sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </Form.Group>
                        <div className="text-right ">
                            <Link to="#">Esqueceu sua senha?</Link>
                        </div>
                        <button className="w-12 my-3 p-2 border-none border-round-lg font-medium text-lg" type="submit">Entrar</button>
                        <div className="flex justify-content-center ">
                            <p className="mr-2 font-medium">Não possui uma conta?</p>
                            <Link to="/cadastro">Cadrastre-se</Link>
                        </div>
                    </form>
                </Col>

            </Row>
        </Container>
    );
};
