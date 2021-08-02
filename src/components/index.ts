import styled from "styled-components";

export const TitleBarBox = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
`

export const TitleBar = styled.div`
  background-color: #1b1d1f;
  height: 20px;
  width: 100%;
  -webkit-app-region: drag;
  padding-left: 4px;
  font-weight: bold;
`;