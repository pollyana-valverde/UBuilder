import { useNavigate } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";

export default function Logout () {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const handleLogout = () => {
    setToken();
    navegacao("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 1 * 2500);

  return (
    <div className="intermediarioPage flex flex-column justify-content-center align-items-center">
      <div className="flex align-items-center gap-2">
        <h4>Saindo da sua conta</h4>
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
      </div>
      <p>Aguarde alguns instantes ...</p>
    </div>
  );
};
