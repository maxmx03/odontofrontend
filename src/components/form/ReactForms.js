import { Component } from 'react';
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
import Translator from '../../utils/translator/Translator';

export class ReactForms extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  setValue(state, value) {
    this.setState({
      [state]: value,
    });
  }

  createInput(
    opts = {
      value: '',
      state: '',
      label: '',
      placeholder: '',
      type: '',
      required: false,
      rows: '',
      spellcheck: false,
      disabled: false,
    }
  ) {
    return (
      <FormGroup>
        <Label>{opts.label}</Label>
        <Input
          type={opts.type ?? 'text'}
          value={opts.value}
          placeholder={opts.placeholder}
          required={opts.required}
          onChange={(e) => {
            opts.type === 'text'
              ? this.setValue(opts.state, Validator.clearHTML(e.target.value))
              : this.setValue(opts.state, e.target.value);
          }}
          rows={opts.rows}
          spellCheck={opts.spellcheck}
          style={{ resize: 'none' }}
          disabled={opts.disabled}
        />
      </FormGroup>
    );
  }

  createInputPassword(
    opts = {
      value: '',
      state: '',
      label: '',
      placeholder: '',
      type: '',
      required: false,
      disabled: false,
    }
  ) {
    return (
      <FormGroup>
        <Label>{opts.label}</Label>
        <Input
          type={opts.type ?? 'password'}
          value={opts.value}
          placeholder={opts.placeholder}
          required={opts.required}
          onChange={(e) => this.setValue(opts.state, e.target.value)}
          onFocus={() => {
            this.setValue('showIndicator', true);
          }}
          onBlur={() => {
            this.setValue('showIndicator', false);
          }}
          rows={opts.rows}
          spellCheck={opts.spellcheck}
          style={{ resize: 'none' }}
          disabled={opts.disabled}
        />
      </FormGroup>
    );
  }

  createSelect(
    opts = {
      value: '',
      state: '',
      label: '',
      options: [{ label: '', value: '' }],
      placeholder: '',
      disabled: false,
    }
  ) {
    let label = Translator.translate(opts.value);

    return (
      <FormGroup>
        <Label>{opts.label}</Label>
        <Select
          value={{
            label,
            value: opts.value,
          }}
          onChange={(e) => this.setValue(opts.state, e.value)}
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
          options={opts.options}
          placeholder={opts.placeholder}
          isDisabled={opts.disabled}
        />
      </FormGroup>
    );
  }

  createInputMask(
    opts = {
      value: '',
      state: '',
      label: '',
      placeholder: '',
      type: '',
      required: true,
      mask: '',
      disabled: false,
    }
  ) {
    return (
      <FormGroup>
        <Label>{opts.label}</Label>
        <InputMask
          className="form-control"
          placeholder={opts.placeholder}
          type={opts.type ?? 'text'}
          mask={opts.mask}
          value={opts.value}
          onChange={(e) => this.setValue(opts.state, e.target.value)}
          required={opts.required}
          disabled={opts.disabled}
        />
      </FormGroup>
    );
  }

  createAutoComplete(opts = { value: '', state: '', label: '', options: [] }) {
    return (
      <FormGroup>
        <Autocomplete
          onChange={(e, v) => {
            if (e.target.textContent.length === 0) {
              this.resetAutoCompleteInput();
            }
            this.setValue(opts.state, v);
          }}
          value={opts.value}
          options={opts.options}
          getOptionLabel={(option) => option.email}
          renderInput={(params) => (
            <TextField {...params} label={opts.label} variant="standard" />
          )}
        />
      </FormGroup>
    );
  }

  createDatePicker(
    opts = {
      value: '',
      state: '',
      label: '',
      format: '',
      disabled: false,
    }
  ) {
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
            format={opts.format || 'DD/MM/YYYY'}
            margin="normal"
            label={opts.label}
            value={
              moment(opts.value).isBefore(moment(), 'days')
                ? moment().format()
                : opts.value
            }
            onChange={(e) => {
              if (e && moment(e).isAfter(moment(), 'days')) {
                this.setValue(opts.state, e.format());
                this.setState({ dateWarning: false });
              } else {
                this.setValue(opts.state, moment().format());
                this.setState({ dateWarning: true });
              }
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          {this.state?.dateWarning ? (
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
  }
}
