import successPic from "../assets/svg/success.svg"


function InfoTooltip({isOpen, onClose}) {

  const popupOpenOrCloseLogic = `popup ${isOpen ? "popup_opened" : ""}`;

 return (
  <div className={popupOpenOrCloseLogic}>
      <div className="popup__container infotooltip infotooltip__container">
        <img src={successPic} alt="изображение стуса авторизации" className="infotooltip__img"/>
        <h2 className="popup__title  infotooltip infotooltip__title">Вы успешно зарегистрировались!</h2>
        <button
          onClick={onClose}
          className="popup__close-btn button"
          type="button"
          aria-label="Закрыть окно"
        ></button></div></div>
 )
}

export default InfoTooltip;