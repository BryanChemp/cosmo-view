import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import { getNasaImage } from "../../../services/getNasaImage";

const { width, height } = Dimensions.get("window");

export const NasaSlider: React.FC = () => {
  const [images, setImages] = useState<{ date: string; imageUrl: string; explanation: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    fetchInitialImages();
  }, []);

  // Função para carregar as imagens iniciais
  const fetchInitialImages = async () => {
    const today = new Date();
    let tempImages = [];

    // Vai carregando imagens dos últimos 7 dias (começando de hoje)
    for (let i = 0; i < 7; i++) {
      const formattedDate = today.toISOString().split("T")[0];
      const image = await getNasaImage(formattedDate);
      if (image) tempImages.push(image);
      today.setDate(today.getDate() - 1); // Regredindo para o dia anterior
    }

    setImages(tempImages);
    setCurrentDate(tempImages[tempImages.length - 1]?.date || "");
    setLoading(false);
  };

  // Função para carregar a próxima imagem
  const loadNextImage = async () => {
    try {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() - 1); // Vai regredir para o dia anterior
      const formattedDate = nextDate.toISOString().split("T")[0];

      console.log("Data formatada:", formattedDate); 
      const newImage = await getNasaImage(formattedDate);
      if (newImage) {
        setImages([...images, newImage]);
        setCurrentDate(formattedDate); // Atualiza a data atual
      }
    } catch (err) {
      console.error(`Error loading next image ${err}`);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <Container>
      <FlatList
        data={images}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Card>
            <ImagePreview
              source={{ uri: item.imageUrl }}
            />
            <Description>
              {item.explanation}
            </Description>
          </Card>
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={loadNextImage} // Chama a função para carregar mais imagens quando o final for atingido
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Card = styled.View`
  width: ${width}px;
  height: ${height}px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ImagePreview = styled.Image`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
`;

const Description = styled.Text`
  color: white;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  height: 100px;
`;
