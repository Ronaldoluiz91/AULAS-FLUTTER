// Importando as dependencias do projeto
import React,{Component} from "react";
import { StyleSheet, View, Text } from "react-native";


//Criando as classe publica para o app
class App extends Component{
  render(){
    return(
      <>
      <View><Text>Cabeçalho</Text></View>
      <View><Text>Corpo</Text></View>
      <View><Text>Rodapé</Text></View>
      </>
    );
  }
}
export default App;