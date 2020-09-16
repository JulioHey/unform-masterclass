import React, {useEffect, useRef} from 'react';
import {Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/input';

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, {reset}) {
    try {
      const schema=Yup.object().shape({
        name:Yup.string().required("O nome é obrigatório."),
        email: Yup.string().required("Email obrigatório").email("Digite um email válido"),
        address: Yup.object().shape({
          city: Yup.string().min(3, 'No mínimo 3 caracteres').required("A cidade é obrigatória.")
        })
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
      formRef.current.setErrors({});
      reset();
    } catch(error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'julio',
        email: 'diego@gas.br',
        address: {
          city: "SJC"
        }
      })
    }, 1000);
  }, [])

  return (
    <div className="App">
      <h1>Hello world</h1>

      <Form ref={formRef} onSubmit={handleSubmit} >
        <Input name="email" />
        <Input name="name" />
        <Input type='password' name="password" />

        <Scope path="address">
          <Input name="state" />
          <Input name="city" />
          <Input name="neighborhood" />
          <Input name="street" />
          <Input name="number" />
        </Scope>

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;
