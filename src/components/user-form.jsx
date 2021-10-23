import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Row, Col } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import TextField from './fields/text';

const FormControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const validationSchema = Yup.object().shape({
  nick: Yup.string().required().trim(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null]),
  email: Yup.string().email().trim(),
}).required();

function UserForm({ initialValues, onSubmit }) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        nick: '',
        email: '',
        password: '',
        confirmPassword: '',
        ...initialValues,
      }}
      onSubmit={({ confirmPassword, ...values }) => onSubmit(values)}
    >
      {({ submitting }) => (
        <FormikForm noValidate>
          <Row>
            <Col xs={12} sm={6}>
              <TextField
                name="nick"
                label="Nick"
                disabled={submitting}
              />
            </Col>
            <Col xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                type="email"
                disabled={submitting}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <TextField
                name="password"
                label="Password"
                type="password"
                disabled={submitting}
              />
            </Col>
            <Col xs={12} sm={6}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                disabled={submitting}
              />
            </Col>
          </Row>

          <FormControls>
            <Button type="submit" variant="info">Submit</Button>
          </FormControls>
        </FormikForm>
      )}
    </Formik>
  );
}

UserForm.propTypes = {
  initialValues: PropTypes.shape({
    nick: PropTypes.string,
    email: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  initialValues: {},
};

export default UserForm;
