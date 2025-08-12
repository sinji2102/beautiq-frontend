import { useCounterStore } from '../../stores/exampleStore';
import * as S from './BPage.styled';

const BPage = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <S.Container>
      <S.Title>Zustand Example</S.Title>
      <S.CounterText>Count: {count}</S.CounterText>
      <S.ButtonWrapper>
        <S.Button onClick={increment}>+</S.Button>
        <S.Button onClick={decrement}>-</S.Button>
        <S.Button onClick={reset}>Reset</S.Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default BPage;
