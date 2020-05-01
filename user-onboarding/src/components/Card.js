import React from "react";
import styled from "styled-components";
// import Form from "./Form";


const MemberContainer = styled.div`
background: #228656;
display: flex;
flex-direction: row;
justify-content: space-evenly;
border-radius: 20px;
`;

const TeamList = styled.div`
background: black;
border: 2px solid grey;
width: 200px;
display: flex;
flex-direction: column;
margin: 0;
justify-content: center;
font-family: 'Neucha', cursive;
border-radius: 8px;
`;

const Name = styled.h2 `
color: Blue;
`;

const Email = styled.p`
color: green;
`;

const Role = styled.p`
color: yellow;
`;
const Bio = styled.p`
color: orange;
`;
const Terms = styled.p`
color: silver;
`;
const Pass = styled.p`
color: red;
`;

const Team = ({user}) => {
console.log()
  return (
      <div>
      {user ? <MemberContainer>
        {user.map(use => (
          <TeamList>
            <Name>{use.username}</Name>
            <Email>{use.email}</Email>
            <Role>{use.role}</Role>
            <Pass>{use.password}</Pass>
            <Bio>{use.bio}</Bio>
            <Role>{use.role}</Role>
            <Terms>{use.terms}</Terms>
          </TeamList>
        ))}
      </MemberContainer>
      : <div />
    }
    </div>

  );
};

export default Team;