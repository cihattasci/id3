import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useDispatch } from "react-redux";
import { metrics } from "../utils/metrics";
import { PostCardProps } from "../types";
import {
  addCommentToCard,
  likeCardPost,
  deletePostFromCloud,
  getUserId,
} from "../utils/helpers";
import { addComment, deleteCard, likeCard } from "../store/slices/CardSlice";
import Loading from "./Loading";
import { colors } from "../utils/colors";

const PostCard: React.FC<PostCardProps> = ({ card }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [focused, setFocused] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    isLiked();
    isPostOwner();
  }, []);

  const isLiked = async () => {
    const userId = await getUserId();
    setLiked(card.likeUsers.includes(userId));
  };

  const isPostOwner = async () => {
    const userId = await getUserId();
    setIsOwner(card.userId === userId);
  };

  const likeCardItem = async (type: boolean, id: string) => {
    const userId = await getUserId();
    await likeCardPost(type, id, userId);
    dispatch(likeCard({ type, id, userId }));
    setLiked(!liked);
  };

  const deleteCardPost = async (id: string) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          setLoading(true);
          await deletePostFromCloud(id);
          dispatch(deleteCard(id));
          setLoading(false);
        },
      },
    ]);
  };

  const addCommentToCloud = async () => {
    setLoading(true);
    const commentId = Math.random().toString();

    if (comment.trim() === "") {
      Alert.alert("Error", "Comment cannot be empty");
      return;
    }

    await addCommentToCard(card.id, comment, commentId);
    dispatch(
      addComment({
        id: card.id,
        commentId,
        userId: await getUserId(),
        message: comment,
        createdAt: firestore.Timestamp.now(),
      })
    );
    setComment("");
    setFocused(false);
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <View style={styles.card}>
        {!!card?.image && (
          <Image
            source={{ uri: card.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={styles.message}>{card.message}</Text>

        <View style={styles.actionsContainer}>
          <View style={styles.leftActions}>
            <TouchableOpacity
              onPress={async () => likeCardItem(liked ? false : true, card.id)}
            >
              <Text style={styles.actionButton}>
                {liked ? "Unlike" : "Like"} {card.likeUsers.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFocused(!focused)}>
              <Text style={styles.actionButton}>
                Comment {card.comments.length}
              </Text>
            </TouchableOpacity>
          </View>
          {isOwner && (
            <TouchableOpacity onPress={() => deleteCardPost(card.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>

        {focused && (
          <View>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity onPress={addCommentToCloud}>
              <Text style={styles.actionButton}>Add Comment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={card.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.cardComment}>
            <Text key={index}>{item.message}</Text>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 10,
    marginTop: 10,
  },
  cardComment: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    marginLeft: metrics.width * 0.2,
    marginTop: 5,
  },
  image: {
    width: metrics.width * 0.9,
    height: metrics.height * 0.25,
    borderRadius: 8,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  actionButton: {
    color: colors.idBlue,
    fontWeight: "bold",
    marginRight: 10,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
  commentInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingLeft: 10,
  },
});

export default PostCard;
