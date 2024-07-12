import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-50);
`;

export const Login = styled.div`
  background-color: var(--neutral);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 15px;
  width: 500px;
  height: auto;
  padding: 32px;
  box-shadow: 6px 8px 20px #bbb;
  img {
    width: 80px;
  }
  h1 {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
  }
  p {
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: var(--tertiary);
    :last-child {
      padding-bottom: 32px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  text-align: left;
`;

export const LinkStyled = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 20px;
  span {
    font-size: 12px;
    font-weight: 400;
    color: var(--tertiary);
  }
  a {
    font-size: 12px;
    font-weight: 600;
    color: var(--primary-500);
  }
`;

export const RegisterStyled = styled(Login)`
  text-align: left;
  justify-content: start;
  align-items: start;
  p {
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: var(--tertiary);
    :last-child {
      padding-bottom: 16px;
    }
  }
`;

export const FormRegister = styled(Form)`
  width: 100%;
`;

export const LinkRegister = styled(LinkStyled)`
  width: 100%;
  justify-content: center;
`;
