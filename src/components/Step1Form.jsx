import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Grid } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { API_SUBMIT_URL } from '../redux/apiConfig';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  age: yup.number().positive('Age must be a positive integer').required('Age is required'),
  sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: yup.string().required('Mobile is required').matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  govtIdType: yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid government ID type'),
  govtId: yup.string().when('govtIdType', {
    is: 'Aadhar',
    then: yup.string().required('Aadhar ID is required'),
    otherwise: yup.string().required('PAN ID is required'),
  }),
  
});

const Step1Form = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    try {
      const response = await fetch(API_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('User data submitted successfully');
        navigate('/Step2Form');
      } else {
        console.error('Failed to submit user data');
      }
    } catch (error) {
      console.error('An error occurred during form submission', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <InputLabel ><h1>Personal Details</h1></InputLabel>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField id="outlined-basic" variant="outlined" style={{ width: '60%', marginBottom: '16px' }}  label="Name" {...field} error={!!errors.name} helperText={errors.name?.message} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField id="outlined-basic" variant="outlined" style={{ width: '60%', marginBottom: '16px' }}  label="Age" type="number" {...field} error={!!errors.age} helperText={errors.age?.message} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
      <InputLabel>Sex</InputLabel>
        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <FormControl id="outlined-basic" variant="outlined" style={{ width: '60%', marginBottom: '16px' }} error={!!errors.sex}>
            
              <Select {...field}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              <FormHelperText>{errors.sex?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField id="outlined-basic" variant="outlined" style={{ width: '60%', marginBottom: '16px' }} label="Mobile" {...field} error={!!errors.mobile} helperText={errors.mobile?.message} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
      
      <Controller 
  name="govtIdType"
  control={control}
  render={({ field }) => (
    <FormControl id="outlined-basic" variant="outlined" style={{ width: '80%', marginBottom: '16px' }} 
    >
      <InputLabel>Government ID Type</InputLabel>
      <Select {...field}>
        <MenuItem value="Aadhar">Aadhar</MenuItem>
        <MenuItem value="PAN">PAN</MenuItem>
      </Select>
    </FormControl>
  )}
/>
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name="govtId"
          control={control}
          render={({ field }) => (
            <TextField
            id="outlined-basic" variant="outlined" style={{ width: '80%', marginBottom: '16px' }} 

              label="GovID"
             
              {...field}
              error={!!errors.govtId}
              helperText={errors.govtId?.message}
            />
          )}
        />
      </Grid>
    </Grid>

    <Button type="submit" variant="contained" color="primary">
      Next
    </Button>
  </form>
  );
};

export default Step1Form;
