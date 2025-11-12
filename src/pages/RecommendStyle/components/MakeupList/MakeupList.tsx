import * as S from "./MakeupList.styled";
import MakeupListItem from "./MakeupListItem";

interface MakeupListProps {
  makeUps: {
    makeUpId: number;
    imageName: string;
    imageUrl: string;
    keywords: string[];
    createdAt: string;
  }[];
}

const MakeupList = ({ makeUps }: MakeupListProps) => {
  return (
    <S.ListWrapper>
      {makeUps.map((item) => (
        <MakeupListItem key={item.makeUpId} item={item} />
      ))}
    </S.ListWrapper>
  );
};

export default MakeupList;
