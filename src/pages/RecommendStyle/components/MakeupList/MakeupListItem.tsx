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
  return (
    <S.ItemCard>
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
