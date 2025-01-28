import styled from "styled-components";

export const FormContainer = styled.div`
    margin-top: 20px;
    > form {
        display: flex;
        flex-direction: column;
        label{
            margin-bottom: 16px;
        }

        select, input {
            width: 100%;
            padding: 0.5rem;
            border-radius: 4px;
            color: ${({ theme }) => theme.COLORS.gray_800};
            border: 1px solid ${({ theme }) => theme.COLORS.gray_300};
            box-sizing: border-box;

            &:focus {
                outline: 2px solid ${({ theme }) => theme.COLORS.purple};
            }

            &:hover {
                border: 1px solid ${({ theme }) => theme.COLORS.purple};
            }

            cursor: pointer;
        }

        }
        p{
            margin-top: 20px;
        }
        span {
            color: red;
            font-size: 10px;
        }

        .inputButton{
            width: 20%;
            align-self: center;
            margin-top: 20px;
            margin-right: 30px;
            padding: 0.75rem;
            background-color: ${({ theme }) => theme.COLORS.blue_200};
            border: none;
            border-radius: 4px;
            color: aliceblue;
            cursor: pointer;
            &:hover {
                background-color: ${({ theme }) => theme.COLORS.blue_400};
            }
    }
`;

export const Forms = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.COLORS.blue_400};
    padding: 20px;
    width: 50%;
   
    @media(max-width: 760px) {
        width: 100%;

    }
`;

export const ContentContainer = styled.div`
    display: flex;
    gap: 10px;
    @media(max-width: 760px) {
            flex-direction: column;
        }
`


