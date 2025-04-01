import styled from "styled-components/native"
import GalleryIcon from "../../../assets/svgs/img-gallery.svg";

export const GalleryButton: React.FC = () => {
    return (
        <GalleryButtonContainer>
            <GalleryIcon width={32} height={32} fill="white"/>
        </GalleryButtonContainer>
        
    )
}

const GalleryButtonContainer = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
`