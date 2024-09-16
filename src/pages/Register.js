import React, {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';
import {Formik} from "formik";
import {authSchema, signUpSchema} from "../types/formSchema";
import {ConfigProvider, Radio, Spin} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {set} from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { register } from '../redux/actions/app.action';

function Register() {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const [gender, setGender] = useState();
  const handleLogin = (value) => {
    dispatch(register(value)).then(res => {
      if (res.type == 'auth/register/fulfilled') {
        toast.success('Register success')
      }
    });
  }

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center vh-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
              <h2 className="fw-bold mb-2 text-center pt-5">Đăng ký</h2>
              <Formik
                initialValues={{email: '', username: '', password: ''}}
                validationSchema={signUpSchema}
                onSubmit={(value) => handleLogin(value)}
              >
                {({values, touched, errors, handleBlur, handleChange, handleSubmit, isValid, setFieldTouched}) => (
                  <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                    <div className='mb-4'>
                      <MDBInput
                        wrapperClass='mb-1 w-100' label='Email' id='email' type='text' size="lg"
                        onFocus={() => {
                          setFieldTouched('email')
                        }}
                        onBlur={() => setFieldTouched('email')}
                        value={values.email}
                        onChange={handleChange('email')}
                      />
                      {errors.email && <div className='text-danger' style={{fontSize: 12}}>
                        {errors.email}
                      </div>}
                    </div>
                    <div className='mb-4'>
                      <MDBInput
                        wrapperClass='mb-1 w-100' label='Họ tên' id='username' type='text' size="lg"
                        onFocus={() => {
                          setFieldTouched('username')
                        }}
                        onBlur={() => setFieldTouched('username')}
                        value={values.username}
                        onChange={handleChange('username')}
                      />
                      {errors.username && <div className='text-danger' style={{fontSize: 12}}>
                        {errors.username}
                      </div>}
                    </div>
                    <div className='mb-4'>
                      <MDBInput
                        wrapperClass='mb-1 w-100' label='Mật khẩu' id='password' type='password' size="lg"
                        onFocus={() => {
                          setFieldTouched('password')
                        }}
                        onBlur={() => setFieldTouched('password')}
                        value={values.password}
                        onChange={handleChange('password')}
                      />
                      {errors.password && <div className='text-danger' style={{fontSize: 12}}>
                        {errors.password}
                      </div>}
                    </div>
                    {/* {message && <div className='pb-1 text-sm' style={{color: 'red'}}> *{message} </div>} */}
                    <ConfigProvider
                      theme={{
                        token: {
                          fontSize: 14,
                          colorPrimary: "#fff"
                        },
                      }}
                    >
                      <MDBBtn
                        className='mt-3'
                        size='lg'
                        onClick={() => {
                          isValid && handleSubmit()
                        }}
                        type={"submit"}
                      >
                        {/* {!isLoading ? 'Đăng ký' : <Spin/>} */}
                        Register
                      </MDBBtn>
                      <div className='mt-2'>
                        You already have account?
                        <Link to={'/auth/login'}>Sign in</Link>
                      </div>
                    </ConfigProvider>
                  </MDBCardBody>
                )}
              </Formik>
            </MDBCard>
          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </div>
  );
}

export default Register;