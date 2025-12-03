import Header from "../components/Header"
import styled from "@emotion/styled";

const Borad = styled.div`
  display: flex;
  width: 1098px;
  padding: 42px 41px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #B2B2B2;
  margin: 0px 130px;
`;

const Card = styled.div`
  width: 80px;
  height: 80px;
`;

function selectCard(){
  return(
    <Card></Card>
  )

}

export default function select() {
  return (
    <>
      <Header
        teamName="하람"
        isTeamName="true"
        isCredit="true"
        Credit="20,000"
      />
      <Borad>

      </Borad>
    </>
  )
}