import Popup from "./components/Popup/Popup";
import NewsBanner from "../NewsBanner/NewsBanner";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";
import NewsPage from "../NewsPage/NewsPage";
import About from "../About/About";
import Login from "./components/Popup/components/Login/Login";
import Register from "./components/Popup/components/Register/Register";
import RegisterTooltip from "./components/Popup/components/RegisterTooltip/RegisterTooltip";

export default function Main({
  popup,
  onClosePopup,
  onOpenPopup,
  currentUser,
  onLogin,
  onRegister,
  onLogout,
}) {
  const popupMap = {
    login: {
      title: "Entrar",
      component: (
        <Login
          onClose={onClosePopup}
          onOpenRegister={() => onOpenPopup("register")}
          onLogin={onLogin}
        />
      ),
    },

    register: {
      title: "Inscrever-se",
      component: (
        <Register
          onClose={onClosePopup}
          onOpenLogin={() => onOpenPopup("login")}
          onOpenTooltip={() => onOpenPopup("registerTooltip")}
          onRegister={onRegister}
        />
      ),
    },

    registerTooltip: {
      title: "Cadastro concluído com sucesso!",
      component: (
        <RegisterTooltip
          onClose={onClosePopup}
          onOpenLogin={() => onOpenPopup("login")}
        />
      ),
    },
  };

  return (
    <main className="main">
      <NewsBanner
        onOpenPopup={onOpenPopup}
        currentUser={currentUser}
        onLogout={onLogout}
      />
      <Preloader />
      <NoResults />
      <NewsPage currentUser={currentUser} />
      <About />

      {popup && popupMap[popup.type] && (
        <Popup onClose={onClosePopup} title={popupMap[popup.type].title}>
          {popupMap[popup.type].component}
        </Popup>
      )}
    </main>
  );
}
