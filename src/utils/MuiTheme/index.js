import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#dd6808',
      },
      secondary: {
        main: '#343a40',
      },
    },
  },
  ptBR
);

export default theme;
