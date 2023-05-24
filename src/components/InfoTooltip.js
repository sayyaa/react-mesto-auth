import successPic from "../assets/svg/success.svg";
import errorPic from "../assets/svg/error.svg";

function InfoTooltip({ isOpen, onClose, statusInfoToolTip }) {
  const popupOpenOrCloseLogic = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupOpenOrCloseLogic}>
      <div className="popup__container infotooltip infotooltip__container">
        <img
          src={statusInfoToolTip ? successPic : errorPic}
          alt="изображение стуса авторизации"
          className="infotooltip__img"
        />
        <h2 className="popup__title  infotooltip infotooltip__title">
          {statusInfoToolTip
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          onClick={onClose}
          className="popup__close-btn button"
          type="button"
          aria-label="Закрыть окно"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
