import { useState } from 'react';
import Button from '../components/btn/Button';
import LoginSignupModal from '../components/forms/LoginSignupModal';
import { FORM_TYPES } from '../config/config';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(null);

  const openModal = (status) => {
    setModalOpen(true);
    setModalStatus(status);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='container'>
      <div className='box'>
        <h2>
          MetaMask <span className='block'>Connect.</span>
        </h2>
        <Button onClick={() => openModal(FORM_TYPES.LOGIN)}>Login</Button>
        <Button onClick={() => openModal(FORM_TYPES.REGISTER)}>Register</Button>
        <LoginSignupModal
          typeModal={modalStatus}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}
