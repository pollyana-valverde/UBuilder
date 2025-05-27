import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import LandingPage from "./LandingPage";
import Home from "./Home";
import Login from './Login';
import Cadastro from './Cadastro';
import Biblioteca from './Biblioteca';
import CriarProjeto from './CriarProjeto';
import DetalhesProjeto from './DetalhesProjeto';
import Projetos from './Projetos';


import EnterAccount from "./EnterAccount";
import Logout from "./Logout";


const Rotas = () => {
  const { token } = useAuth();

  const rotasSomenteAutenticados = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: '/EnterAccount',
          element: <EnterAccount />,
        },
        {
          path: "/Logout",
          element: <Logout />,
        },
        {
          path: "/",
          element: <Home  />
        },
        {
          path: "/Projetos",
          element: <Projetos  />
        },
        {
          path: "/Biblioteca",
          element: <Biblioteca  />
        },
        {
          path: "/CriarProjeto",
          element: <CriarProjeto  />
        },
        {
          path: "/DetalhesProjeto",
          element: <DetalhesProjeto  />
        },
        // {
        //   path: "/detalhesProduto/:idProduto",
        //   element: <DetalhesProduto  />
        // },
      ],
    },
  ];

  const rotasNaoAutenticados = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/cadastro",
      element: <Cadastro />
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? rotasNaoAutenticados : []),
    ...rotasSomenteAutenticados,
  ]);


  return <RouterProvider router={router} />;
};

export default Rotas;