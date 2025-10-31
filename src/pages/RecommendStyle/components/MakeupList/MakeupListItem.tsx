import { useNavigate } from "react-router-dom";

import * as S from "./MakeupList.styled";

interface MakeupListItemProps {
  item: {
    makeUpId: number;
    imageName: string;
    imageUrl: string;
    keywords: string[];
  };
}

const MakeupListItem = ({ item }: MakeupListItemProps) => {
  const navigate = useNavigate();

  const handleClickCard = (makeUpId: number) => {
    // TODO : 페이지 생성 시 연결
    navigate(`/my/recommend-style/${makeUpId}`);
  };

  return (
    <S.ItemCard onClick={() => handleClickCard(item.makeUpId)}>
      <S.ImageName title={item.imageName}>{item.imageName}</S.ImageName>
      <S.KeywordContainer>
        {item.keywords.map((k, idx) => (
          <S.Keyword key={idx}>{k}</S.Keyword>
        ))}
      </S.KeywordContainer>
    </S.ItemCard>
  );
};

export default MakeupListItem;
