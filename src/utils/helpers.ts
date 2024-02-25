import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

export const loginUser = async (username: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      username,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async (setIsLoggedIn: (value: boolean) => void) => {
  try {
    await auth().signOut();
    setIsLoggedIn(false);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => auth().currentUser;

export const fetchCards = async () => {
  const cards = await firestore()
    .collection("cards")
    .orderBy("createdAt", "desc")
    .get();
  return cards.docs.map((card) => ({ ...card.data() }));
};

export const getUserId = async () => {
  return getCurrentUser()?.uid || "";
};

const getDocument = async (id: string) => {
  const querySnapshot = await firestore()
    .collection("cards")
    .where("id", "==", id)
    .get();
  const doc = querySnapshot.docs[0];

  return doc;
};

export const uploadToStorage = async (imagePath: string) => {
  const reference = storage().ref(
    `images/${await getUserId()}/${imagePath.split("/").pop()}`
  );
  await reference.putFile(imagePath);

  return {
    url: await reference.getDownloadURL(),
    name: reference.fullPath.split("/").pop(),
  };
};

export const addCardToCloud = async (
  message: string,
  image: { url: string; name: string }
) => {
  const userId = await getUserId();

  let cardItem = {
    id: Math.random().toString(),
    userId: userId!,
    message,
    image: image?.url,
    imagePath: image?.name,
    likeUsers: [],
    comments: [],
    createdAt: firestore.Timestamp.now(),
  };

  await firestore().collection("cards").add(cardItem);

  return cardItem;
};

export const deletePostFromCloud = async (id: string) => {
  const doc = await getDocument(id);

  await firestore().collection("cards").doc(doc.id).delete();
  await storage()
    .ref(`images/${await getUserId()}/${doc.data().imagePath}`)
    .delete();
};

export const likeCardPost = async (
  type: boolean,
  id: string,
  userId: string
) => {
  if (type) {
    const doc = await getDocument(id);

    await firestore()
      .collection("cards")
      .doc(doc.id)
      .update({
        likeUsers: firestore.FieldValue.arrayUnion(userId),
      });
  } else {
    const doc = await getDocument(id);

    await firestore()
      .collection("cards")
      .doc(doc.id)
      .update({
        likeUsers: firestore.FieldValue.arrayRemove(userId),
      });
  }
};

export const addCommentToCard = async (
  id: string,
  message: string,
  commentId: string
) => {
  const userId = await getUserId();
  const createdAt = firestore.Timestamp.now();

  const doc = await getDocument(id);

  await firestore()
    .collection("cards")
    .doc(doc.id)
    .update({
      comments: firestore.FieldValue.arrayUnion({
        id: commentId,
        message,
        userId,
        createdAt,
      }),
    });
};
