import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form';
import PostCard from '../components/PostCard';
// import ImagePicker from 'react-native-image-picker';

interface HomeScreenProps {
  onSubmit: SubmitHandler<FieldValues>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({onSubmit}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.uri) {
    //     setSelectedImage(response.uri);
    //     setValue('image', response);
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Mesaj:</Text>
        <TextInput
          style={styles.input}
          multiline
          onChangeText={text => setValue('message', text)}
        />
        {errors.message && <Text style={styles.error}>Bu alan zorunludur</Text>}
      </View>

      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={handleImagePicker}>
        <Text>Resim Seç</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image
          source={{uri: selectedImage}}
          style={styles.selectedImage}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Paylaş</Text>
      </TouchableOpacity>

      <FlatList
        data={[0, 1, 2, 3]}
        renderItem={({item}) => (
          <PostCard
            post={{
              id: 0,
              message: 'random message',
              image: 'https://via.placeholder.com/150',
              likes: 0,
            }}
            onLikePress={() => {}}
            onCommentPress={() => {}}
            onDeletePress={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  imagePickerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    flex: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
