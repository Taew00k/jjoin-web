import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-left: 5%;
  background-color: #EFEFEF;
  width: 90%;
`
const CONTENTS= styled.div`
  width: 95%;
  margin-left: 2%;
  height: 550px;
`;
const H2 = styled.h2`
  margin-left: 5%;
`;

const TITLE = styled.div`
  border-bottom : 2px solid black;
  display: flex;
`;

const DATE = styled.div`
  border-bottom : 2px solid black;
  a{
    position: relative;
    top: 13px;
    font-size: 16px;
    &:first-child{
      margin-right: 2%;
    }
  }
  height: 10%;
`;

const CONTENT = styled.table`
  min-height: 300px;
  a{
    position: relative;
    top: 13px;
  }
`
const BUTTONS = styled.div`
  display: flex;
  justify-content: flex-end;
  button{
    margin-left:1%;
    padding: 8px 25px; /* Increase size, adjust as needed */
    background-color: lightgrey; /* Change color */
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: darkgrey;
    }
  }
`
const Board = ({ id, title, contents, updateddata }) => {
    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/update/' + id);
    };

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`https://fe54c381-c22f-4101-b015-1d8ef0ec8ff9.mock.pstmn.io/notice/${id}`).then((res) => {
                alert('삭제되었습니다.');
                navigate('/notice');
            });
        }
    };

    const moveToList = () => {
        navigate('/notice');
    };

    return (<>
        <div>
            <H2>공지사항</H2>
            <CONTAINER>
                <CONTENTS>
                    <TITLE>
                        <h1>{title}</h1>
                    </TITLE>
                    <DATE>
                        <a>작성일</a>
                        <a>{updateddata}</a>
                    </DATE>
                    <CONTENT>
                        <a>
                            {contents}
                        </a>
                    </CONTENT>
                    <BUTTONS>
                        <button onClick={moveToUpdate}>수정</button>
                        <button onClick={deleteBoard}>삭제</button>
                        <button onClick={moveToList}>목록</button>
                    </BUTTONS>
                </CONTENTS>
            </CONTAINER>
        </div>
    </>);
};

export default Board;