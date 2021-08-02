import React, {useEffect} from "react";
import styled from "styled-components";
import jwtDecode from "jwt-decode";

import {Button, Form, FormControl, Input, Label} from "../moekit";

import wp1 from '../img/wallpaper1.png';
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../store";
import {setUser} from "../store/user";
import {AccessRefresh, Auth} from "../api/auth";

const OuterGrid = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  background-color: ${p => p.theme.colors.bodyD1};
`

const FormContainer = styled.div`
  margin: 0 auto;
  form {
    margin-top: 64px;
    width: 320px;
  }
`;

const SplashImage = styled.div`
  background: url(${wp1}) no-repeat center center fixed;
  background-size: cover;
`;

const H2 = styled.h2`
  color: #9f9e9e;
  font-size: 16px;
  margin-bottom: 16px;
`;

function processAccessRefresh(pair: AccessRefresh) {
  localStorage.setItem('accessToken', pair.access);
  localStorage.setItem('refreshToken', pair.refresh);
  new Auth().refreshOnTimer();
  return jwtDecode<any>(pair.access);
}

export function LoginView() {
  const { handleSubmit, register } = useForm();
  const [error, setError] = React.useState('');
  const dispatch = useAppDispatch();

  const auth = new Auth();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken !== null) {
      console.log('refresh exists');
      auth.refresh(refreshToken).then(data => {
        const decoded = processAccessRefresh(data)
        console.log(decoded);
        dispatch(setUser({ id: decoded.sub, name: decoded.name }));
      });
    }
  }, [])

  return (
    <OuterGrid>
      <FormContainer>
        <Form onSubmit={handleSubmit(async form => {
          try {
            const res = await auth.login(form.email, form.password);
            const decoded = processAccessRefresh(res)
            dispatch(setUser({ id: decoded.sub, name: decoded.name }));
          } catch (e) {
            console.log(e);
            setError(e.response?.data?.message || 'Unknown Error');
          }
        })}>
          <h1>Entering the Multitude</h1>
          <H2>Welcome back!</H2>
          <FormControl>
            <Label>Email</Label>
            <Input {...register('email')}/>
          </FormControl>
          <FormControl>
            <Label>Password</Label>
            <Input type="password" {...register('password')}/>
          </FormControl>
          <Button type="submit">Login</Button>
          {error && <div>{error}</div>}
        </Form>
      </FormContainer>
      <SplashImage/>
    </OuterGrid>
  )
}