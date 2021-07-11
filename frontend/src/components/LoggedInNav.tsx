import React, { useState } from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import ProfileMenu from './ProfileMenu';

function ElevationScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  icons: {
    color: 'black',
  },
}));
const LoggedInNav = () => {
  const classes = useStyles();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const profileIconClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(e.currentTarget);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Grid container direction="row-reverse" className={classes.icons}>
              <Grid item>
                <IconButton color="inherit" onClick={profileIconClickHandler}>
                  <AccountCircle />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="inherit">
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <ProfileMenu
        anchorEl={profileAnchorEl}
        setAnchorEl={setProfileAnchorEl}
      />
    </>
  );
};

export default LoggedInNav;
