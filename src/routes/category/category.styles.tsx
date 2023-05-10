import styled from "styled-components";

export const CategoryRootContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const CategoryTitle = styled.span`
  font-size: 28px;
  margin-bottom: 25px;
`

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`
