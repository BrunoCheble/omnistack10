import styled from 'styled-components/native';

export const SearchForm = styled.View`
position: absolute;
top: 20px;
left: 20px;
right: 20px;
z-index: 5;
flex-direction: row;
`;

export const SearchInput = styled.TextInput`
flex: 1;
height: 50px;
background-color: #fff;
color: #333;
border-radius: 25px;
padding: 0 20px;
font-size: 16px;
box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
elevation: 2;
`;

export const SearchBtn = styled.TouchableOpacity`
width: 50px;
height: 50px;
background-color: #8E4DFF;
border-radius: 25px;
justify-content: center;
align-items: center;
margin-left: 15px;
`;