import { useContext } from 'react';
import { ApiSubmitFormContext } from '../../../contexts/ApiSubmitFormContext';

import closeIcon from '../../../images/ico/close-icon.svg';
import accessIco from '../../../images/ico/access.svg';
import accessDeniedIco from '../../../images/ico/access-denied.svg';
import { usePopupClose } from '../../../hooks/usePopupClose';

import './Popup.css';

function Popup({ isOpen, onClose }) {
  const { successMsg, errorMsg, isSuccess, isDenied } =
    useContext(ApiSubmitFormContext);

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen ? 'popup_active' : ''}`}>
      <div className='popup__window'>
        <img src={closeIcon} alt='Close' className='popup__close' />
        {isSuccess && (
          <>
            <img src={accessIco} alt='Успех' className='popup__info-img' />
            <p className='popup__text '>{successMsg}</p>
          </>
        )}
        {isDenied && (
          <>
            <img
              src={accessDeniedIco}
              alt='Ошибка'
              className='popup__info-img'
            />
            <p className='popup__text popup__text_error'>{errorMsg}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
