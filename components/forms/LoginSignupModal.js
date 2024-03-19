import React, { useState } from 'react';
import Modal from '../modal/Modal';
import { FORM_TYPES } from '../../config/config';
import { MetaMaskService } from '../../service/metamask';

const LoginSignupModal = ({ typeModal, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const handleInputChange = (newValue) => {
    setUserName(newValue);
  };
  const handleMetaMaskLogin = async () => {
    try {
      setLoading(true);
      await MetaMaskService.loginWithMetaMask();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleMetaMaskSignup = async () => {
    const localName = userName;
    try {
      setLoading(true);
      await MetaMaskService.signupWithMetaMask(localName);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {typeModal === FORM_TYPES.LOGIN ? (
        <LoginForm />
      ) : (
        <SignupForm value={userName} onChange={handleInputChange} />
      )}

      {loading ? (
        'Logging in...'
      ) : (
        <>
          {typeModal === FORM_TYPES.LOGIN ? (
            <button onClick={handleMetaMaskLogin} disabled={loading}>
              Login
            </button>
          ) : (
            <button onClick={handleMetaMaskSignup} disabled={loading}>
              SignUp
            </button>
          )}
        </>
      )}

      {errorMessage && (
        <p className={`error shadow-border`}>{`Error: ${errorMessage}`}</p>
      )}
    </Modal>
  );
};

const LoginForm = () => {
  return <div>Login Form</div>;
};

const SignupForm = ({ value, onChange }) => {
  return (
    <div>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default LoginSignupModal;
