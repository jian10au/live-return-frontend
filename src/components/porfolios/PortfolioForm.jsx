import React from 'react';
import { stat } from 'fs';
import FormInput from '../elements/FormInput';
import FormTextArea from '../elements/FormTextArea';
import styles from './PortfolioForm.module.css';
function PortFolioForm({ onSubmit, onChange, state }) {
  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <FormInput
        onChange={onChange}
        type="text"
        name="name"
        displayName="Portfolio Name"
        value={state.name}
        id="name"
        placeholder="Provide name"
        required
      />

      <FormTextArea
        className={styles.description}
        onChange={onChange}
        type="text"
        name="description"
        displayName="Portfolio description"
        value={state.description}
        id="description"
        placeholder="Provide description"
        required
      />

      <button>Confirm</button>
    </form>
  );
}

export default PortFolioForm;
