import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import PostCard from "../components/PostCard";
import AddPostModal from "../components/AddPostModal";
import EmptyCardList from "../components/EmptyCardList";
import { metrics } from "../utils/metrics";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchCards } from "../utils/helpers";
import { setCards } from "../store/slices/CardSlice";
import { CardInterface } from "../types";

const HomeScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const cards = useSelector((state: RootState) => state.card.cards);
  const dispatch = useDispatch();

  const fetchCardPosts = async (): Promise<CardInterface[]> => {
    const response = await fetchCards();

    const mappedResponse: CardInterface[] = response.map((item: any) => ({
      id: item.id,
      userId: item.userId,
      message: item.message,
      image: item.image,
      imagePath: item.imagePath,
      likeUsers: item.likeUsers,
      comments: item.comments,
      createdAt: item.createdAt,
    }));

    return mappedResponse;
  };

  const getCard = async () => {
    const response = await fetchCardPosts();
    dispatch(setCards(response));
  };

  useEffect(() => {
    getCard();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard card={item} />}
        ListEmptyComponent={() => <EmptyCardList />}
        scrollEnabled={!!cards?.length}
      />

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.actionButtonText}>+</Text>
      </TouchableOpacity>

      <AddPostModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  actionButton: {
    position: "absolute",
    bottom: metrics.width * 0.05,
    right: metrics.width * 0.05,
    backgroundColor: "#3498db",
    width: metrics.width * 0.12,
    height: metrics.width * 0.12,
    borderRadius: metrics.width * 0.06,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 24,
  },
});

export default HomeScreen;
