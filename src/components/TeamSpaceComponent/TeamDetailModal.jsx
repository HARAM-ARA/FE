import React, { useState } from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import xImg from "../../assets/Frame.svg";
import Checkbox from "../Checkbox.jsx";
import Logo from "../../assets/HaramLogo.svg";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "710px",
    height: "600px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "24px",
    backgroundColor: "#fff",
    overflow: "auto",
    padding: "40px",
  },
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
    margin-top: 30px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const TeamTitle = styled.p`
    margin:0;
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 64px */
`;

const CloseButton = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
    margin-left:680px;
`;

const Description = styled.p`
  
  margin: 0px 0 24px 0px;
    color: #B2B2B2;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 32px */
`;

const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;
`;

const StudentRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
  border-radius: 12px;
  
  background: ${props => props.selected ? '#FFF2E4' : '#FFF'};
  cursor: pointer;
  transition: all 0.2s ease;
    border-radius: 12px;
    border: 1px solid #8B8B8B;

  &:hover {
    background: #FFF2E4;
    border-color: #F5D6BD;
  }
`;

const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const StudentText = styled.p`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  margin: 0;
`;

const AddStudentBox = styled.input`
  display: flex;
  width: 100%;
  padding: 18px 24px;
  border-radius: 12px;
  
  background: #FFF;
  box-sizing: border-box;
    
    border: 2px solid #B2B2B2;

  &::placeholder {
    color: #8B8B8B;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
  }

  &:focus {
    outline: none;
    border-color: #F07F23;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
  gap: 16px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteBtn = styled.button`
    display: flex;
    width: 184px;
    height: 55px;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 12px;
    border: 2px solid #B2B2B2;
    background-color: #fff;
    &:hover{
          border: 2px solid #B2B2B2;
      }
`;
const BtnText = styled.p`
    color: #646464;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

export default function TeamDetailModal({ isOpen, onClose, team, onDeleteStudents }) {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  if (!team) return null;

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
      setSelectAll(false);
    } else {
      setSelectedStudents(team.members.map(m => m.id));
      setSelectAll(true);
    }
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => {
      const newSelection = prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId];

      setSelectAll(newSelection.length === team.members.length);
      return newSelection;
    });
  };

  const handleRowClick = (studentId) => {
    handleStudentSelect(studentId);
  };

  const handleDeleteStudents = () => {
    if (selectedStudents.length > 0) {
      onDeleteStudents?.(selectedStudents);
      setSelectedStudents([]);
      setSelectAll(false);
    }
  };

  const handleClose = () => {
    setSelectedStudents([]);
    setSelectAll(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      shouldCloseOnOverlayClick={true}
    >
        <CloseButton src={xImg} onClick={handleClose} />
      <Header>

        <TitleRow>
            <img src={Logo}/>
          <TeamTitle>TEAM {team.name}</TeamTitle>
        </TitleRow>
        {selectedStudents.length > 0 && (
          <HeaderActions>
            <DeleteBtn
              onClick={handleDeleteStudents}
            ><BtnText>학생 삭제하기</BtnText></DeleteBtn>
          </HeaderActions>
        )}

      </Header>


      <Description>
        체크 박스를 눌러 학생을 팀에서 삭제할 수 있어요
      </Description>

      <StudentList>
        {team.members.map((student) => (
          <StudentRow
            key={student.id}
            selected={selectedStudents.includes(student.id)}
            onClick={() => handleRowClick(student.id)}
          >
            <CheckboxWrapper onClick={e => e.stopPropagation()}>
              <Checkbox
                checked={selectedStudents.includes(student.id)}
                onChange={() => handleStudentSelect(student.id)}
              />
            </CheckboxWrapper>
            <StudentInfo>
              <StudentText>{student.gradeClassNum} {student.name}</StudentText>
            </StudentInfo>
          </StudentRow>
        ))}
      </StudentList>

      <BottomSection>
        <AddStudentBox placeholder="학생 추가하기" />
      </BottomSection>
    </Modal>
  );
}
