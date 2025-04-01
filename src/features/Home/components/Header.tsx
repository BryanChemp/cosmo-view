import styled from "styled-components/native"
import { DateButton } from "./DateButton"
import { Logo } from "./Logo"
import { GalleryButton } from "./GalleryButton"

interface HeaderProps {
    currentDate: string
}

export const Header: React.FC<HeaderProps> = ({
    currentDate
}) => {
    return (
        <HeaderContainer>
            <Logo/>
            <DateButton date={currentDate} />
            <GalleryButton/>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  z-index: 10;
  position: absolute;
  width: 100%;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.5);
`

