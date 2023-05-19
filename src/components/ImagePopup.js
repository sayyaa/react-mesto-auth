function ImagePopup({ card, onClose }) {
    const popupOpenOrCloseLogic = `popup popup_type_open-picture ${card.link ? "popup_opened" : ""}`;

    return (
        <div className={popupOpenOrCloseLogic}>
            <div className="popup__wrapper">
                <button className="popup__close-btn button" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
                <figure className="popup__image-wrapper">
                    <img src={card.link} alt={card.name} className="popup__image" />
                    <figcaption className="popup__image-caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;