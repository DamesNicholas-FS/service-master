import React, { useEffect, useState } from 'react';
import api from '../api';
import { StyleSheet, Text, View, TextInput, Button, StatusBar, SafeAreaView } from "react-native";

export default function Page({ route, navigation }) {

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const { id } = route.params;
        api.get(`/${id}`)
            .then(response => setTicket(response.data))
            .catch(error => console.log(error));
        }, [route]);

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

    const deleteTicket = () => {
        api.delete(`/${route.params.id}`)
            .then(() => navigation.goBack()) // go back to home page after deletion
            .catch(error => console.error(error));
        };
    
    if (!ticket) {
        return <Text>Loading...</Text>;
    }
    

    return (
        <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
        <View style={styles.Header}>
            <Text style={styles.title}>View Service Request</Text>
            <Text style={styles.closeButton} onPress={() => navigation.goBack()}>✕</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Name" value={ticket.name} />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="numeric" value={ticket.phoneNumber} />
            <TextInput style={styles.input} placeholder="Title" value={ticket.title} />
            <TextInput style={[styles.input, styles.textArea]} placeholder="Description" multiline={true} value={ticket.description} />
            <Button title="Delete" onPress={deleteTicket} color="#FF0000" />
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
