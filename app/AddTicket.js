import react, { useState } from "react";
import api from '../api';
import { StyleSheet, Text, View, TextInput, Button, StatusBar, SafeAreaView } from "react-native";

export default function Page({ navigation }) {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const saveTicket = async () => {
        try {
            const response = await api.post('/add-ticket', {
                name,
                phoneNumber,
                title,
                description
                });
                if (response.status === 200) {
                // go back to the home page if the ticket is saved successfully
                navigation.goBack();
                } else {
                console.error('Failed to save the ticket.');
                }
            } catch (error) {
                console.error(error);
            }
        };

  return (
    <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={styles.SafeAreaView}>
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.title}>Add Service Request</Text>
        <Text style={styles.closeButton} onPress={() => navigation.goBack()}>✕</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Phone Number" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Title" />
        <TextInput style={[styles.input, styles.textArea]} placeholder="Description" multiline={true} />
        <Button title="Save" onPress={() => {saveTicket}} color="#2563EB" />
      </View>
    </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#39445f",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  Header: {
    width: "100%",
    height: 75,
    backgroundColor: "#475577",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    paddingTop: 25,
    color: "#fff",
  },
  main: {
    width: "100%",
    backgroundColor: "#E5E7EB", // added the background color to the FlatList
  },
  closeButton: {
    fontSize: 24,
    color: "#fff",
    position: "absolute",
    right: 15,
    top: 27,
  },
  inputContainer: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    width: "95%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#2f3134",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  textArea: {
    height: 100,
  },
});
