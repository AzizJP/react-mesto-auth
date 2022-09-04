import React, { useState, useCallback, useEffect } from "react";
import { api } from "../utils/Api";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../index.css";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRequestingServer, setIsRequestingServer] = useState(false);
  const [isHeaderPopupOpen, setIsHeaderPopupOpen] = useState(false);
  const [isRegisterInfoTooltipOpen, setIsRegisterInfoTooltipOpen] =
    useState(false);
  const [isLoginInfoTooltipOpen, setIsLoginInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const path = useLocation();
  const resetForm = useCallback(() => {
    setPassword("");
    setEmail("");
    setMessage("");
  }, [setPassword, setEmail, setMessage]);

  useEffect(() => {
    resetForm();
  }, [loggedIn, path, resetForm]);

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([profile, cards]) => {
        setCurrentUser(profile);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsRegisterInfoTooltipOpen(false);
    setIsLoginInfoTooltipOpen(false);
  }, []);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isRegisterInfoTooltipOpen ||
    isLoginInfoTooltipOpen ||
    selectedCard;

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
    } else {
      document.removeEventListener("keydown", closeByEscape);
    }
  }, [isOpen, closeAllPopups]);

  const handleCardLike = useCallback(
    (card) => {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);
      api
        .toogleLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [currentUser._id]
  );

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }, [isEditProfilePopupOpen]);
  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }, [isAddPlacePopupOpen]);
  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }, [isEditAvatarPopupOpen]);
  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);
  const handleHeaderPopupClick = useCallback(() => {
    setIsHeaderPopupOpen(!isHeaderPopupOpen);
  }, [isHeaderPopupOpen]);
  const handleRegisterInfoTooltipClick = useCallback(() => {
    setIsRegisterInfoTooltipOpen(!isRegisterInfoTooltipOpen);
  }, [isRegisterInfoTooltipOpen]);
  const handleLoginInfoTooltipClick = useCallback(() => {
    setIsLoginInfoTooltipOpen(!isLoginInfoTooltipOpen);
  }, [isLoginInfoTooltipOpen]);

  const openConfirmationPopup = useCallback((card) => {
    setDeletedCard(card);
  }, []);

  const closeConfirmationPopup = useCallback(() => {
    setDeletedCard(null);
  }, []);
  const exitFromAccount = useCallback(() => {
    setLoggedIn(false);
  }, []);

  const handleUpdateUser = useCallback(
    ({ name, about }) => {
      setIsRequestingServer(true);
      api
        .patchProfileInfo(name, about)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            setIsRequestingServer(false);
          }, 300);
        });
    },
    [closeAllPopups]
  );

  const handleUpdateAvatar = useCallback(
    ({ avatar }) => {
      setIsRequestingServer(true);
      api
        .patchAvatar(avatar)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            setIsRequestingServer(false);
          }, 300);
        });
    },
    [closeAllPopups]
  );

  const handleAddPlaceSubmit = useCallback(
    ({ name, link }) => {
      setIsRequestingServer(true);
      api
        .addNewCard(name, link)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            setIsRequestingServer(false);
          }, 300);
        });
    },
    [cards, closeAllPopups]
  );

  const handleCardDelete = useCallback(
    (card) => {
      setIsRequestingServer(true);
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          closeConfirmationPopup();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            setIsRequestingServer(false);
          }, 300);
        });
    },
    [closeConfirmationPopup]
  );

  const handleRegister = ({ password, email }) => {
    Auth.register(password, email)
      .then((res) => {
        if (!res || res.status === 400) {
          throw new Error("Что-то пошло не так!");
        }
        if (res.data) {
          setLoggedIn(true);
          resetForm();
          history.push("/sign-in");
        }
      })
      .catch((err) => setMessage(err.message || "Что-то пошло не так!"));
  };

  const handleLogin = ({ email, password }) => {
    Auth.authorize(email, password)
      .then((res) => {
        if (!res) {
          throw new Error("Неправильное имя пользователя или пароль");
        }
        if (res.token) {
          setLoggedIn(true);
          resetForm();
          localStorage.setItem("token", res.token);
          history.push("/react-mesto-auth");
        }
      })
      .catch((err) => setMessage(err.message || "Что-то пошло не так!"));
  };

  const tokenCheck = async (token) => {
    Auth.getContent(token).then((res) => {
      if (res) {
        setLoggedIn(true);
        setUserEmail(res.data.email);
      }
    });
  };

  useEffect(() => {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      tokenCheck(jwt);
      history.push("/react-mesto-auth");
    }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Header
            emailVision={userEmail}
            isOpen={isHeaderPopupOpen}
            onHeaderPopup={handleHeaderPopupClick}
            loggedOut={exitFromAccount}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/react-mesto-auth"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={openConfirmationPopup}
            />
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
                onLoginPopup={handleLoginInfoTooltipClick}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                message={message}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
                onRegisterPopup={handleRegisterInfoTooltipClick}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                message={message}
                onLogin={handleLogin}
              />
            </Route>
            <Route>
              {loggedIn ? (
                <Redirect to="/react-mesto-auth" />
              ) : (
                <Redirect to="/sign-up" />
              )}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isRequesting={isRequestingServer}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isRequesting={isRequestingServer}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isRequesting={isRequestingServer}
          />
          <PopupWithConfirmation
            card={deletedCard}
            onClose={closeConfirmationPopup}
            onSubmit={handleCardDelete}
            isRequesting={isRequestingServer}
          />
          <ImagePopup
            name="image"
            card={selectedCard}
            isOpen={!!selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            name="info-tooltip"
            loggedIn={loggedIn}
            isOpen={isRegisterInfoTooltipOpen}
            onClose={closeAllPopups}
            successText="Вы успешно зарегистрировались!"
            errorText="Что-то пошло не так! Попробуйте ещё раз."
          />
          <InfoTooltip
            name="info-tooltip"
            loggedIn={loggedIn}
            isOpen={isLoginInfoTooltipOpen}
            onClose={closeAllPopups}
            successText="Вы успешно авторизовались!"
            errorText="Что-то пошло не так! Попробуйте ещё раз."
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
