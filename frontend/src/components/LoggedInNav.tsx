/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import { useRouter } from 'next/router';
import ProfileMenu from './ProfileMenu';
import Logo from './Logo';

function ElevationScroll({ children }: { children: React.ReactElement }) {
  return React.cloneElement(children, {
    elevation: 4,
  });
}

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#fafafa',
  },
  icons: {
    color: 'black',
  },
  navSpacing: {
    marginBottom: '4.6em',
  },
}));
type LoggedInNavProps = {
  setCreateAssignmentDialogOpen?: (open: boolean) => void;
};
const LoggedInNav = ({ setCreateAssignmentDialogOpen }: LoggedInNavProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const profileIconClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(e.currentTarget);
  };
  const addIconClickHandler = () => {
    if (/classes\/.+/.test(router.pathname)) {
      (setCreateAssignmentDialogOpen as (open: boolean) => void)(true);
    } else {
      router.push('/create/class');
    }
  };

  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Logo />
              <Grid
                container
                item
                direction="row-reverse"
                className={classes.icons}
                xs={10}
                sm={8}
              >
                <Grid item>
                  <IconButton color="inherit" onClick={profileIconClickHandler}>
                    <AccountCircle />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="inherit" onClick={addIconClickHandler}>
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.navSpacing} />
      <ProfileMenu
        anchorEl={profileAnchorEl}
        setAnchorEl={setProfileAnchorEl}
      />
    </>
  );
};
LoggedInNav.defaultProps = {
  setCreateAssignmentDialogOpen: () => null,
};
export default LoggedInNav;
