import React from "react";
import styled from '@emotion/styled';

const Box = styled.div`
    width: 246px;
    height: 106px;
    display: flex;
    padding: 57px 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #8B8B8B;
    background-color:white;
  `;

  const InBox = styled.div`
   
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
    background-color:white;
  `;

export default function Card({children}){
  return (
    <>
      <Box>
        <InBox>
          {children}
        </InBox>
      </Box>

    </>
  )
}