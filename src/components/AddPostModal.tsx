import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Controller,
} from "react-hook-form";
import { metrics } from "../utils/metrics";
import { addCardToCloud, uploadToStorage } from "../utils/helpers";
import { colors } from "../utils/colors";
import { addCard } from "../store/slices/CardSlice";

interface AddModalProps {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const AddPostModal: React.FC<AddModalProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = () => {
    if (!!selectedImage) {
      setSelectedImage(null);
    } else {
      ImagePicker.openPicker({
        multiple: false,
      })
        .then(async (pickerImage) => {
          setSelectedImage(pickerImage.path);
        })
        .catch((error) => {
          Alert.alert("Error", "Error while selecting image");
          setSelectedImage(null);
        });
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      let imageData: {
        url: string;
        name: string;
      } = {
        url: "",
        name: "",
      };

      if (selectedImage) {
        const result = await uploadToStorage(selectedImage);
        imageData = {
          url: result.url,
          name: result.name || "",
        };
      }

      const cardItem = await addCardToCloud(data.message, imageData);
      dispatch(addCard(cardItem));

      setModalVisible(false);
      setValue("message", "");
      setSelectedImage(null);
    } catch (error) {
      Alert.alert("Error uploading post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <View style={styles.topGroup}>
              <Text style={styles.titleMessage}>Message:</Text>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={handleImagePicker}
                disabled={loading}
              >
                {!selectedImage ? (
                  <Text style={styles.titleSelectPhoto}>Select photo</Text>
                ) : (
                  <Text style={styles.titleUnselectPhoto}>
                    Remove selected photo
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  value={field.value}
                  placeholder="Type your message here..."
                  placeholderTextColor={"gray"}
                  multiline
                  editable={!loading}
                  onChangeText={(text) =>
                    setValue("message", text, { shouldValidate: true })
                  }
                />
              )}
              name="message"
              rules={{ required: "Message is required" }}
            />
            {errors.message && (
              <Text style={styles.error}>This field required</Text>
            )}
          </View>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
              resizeMode="cover"
            />
          )}

          {!loading ? (
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.submitButtonText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator size="large" color={colors.black} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleMessage: {
    fontSize: 14,
    fontWeight: "bold",
  },
  titleSelectPhoto: {
    fontSize: 14,
    fontWeight: "bold",
  },
  titleUnselectPhoto: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
  topGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: metrics.height * 0.1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  error: {
    color: "red",
  },
  imagePickerButton: {
    borderRadius: 5,
    alignItems: "center",
  },
  selectedImage: {
    width: metrics.width * 0.9,
    height: metrics.height * 0.2,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderColor: "gray",
  },
  modalContent: {
    backgroundColor: colors.white,
    maxHeight: metrics.height,
    width: metrics.width,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 0.5,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderColor: "gray",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  closeButton: {
    flex: 1,
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  },
});

export default AddPostModal;
