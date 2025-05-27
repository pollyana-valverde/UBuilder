import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../provider/AuthProvider';
// import noImage from '../imagens/noUserProfileImg.webp';
// import SidebarAdm from "./Sidebar";

import '../css/navbar.css';

import Rotas from "../Routes";


export default function Navbar() {
  const { token } = useAuth();
  const userData = token ? JSON.parse(token) : null;
  const [scrollNavegacao, setScrollNavegacao] = useState(false)
  const [showToggleDropCliente, setShowToggleDropCliente] = useState(false)

  useEffect(() => {
    const startNavegacaoScroll = () => {
      if (window.scrollY >= 1) {
        setScrollNavegacao(true);
      } else {
        setScrollNavegacao(false);
      }
    };

    window.addEventListener('scroll', startNavegacaoScroll);

    return () => {
      window.removeEventListener('scroll', startNavegacaoScroll);
    };
  }, []);

  const [linksAutenticados] = useState([
    {
      caminho: "/",
      nome: "Home",
    },
    {
      caminho: "/Biblioteca",
      nome: "Biblioteca",
    },
    {
      caminho: "/Projetos",
      nome: "Projetos"
    }
  ]);

  const [linksSemHeader] = useState([
    {
      caminho: "/Logout",
      nome: "Logout",
    },
    {
      caminho: "/EnterAccount",
      nome: "EnterAccount",
    },
  ]);

  const [activeLink, setActiveLink] = useState(() => {
    const savedLink = localStorage.getItem("activeLink");
    return savedLink ? JSON.parse(savedLink) : linksAutenticados[0];
  });

  // Função para atualizar o link ativo e salvar no localStorage
  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", JSON.stringify(link));
  };

  const toggleDropCliente = () => {
    setShowToggleDropCliente((prevState) => !prevState);
  }

  return (
    <Container fluid>
      {!token && (
        <>
          <Row style={{ width: '98%' }} className={` flex justify-content-between border-round-3xl fixed z-5 align-items-center text-center ${scrollNavegacao ? ' m-2 p-2' : ' my-3 '}`}>
            <Col lg={3}>
              <a
                className={`text-xl font-bold no-underline ${scrollNavegacao ? 'text-white' : ''}`}
                href="/"
                onClick={() => handleLinkClick("/")}>UCIe Builder</a>
            </Col>
            <Col lg={3}>
              <a href="/login" className={`text-xl font-bold ${scrollNavegacao ? 'text-white text-brownLight1-hover' : ' text-brownDark1-hover'} `}>Login</a>
            </Col>
          </Row>
          <Col ><Rotas /></Col>
        </>
      )}

      {token && (
        <>
          <Row className={`navegacao flex justify-content-between fixed w-12 z-2 align-items-center text-center ${scrollNavegacao ? ' m-2 p-2' : ' my-3 '}`}>
            <Col lg={3}>
              <a
                className={`text-xl font-bold no-underline ${scrollNavegacao ? 'text-white' : ''}`}
                href="/"
                onClick={() => handleLinkClick("/")}>UCIe Builder</a>
            </Col>
            <Col lg={2} className="menu flex flex-wrap justify-content-between align-items-center">
              {linksAutenticados.map((link) => (
                <a
                  key={link.nome}
                  href={link.caminho}
                  className={activeLink.nome === link.nome ? "activeLink" : ""}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.nome}
                </a>
              ))}
            </Col>
            <Col lg={3}>
              <div className="navegacaoCliente flex gap-3 justify-content-center align-items-center">
                <div className="flex gap-2">
                  <a href="/carrinhoCompra"><i className={`pi pi-bell font-bold text-xl ${scrollNavegacao ? 'text-white' : ''}`}></i></a>
                </div>

                <div className="flex relative gap-2 align-items-center">
                  <div className="flex flex-column text-left line-height-2">
                    <p className="text-md opacity-40  m-0">Olá, {userData.nome}</p>
                    <div className="flex  gap-2 align-items-center ">
                      <p className="text-sm font-medium  text-lg">{userData.nome} {userData.sobrenome}</p>
                      <i className="pi pi-angle-down " onClick={toggleDropCliente}></i>
                    </div>
                    {showToggleDropCliente && (
                      <div className="absolute top-50 mt-4 line-height-3 border-1 p-2 border-round-2xl">
                        <a href="/config" className=" no-underline text-lg font-medium">Configurações</a>
                        {/* <a href="/meusPedidos" className=" no-underline text-lg font-medium"> Meus pedidos</a> */}
                        <div style={{ borderTop: '1px solid var(--grey)', margin: '3px 0' }}></div>
                        <a href="/Logout" > <i className="pi pi-sign-out"></i> Sair</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Col ><Rotas /></Col>
        </>
      )}
    </Container>
  );
}