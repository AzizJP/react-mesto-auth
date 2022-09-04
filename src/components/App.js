import React from "react";
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
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "./Auth.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isRequestingServer, setIsRequestingServer] = React.useState(false);
  const [isHeaderPopupOpen, setIsHeaderPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const history = useHistory();
  const resetForm = () => {
    setPassword("");
    setEmail("");
    setMessage("");
  };

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([profile, cards]) => {
        setCurrentUser(profile);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeAllPopups = React.useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }, []);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard;

  React.useEffect(() => {
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

  const handleCardLike = React.useCallback(
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

  const handleEditProfileClick = React.useCallback(() => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }, [isEditProfilePopupOpen]);
  const handleAddPlaceClick = React.useCallback(() => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }, [isAddPlacePopupOpen]);
  const handleEditAvatarClick = React.useCallback(() => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }, [isEditAvatarPopupOpen]);
  const handleCardClick = React.useCallback((card) => {
    setSelectedCard(card);
  }, []);
  const handleHeaderPopupClick = React.useCallback(() => {
    setIsHeaderPopupOpen(!isHeaderPopupOpen);
  }, [isHeaderPopupOpen]);
  const handleInfoTooltipClick = React.useCallback(() => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }, [isInfoTooltipOpen]);

  const openConfirmationPopup = React.useCallback((card) => {
    setDeletedCard(card);
  }, []);

  const closeConfirmationPopup = React.useCallback(() => {
    setDeletedCard(null);
  }, []);

  const handleUpdateUser = React.useCallback(
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

  const handleUpdateAvatar = React.useCallback(
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

  const handleAddPlaceSubmit = React.useCallback(
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

  const handleCardDelete = React.useCallback(
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
        if (!res || res.statusCode === 400) {
          throw new Error("Что-то пошло не так!");
        }
        if (res) {
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

  React.useEffect(() => {
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
                onRegisterPopup={handleInfoTooltipClick}
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
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;