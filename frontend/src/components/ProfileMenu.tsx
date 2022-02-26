import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { gaEvent } from '../app/gtag';

type ProfileMenuProps = {
  anchorEl: null | HTMLElement;
  // eslint-disable-next-line no-unused-vars
  setAnchorEl: (value: null | HTMLElement) => void;
};
const ProfileMenu = ({ anchorEl, setAnchorEl }: ProfileMenuProps) => {
  const router = useRouter();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async () => {
    await firebase.auth().signOut();
    gaEvent('logout', {});
  };
  const settingHandler = () => {
    router.push('/settings');
  };
  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MenuItem onClick={settingHandler}>Settings</MenuItem>
      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
