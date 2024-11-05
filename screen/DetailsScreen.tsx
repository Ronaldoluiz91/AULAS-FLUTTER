import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../assets/styles";


class DetailsScreen extends Component{
    render(){
        return(
            <View style={styles.container}> 
            <Text style ={styles.title}>Tela de Detalhes!</Text>
            </View>
        );
    }
}

export default DetailsScreen;