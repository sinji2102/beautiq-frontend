import Button from "@components/commons/button/Button";
import * as S from "@pages/tracking/components/recommandButton/RecommandButton.styled";
import { useNavigate } from "react-router-dom";

const RecommandButton = () => {

    const navigate = useNavigate();

    const RecommandOnClick = () => {
        // 테스트 차원 에서 detail Page 추후 수정
        navigate("/Home");
    };

    return(
        <S.RecommandButtonWrapper>
            <Button size="xlarge" children="내 피부에 맞는 제품 추천 보기" onClick={RecommandOnClick}/>
        </S.RecommandButtonWrapper>
    )
}

export default RecommandButton;