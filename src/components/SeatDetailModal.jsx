import styled from "@emotion/styled";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 16px;
    padding: 32px;
    width: 400px;
    max-width: 90vw;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const Title = styled.h2`
    color: #1D1D1D;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    
    &:hover {
        color: #333;
    }
`;

const SeatInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #F0F0F0;
    
    &:last-child {
        border-bottom: none;
    }
`;

const Label = styled.span`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    color: #666;
`;

const Value = styled.span`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    color: #333;
`;

const TeamBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 20px;
    border: 2px solid ${props => props.borderColor || '#F07F23'};
    background: ${props => props.backgroundColor || '#FFF2E4'};
    font-size: 14px;
    font-weight: 600;
`;

const ColorDot = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.color || '#F07F23'};
`;

const StudentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 300px;
    overflow-y: auto;
`;

const StudentItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    background: #F8F9FA;
`;

const StudentInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const StudentNameText = styled.span`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

const StudentIdText = styled.span`
    font-family: Pretendard;
    font-size: 14px;
    color: #666;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: #999;
    font-family: Pretendard;
    font-size: 16px;
`;

export default function SeatDetailModal({ 
    isOpen, 
    onClose, 
    seatData
}) {
    if (!isOpen || !seatData) return null;

    const { seatNumber, teamId, students = [], teamColor, teamName } = seatData;
    
    // 빈 좌석인 경우
    if (!teamId || students.length === 0) {
        return (
            <ModalOverlay onClick={onClose}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <ModalHeader>
                        <Title>좌석 {seatNumber}</Title>
                        <CloseButton onClick={onClose}>×</CloseButton>
                    </ModalHeader>
                    <EmptyState>
                        이 좌석에는 팀이 배정되지 않았습니다.
                    </EmptyState>
                </ModalContent>
            </ModalOverlay>
        );
    }

    const displayTeamName = teamName || `팀 ${teamId}`;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title>좌석 {seatNumber} - {displayTeamName}</Title>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>

                <SeatInfo>
                    <InfoRow>
                        <Label>팀 정보</Label>
                        <TeamBadge 
                            borderColor={teamColor?.border} 
                            backgroundColor={teamColor?.background}
                        >
                            <ColorDot color={teamColor?.border} />
                            {displayTeamName}
                        </TeamBadge>
                    </InfoRow>
                    
                    <InfoRow>
                        <Label>팀원 수</Label>
                        <Value>{students.length}명</Value>
                    </InfoRow>

                    <div style={{ marginTop: '16px' }}>
                        <Label>팀원 목록</Label>
                        <StudentList>
                            {students.map((student) => (
                                <StudentItem key={student.id || student.userId}>
                                    <StudentInfo>
                                        <StudentNameText>{student.name}</StudentNameText>
                                        <StudentIdText>학번: {student.userId}</StudentIdText>
                                    </StudentInfo>
                                </StudentItem>
                            ))}
                        </StudentList>
                    </div>
                </SeatInfo>
            </ModalContent>
        </ModalOverlay>
    );
}