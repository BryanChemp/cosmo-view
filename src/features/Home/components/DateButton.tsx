import styled from "styled-components/native"
import { formatDate } from "../../../shared/utils/formatters/formatDate"

interface DateButtonProps {
    date: string
}

export const DateButton: React.FC<DateButtonProps> = ({
    date
}) => {
    return (
        <DateContainer>
            <Date>
                {formatDate(date)}
            </Date>
        </DateContainer>
    )
}

const DateContainer = styled.TouchableOpacity`
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.34);
    border-radius: 16px;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 0px 64px;
`

const Date = styled.Text`
    color: white; 
    font-size: 16px;
    padding: 12px 16px;
`