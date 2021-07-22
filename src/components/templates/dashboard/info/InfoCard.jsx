import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export function InfoCard({ className, data, title, total }) {
  const classes = useStyles();

  return (
    <div className={className}>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Última criação: {data}
      </Typography>
    </div>
  );
}
