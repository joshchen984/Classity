import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from 'firebase/app';

type ProfileMenuProps = {
  anchorEl: null | HTMLElement;
  // eslint-disable-next-line no-unused-vars
  setAnchorEl: (value: null | HTMLElement) => void;
};
const ProfileMenu = ({ anchorEl, setAnchorEl }: ProfileMenuProps) => {
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async () => {
    await firebase.auth().signOut();
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
      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
