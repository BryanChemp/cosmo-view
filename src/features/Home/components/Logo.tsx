import styled from "styled-components/native"

export const Logo: React.FC = () => {
    return (
        <LogoContainer>
            <LogoImage source={require("../../../assets/logo/logo-white.png")} />
        </LogoContainer>
    )
}

const LogoContainer = styled.TouchableOpacity`
  opacity: 0.5; 
`
const LogoImage = styled.Image`
  width: 44px;
  height: 44px;
  object-fit: contain;
`