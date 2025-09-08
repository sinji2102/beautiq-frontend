import Button from "@components/commons/button/Button";
import styled from "@emotion/styled";
import React from "react";

const ButtonTestPage = () => {
  return (
    <React.Fragment>
      <Container>
        <Button size="xlarge" onClick={() => alert("버튼 클릭!")}>
          테스트
        </Button>
        <Button size="large">테스트</Button>
        <Button size="medium">테스트</Button>
        <Button size="small">테스트</Button>
        <Button size="xsmall">테스트</Button>
      </Container>
      <Container>
        <Button size="xlarge" disabled>
          테스트
        </Button>
        <Button size="large" disabled>
          테스트
        </Button>
        <Button size="medium" disabled>
          테스트
        </Button>
        <Button size="small" disabled>
          테스트
        </Button>
        <Button size="xsmall" disabled>
          테스트
        </Button>
      </Container>
      <Container>
        <Button size="xlarge" variant="line">
          테스트
        </Button>
        <Button size="large" variant="line">
          테스트
        </Button>
        <Button size="medium" variant="line">
          테스트
        </Button>
        <Button size="small" variant="line">
          테스트
        </Button>
        <Button size="xsmall" variant="line">
          테스트
        </Button>
      </Container>
      <Container>
        <Button size="xlarge" variant="line" disabled>
          테스트
        </Button>
        <Button size="large" variant="line" disabled>
          테스트
        </Button>
        <Button size="medium" variant="line" disabled>
          테스트
        </Button>
        <Button size="small" variant="line" disabled>
          테스트
        </Button>
        <Button size="xsmall" variant="line" disabled>
          테스트
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default ButtonTestPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
