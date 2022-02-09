import React from "react";
import styled from "styled-components";

const Header = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <LogoImg
          onClick={() => window.location.reload()}
          src='/perch_logo_alt.png'
          alt='fabric-logo'
        />
        {children}
      </Content>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  padding: 0 20px;
  background: #222529;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  padding: 20px 0;
  margin: 0 auto;
`;

const LogoImg = styled.img`
  cursor: pointer;
  width: 100px;

  @media screen and (max-width: 500px) {
    width: 125px;
  }

  :hover {
    opacity: 0.8;
  }
`;
