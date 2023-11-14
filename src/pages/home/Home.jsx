import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import {useRecoilState} from 'recoil';
import { clubListState } from '../../state';

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`
const CLICK = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    font-weight: bold;
    text-decoration: underline;
    background-color: lightblue;
}
  display: inline-block;
  text-align: center;
  font-size: 20px;
  width: 500px;
  line-height: 50px;
  height: 50px;
  padding: 10px 20px;
  justify-content: center;
  border: 1px solid black;
  border-radius: 25px;
  background-color: #f8f9fa;
  color: #343a40;
`;
function MainPage(){
    const [clubList, setClubList] = useRecoilState(clubListState);
    const baseUrl="https://7f43ee63-b0b8-4e87-9c96-a7c2c01a39f5.mock.pstmn.io";

    const getClubList = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/manager`);
            if(resp && resp.data) {
                setClubList(resp.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    useEffect(() => {
        getClubList();
    }, []);

    return(
        <div>
            <H2>동아리 관리</H2>
            <CLICK>
                {clubList&&clubList.map((club) => (
                    <div key={club.id}>
                        <div>
                            <StyledLink to={`/manager/club/${club.id}/users`}>
                                {club.name}
                            </StyledLink>
                        </div>
                    </div>
                ))}
            </CLICK>
        </div>
    );
}

export default MainPage;