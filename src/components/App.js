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
import { Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isRequestingServer, setIsRequestingServer] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);

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
  }, []);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Header />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={true}
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
              <Login />
            </Route>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Redirect to="/" />
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
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
