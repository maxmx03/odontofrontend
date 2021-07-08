import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputMask from 'react-input-mask';
import 'moment/locale/pt-br';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Select from 'react-select';
import moment from 'moment';

import Validator from '../../utils/validators/Validator';

export class ReactForms extends React.Component {
  constructor(props) {
    super(props);
    this.dateWarning = false;
  }

  setValue(state, value) {
    this.setState({
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
              ? this.setValue(state, Validator.clearHTML(e.target.value))
              : this.setValue(state, e.target.value);
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
        onChange={(e) => this.setValue(state, e.target.value)}
        onFocus={() => {
          this.setValue({
            showIndicator: true,
          });
        }}
        onBlur={() => {
          this.setValue({
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
        onChange={(e) => this.setValue(state, e.value)}
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

  createInputMask = (
    value,
    state,
    label,
    placeholder,
    type = 'text',
    required = true,
    mask,
    disabled
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <InputMask
        className="form-control"
        placeholder={placeholder}
        type={type}
        mask={mask}
        value={value}
        onChange={(e) => this.setValue(state, e.target.value)}
        required={required}
        disabled={disabled}
      />
    </FormGroup>
  );

  createAutoComplete = (value, state, label, options) => (
    <FormGroup>
      <Autocomplete
        onChange={(e, v) => {
          if (e.target.textContent.length === 0) {
            this.resetAutoCompleteInput();
          }
          this.setValue(state, v);
        }}
        value={value}
        options={options}
        getOptionLabel={(option) => option.email}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" />
        )}
      />
    </FormGroup>
  );

  createDatePicker = (
    value,
    state,
    label,
    format = 'DD/MM/YYYY',
    disabled = false
  ) => {
    const { dateWarning } = this.state;

    moment.locale('pt-br');
    return (
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale="pt-br"
      >
        <FormGroup>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={format}
            margin="normal"
            label={label}
            value={
              moment(value).isBefore(moment(), 'days')
                ? moment().format()
                : value
            }
            onChange={(e) => {
              if (e && moment(e).isAfter(moment(), 'days')) {
                this.setValue(state, e.format());
              } else {
                this.setValue(state, moment().format());
                this.setValue('dateWarning', true);
              }
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            disabled={disabled}
          />
          {dateWarning ? (
            <>
              <p className="text-danger mb-0">
                A data não pode ser menor que {`${moment().format('L')}`}
              </p>
              <p className="text-danger mt-0">
                Pacotes com a validade vencida precisam ser devolvidos ou
                descartados
              </p>
            </>
          ) : (
            ''
          )}
        </FormGroup>
      </MuiPickersUtilsProvider>
    );
  };
}
