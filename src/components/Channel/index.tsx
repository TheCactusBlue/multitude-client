import React from "react";
import styled from 'styled-components';

const ChannelContainer = styled.div`
  background-color: ${p => p.theme.colors.bodyD1};
`;

export function Channel() {
  return (
    <ChannelContainer>
      test
    </ChannelContainer>
  );
}