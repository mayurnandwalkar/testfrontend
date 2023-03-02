import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import axios from 'axios';
import LoggedInVendor from '../../../../layouts/LoggedInVendor';
import { baseURL } from '../../../../configs/const';

const StripReturn = () => {
  useEffect(() => {
    getAccountInfo();
  }, []);

  const getAccountInfo = () => {
    axios
      .get(`${baseURL}/stripe/account`, {
        headers: {
          Authorization: localStorage.getItem('MERCHPAL_AUTH_TOKEN'),
        },
      })
      .then(response => {
        console.log({ response });
      })
      .catch(error => {
        console.log({ error });
      });
  };
  return (
    <LoggedInVendor>
      <Grid>StripReturn</Grid>
    </LoggedInVendor>
  );
};

export default StripReturn;
