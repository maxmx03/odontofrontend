import { useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
} from '@material-ui/core';
import { Container, Row, Col } from 'reactstrap';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { PrimaryMenuList, SecondaryMenuList } from '../../components/templates/menu';
import { Copyright, ProtectedRoute } from '../../components';
import { selectUser } from '../../app/redux/selectors/authSelector';
import { useStyles } from './style';
import { odontoEasy } from '../../assets/images';
import Students from '../student/Students';
import Packages from '../package/Packages';
import Users from '../user/Users';
import Dashboard from '../dashboard/Dashboard';

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const user = useSelector(selectUser);

  function handleDrawerOpen() {
    setOpen(true);
  }
  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <img src={odontoEasy} alt="odontoeasy logo" className="img-logo" />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon className="text-light" />
          </IconButton>
        </div>
        <Divider />
        <List>
          <PrimaryMenuList />
        </List>
        <Divider />
        <List>
          <SecondaryMenuList />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container fluid className="mt-3">
          <Row>
            <Col lg="12">
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/dashboard/students" component={Students} />
              <Route path="/dashboard/packages" component={Packages} />
              <ProtectedRoute
                path="/dashboard/users"
                component={Users}
                hasPermission={user.type && user.type === 'admin'}
              />
            </Col>
          </Row>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
