import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import Validator from '../../utils/validators/Validator';

export class ReactForms extends React.Component {
  constructor(props) {
    super(props);
    this.setState.bind(this);
    this.createInput.bind(this);
    this.createInputPassword.bind(this);
    this.createSelect.bind(this);
    this.createInputPassword.bind(this);
    this.createSelect.bind(this);
  }

  setState(state, value) {
    super.setState({
      [state]: value,
    });
  }

  createInput(
    value,
    state,
    label,
    placeholder,
    type = 'text',
    required = true,
    rows,
    spellcheck = false,
    disabled
  ) {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e) => {
            type === 'text'
              ? this.setState(state, Validator.clearHTML(e.target.value))
              : this.setState(state, e.target.value);
          }}
          rows={rows}
          spellCheck={spellcheck}
          style={{ resize: 'none' }}
          disabled={disabled}
        />
      </FormGroup>
    );
  }

  createInputPassword = (
    value,
    state,
    label,
    placeholder,
    type = 'text',
    required = true,
    rows,
    spellcheck = false,
    disabled
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => this.setState(state, e.target.value)}
        onFocus={() => {
          this.setState({
            showIndicator: true,
          });
        }}
        onBlur={() => {
          this.setState({
            showIndicator: false,
          });
        }}
        rows={rows}
        spellCheck={spellcheck}
        style={{ resize: 'none' }}
        disabled={disabled}
      />
    </FormGroup>
  );

  createSelect = (
    value,
    state,
    label,
    options,
    placeholder,
    disabled = false
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <Select
        value={{
          label: Validator.toTitleCase(value),
          value,
        }}
        onChange={(e) => this.setState(state, e.value)}
        theme={(theme) => ({
          ...theme,
          borderRadius: '.25rem',
          colors: {
            ...theme.colors,
            primary: '#fd7e14',
            primary25: '#fd7e14',
          },
        })}
        styles={{
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected || state.isFocused ? '#fff' : '#6c757d',
          }),
        }}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </FormGroup>
  );
}
