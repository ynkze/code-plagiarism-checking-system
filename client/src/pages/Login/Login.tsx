import { Button } from "baseui/button";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "./commons";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/login",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
      );

      if (response.status !== 200) {
        throw "Email or password mismatch"
      }

      signIn({
        token: response.headers.get('Authorization')!,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { userid: values.userid },
      });

      props.setUser(formik.values.userid)
      navigate('/')
    } catch (err: any) {
      setError(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <h2>CPCS Login</h2>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="userid"
              value={formik.values.userid}
              onChange={formik.handleChange}
              placeholder="userid"
              clearOnEscape
              size="large"
              type="id"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="password"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="secondary" isLoading={formik.isSubmitting}>
              Login
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };