import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHashtag, faCog, faTimes} from "@fortawesome/free-solid-svg-icons";

import {useAppDispatch, useAppSelector} from "../../store";
import {switchTab} from "../../store/channel";

const TabbedContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content;
  height: 100%;
  position: relative;
`;

const Tabs = styled.div`
  background-color: #26282d;
  height: 30px;
`

const CloseButton = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  border-radius: 4px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  width: 20px;
  height: 20px;
`;

const Tab = styled.div<{ active?: boolean }>`
  cursor: pointer;
  user-select: none;
  display: inline-block;
  width: 160px;
  height: 100%;
  padding: 6px 8px;
  position: relative;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${p => p.active ? p.theme.colors.bodyD1 : '#26282D'};

  .main-icon {
    margin-right: 4px;
    color: ${p => p.theme.colors.primary};
  }
  
  ${CloseButton} {
    visibility: ${p => p.active ? 'visible' : 'hidden'};
  }

  .close {
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.3);
  }
`;

interface TabElement {
  name: string;
  id: string;
  component: () => React.ReactElement;
}

interface TabGridProps {
  tabs: TabElement[];
}

console.log();

// Provides a tabbed container that renders whatever chat tab is selected.
export const TabGrid: React.FC<TabGridProps> = (props) => {
  const currentChan = useAppSelector(x => x.channel.tabIndex);
  const dispatch = useAppDispatch();

  const f = props.tabs[currentChan];
  return (
    <TabbedContainer>
      <Tabs>
        {props.tabs.map((tab, idx) =>
          <Tab active={f?.name === tab.name} key={tab.id}
            onClick={() => { dispatch(switchTab(idx)) }}>
            <FontAwesomeIcon className='main-icon' icon={faHashtag} fixedWidth/>
            {tab.name}
            <CloseButton>
              <FontAwesomeIcon icon={faTimes} fixedWidth/>
            </CloseButton>
          </Tab>
        )}
      </Tabs>
      {f === undefined ? null : f.component()}
    </TabbedContainer>
  );
}