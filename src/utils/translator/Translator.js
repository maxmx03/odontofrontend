import Validator from '../validators/Validator';

export default class Translator {
  static translate(string = '') {
    if (Validator.isShift(string)) {
      return string === 'morning'
        ? 'Matutino'
        : string === 'afternoon'
        ? 'Vespertino'
        : 'Noturno';
    }

    if (Validator.isType(string)) {
      return string === 'disabled'
        ? 'Desativado'
        : string === 'user'
        ? 'Laboratorista'
        : 'Administrador';
    }

    if (Validator.isStatus(string)) {
      return string === 'stored' ? 'Armazenado' : 'Retirado';
    }
  }
}
