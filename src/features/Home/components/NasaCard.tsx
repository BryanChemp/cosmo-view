import { Dimensions, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { NasaItem } from "./NasaSlider";
import { useState } from "react";
import ArrowLeftIcon from "../../../assets/svgs/arrow-left.svg"

const { width, height } = Dimensions.get("window");

interface NasaCardProps {
    item: NasaItem;
}

export const NasaCard: React.FC<NasaCardProps> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar se o texto foi expandido

    // Função para alternar entre expandir e contrair o texto
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card>
            <ImagePreview source={{ uri: item.url }} />
            <Title>{item.title}</Title>
            <DescriptionContainer onPress={toggleDescription}>
                <Description>{isExpanded ? "" : item.explanation}</Description>
                <ShowMoreText>{isExpanded ? "" : "Show more"}</ShowMoreText>
                {isExpanded && (
                    <Modal transparent={true} animationType="slide">
                        <BackBtnContainer onPress={() => setIsExpanded(false)}>
                            <ArrowLeftIcon width={24} height={24} fill="white"/>
                        </BackBtnContainer>
                        <ContainerCompletedDescription>
                            <Scroll>
                                <FullDescription>{item.explanation}</FullDescription>
                            </Scroll>
                        </ContainerCompletedDescription>
                    </Modal>
                )}
            </DescriptionContainer>
        </Card>
    );
};

const Card = styled.View`
  width: ${width}px;
  height: ${height}px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  padding-top: 64px;
`;

const ImagePreview = styled.Image`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
`;

const Title = styled.Text`
  color: white;
  text-align: center;
  font-size: 20px;
  margin-top: 8px;
  font-weight: bold;
  width: 100%;
  padding: 8px;
`;

const BackBtnContainer = styled.TouchableOpacity`
    width: 48px;
    height: 48px;
    background-color: #ffffff73;
    border-radius: 32px;
    position: absolute;
    left: 32px;
    top: 64px;
    z-index: 100;
    justify-content: center;
    align-items: center;
`

const DescriptionContainer = styled.TouchableOpacity`
  width: 100%;
  max-height: 108px;
  padding: 10px;
  justify-content: center;
`;

const Description = styled.Text`
  color: white;
  text-align: center;
  font-size: 16px;
  width: 100%;
  height: 64px;
  overflow: hidden;
`;

const FullDescription = styled.Text`
  color: white;
  text-align: center;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
`;

const ShowMoreText = styled.Text`
  color: white;
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
  font-weight: bold;
  text-decoration-line: underline;
`;

const ContainerCompletedDescription = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 32px;
    background-color: rgba(0, 0, 0, 0.9);
`

const Scroll = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
}))`
    width: 100%;
    height: 100%;
`;
