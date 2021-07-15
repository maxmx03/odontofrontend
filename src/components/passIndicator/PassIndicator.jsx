import React from 'react';

export const PassIndicator = ({
  equals,
  minChar,
  minNum,
  showIndicator = false,
  specialChar,
  upperCaseChar,
}) => {
  if (showIndicator === true) {
    return (
      <div className="m-3">
        <IndicatorOutput rule={minChar} msg="A senha precisa ter no mínimo 8 caracters" />
        <IndicatorOutput rule={minNum} msg="A senha precisa ter no mínimo um número" />
        <IndicatorOutput rule={specialChar} msg="A senha precisa ter no mínimo um especial caracter" />
        <IndicatorOutput rule={upperCaseChar} msg="A senha precisa ter no mínimo uma letra maiúscula" />
        <IndicatorOutput rule={equals} msg="As senhas precisam ser iguais" />
      </div>
    );
  }

  return <span style={{ display: 'none' }} />;
};

export const WeakPassIndicator = ({
  equals,
  minAlphaNum,
  minChar,
  showIndicator = false,
}) => {
  if (showIndicator === true) {
    return (
      <div className="m-3">
        <IndicatorOutput rule={minChar} msg="A senha precisa ter no mínimo 5 caracters" />
        <IndicatorOutput rule={minAlphaNum} msg="A senha precisa ter no mínimo um número e uma letra" />
        <IndicatorOutput rule={equals} msg="As senhas precisam ser iguais" />
      </div>
    );
  }

  return <span style={{ display: 'none' }} />;
};

export const OnePassIndicator = ({ msg, rule, showIndicator }) => {
  if (showIndicator === true) {
    return (
      <IndicatorOutput rule={rule} msg={msg} />
    );
  }

  return <span style={{ display: 'none' }} />;
};

const IndicatorOutput = ({ msg, rule }) => (
  <p className={!rule ? 'text-danger m-0' : 'text-success m-0'}>
    {msg}
  </p>
);
