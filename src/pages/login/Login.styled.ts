import styled from "@emotion/styled";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 8rem;
  padding: 0 2.4rem;
`;

export const GoogleButton = styled.button`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.8rem;

  color: #333;
  font-weight: 500;
  font-size: 1.5rem;

  background-color: #fff;
  border: 0.1rem solid #d9d9d9;
  border-radius: 0.8rem;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

export const KakaoButton = styled(GoogleButton)`
  color: #000;

  background-color: #fee500;
  border: none;

  img {
    width: 2rem;
    height: 2rem;
  }
`;
