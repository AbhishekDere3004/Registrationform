import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl,Grid, InputLabel, FormHelperText } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { API_USERS_URL } from '../redux/apiConfig';

const schema = yup.object().shape({
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string().required('Country is required'),
  pincode: yup.string().matches(/^[0-9]+$/, 'Invalid pincode'),
});

const Step2Form = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    console.log('Step 2 data:', data);
    // Save data or dispatch action to Redux here
    // Submit the form
    navigate('/');
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(API_USERS_URL);
      if (response.ok) {
        const users = await response.json();
        // Handle the fetched user data, e.g., update state or UI
        console.log('Fetched user data:', users);
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('An error occurred during data fetching', error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
    <Grid container spacing={2}>
      {/* First row */}
      <Grid item xs={12} md={4}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: '100%', marginBottom: '16px' }}
              label="Address"
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: '81%', marginBottom: '16px' }}
              label="State"
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: '100%', marginBottom: '16px' }}
              label="City"
              {...field}
            />
          )}
        />
      </Grid>

      {/* Second row */}
      <Grid item xs={12} md={4}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <FormControl
              id="outlined-basic"
              variant="outlined"
              style={{ width: '100%', marginBottom: '16px' }}
              error={!!errors.country}
            >
              <InputLabel>Country</InputLabel>
              <Select {...field}>
                {/* You may fetch and populate the country options dynamically */}
                <MenuItem value="India">India</MenuItem>
                {/* Add more country options as needed */}
              </Select>
              <FormHelperText>{errors.country?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name="pincode"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: '100%', marginBottom: '16px' }}
              label="Pincode"
              {...field}
              error={!!errors.pincode}
              helperText={errors.pincode?.message}
            />
          )}
        />
      </Grid>

      {/* Button */}
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  </form>
  );
};

export default Step2Form;
