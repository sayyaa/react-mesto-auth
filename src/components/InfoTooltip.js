import successPic from "../assets/svg/success.svg";
import errorPic from "../assets/svg/error.svg";

function InfoTooltip({
  isOpen,
  onClose,
  infoTooltipData
}) {
  const popupOpenOrCloseLogic = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupOpenOrCloseLogic}>
      <div className="popup__container infotooltip infotooltip__container">
        <img
          src={infoTooltipData.status ? successPic : errorPic}
          alt="изображение стуса авторизации"
          className="infotooltip__img"
        />
        <h2 className="popup__title  infotooltip infotooltip__title">
          {infoTooltipData.text}
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
