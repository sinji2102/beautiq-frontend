import { useModalStore } from "@stores/modalStore";

/**
 * modalOpen props
 * @param {"alert" | "confirm" | "custom"} props.type - (필수) 모달의 종류 지정
 * @param {string} props.title - (필수) 모달의 제목으로 표시될 문자열
 * @param {string} [props.comment] - 모달의 제목 아래에 표시될 설명 문자열 (선택 사항)
 * @param {"primary" | "line"} [props.variant] - 모달 내부 버튼의 스타일입니다. (선택 사항, 기본값: 'primary')
 * @param {React.ReactNode} [props.children] - type이 'custom'일 때 모달 내부에 렌더링할 리액트 컴포넌트
 * @param {string} [props.okText] - 확인 버튼에 표시될 텍스트 (기본값: '확인')
 * @param {() => void} [props.okCallback] - 확인 버튼을 클릭했을 때 실행될 함수
 * @param {string} [props.noText] - 취소 버튼에 표시될 텍스트 (기본값: '취소')
 * @param {() => void} [props.noCallback] - 취소 버튼을 클릭했을 때 실행될 함수
 * @param {boolean} [props.closeOutside=false] - 모달 바깥 영역을 클릭했을 때 모달을 닫을지 여부
 */
export const useModal = () => {
  const modalOpen = useModalStore((state) => state.openModal);
  const modalClose = useModalStore((state) => state.closeModal);

  return { modalOpen, modalClose };
};
