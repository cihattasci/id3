import React, { useEffect, useState } from "react";
import {
  View,
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
import { colors } from "../utils/colors";
import FilterGroup from "../components/FilterGroup";

const HomeScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [sort, setSort] = useState<"createdAt" | "likeUsers">("createdAt");

  const cards = useSelector((state: RootState) => state.card.cards);
  const dispatch = useDispatch();

  const fetchCardPosts = async (): Promise<CardInterface[]> => {
    const response = await fetchCards(sort);

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
  }, [sort]);

  const handleSort = (type: "createdAt" | "likeUsers") => {
    setSort(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupContainer}>
        <FilterGroup handleSort={handleSort} sort={sort} />

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  groupContainer: {
    flex: 1,
    marginTop: metrics.navbarHeight,
  },
  actionButton: {
    position: "absolute",
    bottom: metrics.width * 0.05,
    right: metrics.width * 0.05,
    backgroundColor: colors.idBlue,
    width: metrics.width * 0.12,
    height: metrics.width * 0.12,
    borderRadius: metrics.width * 0.06,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 24,
  },
});

export default HomeScreen;
