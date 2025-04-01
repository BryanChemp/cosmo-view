import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Dimensions, FlatList, ViewToken } from "react-native";
import styled from "styled-components/native";
import { getNasaImage } from "../../../services/getNasaImage";
import { NasaCard } from "./NasaCard";
import { DateButton } from "./DateButton";
import { Header } from "./Header";

export interface NasaItem {
  date: string;
  url: string;
  hdurl: string;
  title: string;
  explanation: string;
  media_type: "image" | "video";
  copyright: string;
}

export const NasaSlider: React.FC = () => {
  const [items, setItems] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [loadedDates, setLoadedDates] = useState<Set<string>>(new Set());

  const flatListRef = useRef<FlatList<NasaItem>>(null);

  useEffect(() => {
    fetchInitialImages();
  }, []);

  const fetchInitialImages = async () => {
    const today = new Date();
    let tempItems: NasaItem[] = [];
    
    // Guardar as datas carregadas para evitar repetição
    let tempLoadedDates = new Set<string>();

    for (let i = 0; i < 7; i++) {
      const formattedDate = today.toISOString().split("T")[0];
      
      // Evita que datas já carregadas sejam novamente requisitadas
      if (tempLoadedDates.has(formattedDate)) continue;

      try {
        const item = await getNasaImage(formattedDate);
        if (item) {
          tempItems.push(item);
          tempLoadedDates.add(formattedDate);
        }
      } catch (error) {
        console.error(`Erro ao buscar item para ${formattedDate}:`, error);
      }

      today.setDate(today.getDate() - 1);
    }

    setItems(tempItems);
    setCurrentDate(tempItems[0]?.date || "");
    setLoadedDates(tempLoadedDates);
    setLoading(false);
  };

  const loadNextImage = async () => {
    try {
      const lastDate = items[items.length - 1]?.date;
      if (!lastDate) return;

      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() - 1);
      const formattedDate = nextDate.toISOString().split("T")[0];

      // Verifica se a data já foi carregada para evitar repetição
      if (loadedDates.has(formattedDate)) return;

      const newItem = await getNasaImage(formattedDate);
      if (newItem) {
        setItems((prevItems) => [...prevItems, newItem]);
        setLoadedDates((prevDates) => new Set(prevDates).add(formattedDate));
        setCurrentDate(formattedDate);
      }
    } catch (err) {
      console.error(`Error loading next image ${err}`);
    }
  };

  // Manter o controle do currentDate para melhorar a sincronização
  const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const newCurrentDate = viewableItems[0].item.date;
      if (newCurrentDate !== currentDate) {
        setCurrentDate(newCurrentDate);
      }
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Define o quanto do item precisa estar visível para ser considerado
  };

  if (loading) return <Loading size="large" color="white" />;

  return (
    <Container>
      <Header currentDate={currentDate} />
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <NasaCard item={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={loadNextImage}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 20 }}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Loading = styled.ActivityIndicator`
  padding-top: 64px;
`;
