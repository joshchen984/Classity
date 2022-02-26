import React, { useState } from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import withUserAuth from '../hoc/withUserAuth';
import LoggedInNav from '../components/LoggedInNav';
import Layout from '../components/Layout';
import Title from '../components/Typography/Title';
import ClassityButton from '../components/ClassityButton';
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog';

const Settings = () => {
  const theme = useTheme();
  const deleteAccountHandler = () => {
    console.log('delete account');
  };
  const [delAccountDialogOpen, setDelAccountDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Settings | Classity</title>
      </Head>
      <LoggedInNav />
      <ConfirmationDialog
        title="Delete your account? This process is not reversible."
        open={delAccountDialogOpen}
        onClose={() => setDelAccountDialogOpen(false)}
        onConfirm={deleteAccountHandler}
      />

      <Layout>
        <Grid container direction="column">
          <Title>Settings</Title>
          <Grid item>
            <hr />
          </Grid>
          <Grid item>
            <ClassityButton
              color={theme.palette.error}
              onClick={() => setDelAccountDialogOpen(true)}
            >
              Delete Account
            </ClassityButton>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default withUserAuth(Settings, '/');
