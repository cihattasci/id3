import auth from "@react-native-firebase/auth";

const loginUser = async (username: string, password: string) => {
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

export default loginUser;
