import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { metrics } from "../utils/metrics";
import ImagePicker from "react-native-image-crop-picker";

interface AddModalProps {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const AddPostModal: React.FC<AddModalProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const handleImagePicker = () => {
    if (!!selectedImage) {
      setSelectedImage(null);
    } else {
      ImagePicker.openPicker({
        multiple: false,
      }).then(async (pickerImage) => {
        setSelectedImage(pickerImage.path);
        // const task = reference
        //   .child('profileImage.png')
        //   .putFile(pickerImage.path);
        // task.on('state_changed', taskSnapshot => {
        //   let rate = (
        //     (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        //     100
        //   ).toFixed(2);
        //   setUploadRate(parseInt(rate));
        // });
        // task.then(async () => {
        //   const url = await reference.child('profileImage.png').getDownloadURL();
        //   setUrl(url);
        //   setLoading(false);
        //   setUploadRate(0);
        // });
      });
    }
  };
  return (
    <Modal visible={isModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <View style={styles.topGroup}>
              <Text style={styles.titleMessage}>Mesaj:</Text>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={handleImagePicker}
              >
                {!selectedImage ? (
                  <Text style={styles.titleSelectPhoto}>Fotoğraf Seç</Text>
                ) : (
                  <Text style={styles.titleUnselectPhoto}>
                    Fotoğrafı Kaldır
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Mesajınızı girin"
              placeholderTextColor={"gray"}
              multiline
              onChangeText={(text) => setValue("message", text)}
            />
            {errors.message && (
              <Text style={styles.error}>Bu alan zorunludur</Text>
            )}
          </View>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.submitButton}
              // onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitButtonText}>Paylaş</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    flex: 1,
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
});

export default AddPostModal;
