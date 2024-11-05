// Importar as bibliotecas de uso
import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import styles from "../assets/styles";

// Criando uma classe de interface
interface Props {
    navigation: NavigationProp<any>;
}

class HomeScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Bem vindo ao APP SENAC TITO</Text>

                
            {/* <Button
            title="Ir para os Detalhes!"
            onPress={() => this.props.navigation.navigate
            ('Details') }
            /> */}

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Details')} >

                    <Text style={{ color: 'red' }}>Ir para os detalhes </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default HomeScreen;