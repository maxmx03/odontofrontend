import Validator from '../../../utils/validators/Validator';
import Axios from '../../services/Axios';
import Session from '../../services/Session';
import { FIND_SERVICES } from '../../../constants/routes/api/serviceRoutes';
import { storeServices } from '../slicers/serviceSlicer';

export function getServices() {
  return function (dispatch) {
    const token = Session.get('token');

    if (Validator.isNotEmpty(token)) {
      Axios.get(FIND_SERVICES, token).then(({ data }) => {
        dispatch(storeServices(data.services));
      });
    }
  };
}
