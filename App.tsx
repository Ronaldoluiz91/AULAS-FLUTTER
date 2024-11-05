import React, { Component } from "react";
import {
    SafeAreaView, View, Text, TouchableOpacity, StatusBar, Dimensions, TextInput, FlatList,
    StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./assets/styles";

class App extends Component {
    constructor(props) {
        //Chama o contrutor da classe, base (React.Component) para garantir que o 'this' seja tratado corretamente
        super(props);
        //Inicialização do estado do component
        this.state = {
            //Armazena o valor de um item no campo de texto ou formulario
            //Iniciando como vazio
            item: '',
            //Array que contem os itens da lista de comprar. Iniciando vazio
            shoppingList: [],
            //Indica se estamos editando um item especifico da lista de compras
            //Se for -1, significa que não estamos editando nenhum item no momento
            editingIndex: -1,
        };
    }

    //Criando nossos métodos
    //Método responsavel por adicionar um item a lista de compras

    addItem = () => {
        //Desestrutura as variaveis 'item' e 'shoppingList' do estado do componente
        const { item, shoppingList } = this.state;
        //Verifica se o campo 'item' não esta vazio (removendo espaços em branco no inicio e no final)
        if (item.trim()) {
            //Atualiza o estado, adicionando um novo item a lista de compras
            this.setState({
                //Adiciona o novo item ao final do array 'shoppingList'
                shoppingList: [...shoppingList, { text: item, bought: false }],
                //limpa o campo 'item' após adicionar o item a lista
                item: '',
            });
        }
    };


    //Método responsavel por habilitar a edição de um item da lista de compras
    editItem = (index) => {
        //Desestrutura o array 'shoppingList' do estado do componente
        const { shoppingList } = this.state;
        this.setState({
            // Define o valor do campo 'item' com o texto do item que esta sendo editado
            item: shoppingList[index].text,
            //Define o indice do item que sendo editado, para poder identifica-lo mais tarde
            editingIndex: index,
        });
    };


    // Metodo responsavel por salvar as edições feitas em um item da lista de compras
    saveEdit = () => {
        //Desestrutura as variaveis 'item', 'shoppingList' e editingIndex do estado do componente
        const { item, shoppingList, editingIndex } = this.state;
        //Verifica se o campo 'item' não esta vazio (removendo espaços em branco no inicio e no final)
        if (item.trim()) {
            // Cria uma cópia do array 'shoppingList', para garantir que o estado seja imutavel
            const updateList = [...shoppingList];
            //Atualiza o item na posição do indice 'editingIndex' com o novo texto
            updateList[editingIndex].text = item;
            // Atualiza o estado com a lista de compras modificadas, limpa o campo 'item e desmarca o indice de edição
            this.setState({
                // Atualiza a lista de compras com o item editado
                shoppingList: updateList,
                // Limpa o campo de entrada 
                item: '',
                editingIndex: -1,
            });
        }
    };

    // Metodo responsavel por alterar o estado de comprado de um item na lista de compras
    toggleaBought = (index) => {
        // Desestrutura a variavel 'shoppingList' do estado do component
        const { shoppingList } = this.state;
        //Cria uma cópia do array 'shoppingList' do estado do component
        const updateList = [...shoppingList];
        // Alterna o valor da propriedade 'bought' do item no indice especificado
        updateList[index].bought = !updateList[index].bought;
        // Atualiza o estado com a lista de compras modificada
        this.setState({
            // Atualiza a lista de compras com o novo estado do item
            shoppingList: updateList,
        });
    };

    renderItem = ({ item, index }) => (
        <View>
            {/* Botão para alterar o estado 'comprado' do item */}
            <TouchableOpacity onPress={() => this.toggleaBought(index)}>
                {/* Icone de status de compra: 'check-circle' para comprado ou 'radio-button-unch' */}
                <Icon name={item.bought ? 'check-circle' : 'radio-button-unchecked'}
                    size={24}
                    color={item.bought ? 'green' : 'gray'}
                    // Estilo de CSS aplicado no icone
                    style={styles.checkIcon}
                />
            </TouchableOpacity>
            {/* Texto do item */}
            <Text style={[styles.itemText, item.bought && styles.strikehrougn]}>
                {/* Exibe o texto do item */}
                {item.text}
            </Text>
            {/* Botão para editar o item */}
            <TouchableOpacity onPress={() => this.editItem(index)}>
                {/* Icone de edição */}
                <Icon name="edit"
                    size={20}
                    color='blue'
                />
            </TouchableOpacity>
        </View >
    );

    renderSeparator = () => {
        return <View style={styles.separator} />
    };





    //Renderiza o APP
    render() {
        return (
            <SafeAreaView>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                {/* Cabeçalho */}
                <View>
                    <Text> Lista de Compras </Text>
                </View>
                {/* Corpo */}
                <View>
                    <TextInput placeholder="Digite o nome do item" />
                    <TouchableOpacity>
                        <Text>
                            Adicionar
                        </Text>
                    </TouchableOpacity>

                    {/* <FlatList /> */}
                </View>
            </SafeAreaView>
        )
    }
}

export default App;