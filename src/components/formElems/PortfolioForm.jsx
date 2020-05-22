import React from 'react';
import { stat } from 'fs';
import FormInput from '../FormInput';
import FormTextArea from '../FormTextArea';

function PortFolioForm({ onSubmit, onChange, state }) {
  return (
    <form onSubmit={onSubmit}>
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
