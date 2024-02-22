import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface PostCardProps {
  post: {
    id: number;
    message: string;
    image?: string;
    likes: number;
    // diğer post özellikleri
  };
  onLikePress: (postId: number) => void;
  onCommentPress: (postId: number) => void;
  onDeletePress: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLikePress, onCommentPress, onDeletePress }) => {
  return (
    <View style={styles.card}>
      {post.image && <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />}
      <Text style={styles.message}>{post.message}</Text>

      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => onLikePress(post.id)}>
            <Text style={styles.actionButton}>Beğen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onCommentPress(post.id)}>
            <Text style={styles.actionButton}>Yorum Yap</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onDeletePress(post.id)}>
          <Text style={styles.deleteButton}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  actionButton: {
    color: '#3498db',
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default PostCard;
