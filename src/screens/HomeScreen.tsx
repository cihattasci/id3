import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import PostCard from "../components/PostCard";
import AddPostModal from "../components/AddPostModal";
import { metrics } from "../utils/metrics";

const HomeScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[0, 1, 2, 3]}
        renderItem={({ item }) => (
          <PostCard
            post={{
              id: 0,
              message: "random message",
              image: "https://via.placeholder.com/150",
              likes: 0,
            }}
            onLikePress={() => {}}
            onCommentPress={() => {}}
            onDeletePress={() => {}}
          />
        )}
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
    bottom: metrics.height * 0.05,
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
