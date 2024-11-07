import React, { Component } from 'react';
import { SafeAreaView, TextInput, FlatList, Text, View, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Traz o módulo para o seu código e permite que use a função Font.loadAsync
// para carregar as fontes personalizadas eno aplicativo EXPO
import * as Font from 'expo-font';
 
class App extends Component {
 
  // Construtor da classe, um método especial utilizado para inicializar o estado do componente
  constructor(props) {
    // Chama o construtor da classe base (React.Component) para garantir que 'this' seja tratado corretamente
    super(props);
 
    // Inicialização do estado do componente
    this.state = {
      // 'item' armazena o valor de um item no campo de texto ou formulário. Inicialmente, está vazio.
      item: '',
 
      // 'shoppingList' é um array que contém os itens da lista de compras. Começa vazio.
      shoppingList: [],
 
      // 'editingIndex' indica se estamos editando um item específico da lista de compras.
      // Se for -1, significa que não estamos editando nenhum item no momento.
      editingIndex: -1,
 
      // Deixa a entrada da Fonte personalizada como falsa caso ela não encontre
      fontsLoaded: false,
    };
  }
 
  /*
     A função componentDidMount é chamada automaticamente assim que o componete é montado,
     ou seja, assim que ele é inserido na árvore de componentes.
     A palavra-chave 'async' indica que a função é assíncrona, permitindo o uso de 'await'
     para esperar que as fontes seja resolvidas.
  */
  async componentDidMount() {
    // Usando o Font.loadAsync para carregar as fontes personalizadas, carrega elas antes da renderização
    await Font.loadAsync({
      // Nome da fonte como será chamada no CSS e seu caminho como requerido
      'Roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
      'Roboto-Bold-Italic': require('./assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    });
    // Após o carregamento das fontes, atualiza o estado do componente pra TRUE
    this.setState({ fontsLoaded: true });
  }
 
  // Método responsável por adicionar um item à lista de compras
  addItem = () => {
    // Desestrutura as variáveis 'item' e 'shoppingList' do estado do componente
    const { item, shoppingList } = this.state;
 
    // Verifica se o campo 'item' não está vazio (removendo espaços em branco no início e no final)
    if (item.trim()) {
      // Atualiza o estado, adicionando um novo item à lista de compras
      this.setState({
        // Adiciona o novo item ao final do array 'shoppingList'
        shoppingList: [...shoppingList, { text: item, bought: false }],
 
        // Limpa o campo 'item' após adicionar o item à lista
        item: '',
      });
    }
  };
  // Método responsável por habilitar a edição de um item da lista de compras
  editItem = (index) => {
    // Desestrutura o array 'shoppingList' do estado do componente
    const { shoppingList } = this.state;
 
    // Atualiza o estado para permitir a edição do item selecionado
    this.setState({
      // Define o valor do campo 'item' com o texto do item que está sendo editado
      item: shoppingList[index].text,
 
      // Define o índice do item que está sendo editado, para poder identificá-lo mais tarde
      editingIndex: index,
    });
  };
  // Método responsável por salvar as edições feitas em um item da lista de compras
  saveEdit = () => {
    // Desestrutura as variáveis 'item', 'shoppingList' e 'editingIndex' do estado do componente
    const { item, shoppingList, editingIndex } = this.state;
 
    // Verifica se o campo 'item' não está vazio (removendo espaços em branco no início e no final)
    if (item.trim()) {
      // Cria uma cópia do array 'shoppingList' para garantir que o estado seja imutável
      const updatedList = [...shoppingList];
 
      // Atualiza o item na posição do índice 'editingIndex' com o novo texto
      updatedList[editingIndex].text = item;
 
      // Atualiza o estado com a lista de compras modificada, limpa o campo 'item' e desmarca o índice de edição
      this.setState({
        shoppingList: updatedList,   // Atualiza a lista de compras com o item editado
        item: '',                    // Limpa o campo de entrada 'item'
        editingIndex: -1,            // Restaura o valor de 'editingIndex' para -1, indicando que não há mais item sendo editado
      });
    }
  };
  // Método responsável por alternar o estado de "comprado" de um item na lista de compras
  toggleBought = (index) => {
    // Desestrutura a variável 'shoppingList' do estado do componente
    const { shoppingList } = this.state;
 
    // Cria uma cópia do array 'shoppingList' para garantir que o estado seja imutável
    const updatedList = [...shoppingList];
 
    // Alterna o valor da propriedade 'bought' do item no índice especificado
    updatedList[index].bought = !updatedList[index].bought;
 
    // Atualiza o estado com a lista de compras modificada
    this.setState({
      shoppingList: updatedList,   // Atualiza a lista de compras com o novo estado do item
    });
  };
  // Método responsável por renderizar um item da lista de compras
  renderItem = ({ item, index }) => (
    // Componente View que contém a estrutura visual do item da lista
    <View style={styles.itemContainer}>
 
      {/* Botão para alternar o estado "comprado" do item */}
      <TouchableOpacity onPress={() => this.toggleBought(index)}>
        {/* Ícone de status de compra: "check-circle" para comprado, "radio-button-unchecked" para não comprado */}
        <Icon
          name={item.bought ? 'check-circle' : 'radio-button-unchecked'}  // Define o ícone dependendo do status do item
          size={24}  // Tamanho do ícone
          color={item.bought ? 'green' : 'gray'}  // Cor do ícone: verde se comprado, cinza se não comprado
          style={styles.checkIcon}  // Estilo aplicado ao ícone
        />
      </TouchableOpacity>
 
      {/* Texto do item */}
      <Text style={[styles.itemText, item.bought && styles.strikethrough]}>
        {item.text}  {/* Exibe o texto do item */}
      </Text>
 
      {/* Botão para editar o item */}
      <TouchableOpacity onPress={() => this.editItem(index)}>
        {/* Ícone de edição */}
        <Icon name="edit" size={20} color="blue" />
      </TouchableOpacity>
    </View>
  );
 
 
  // Método responsável pro renderizar o separador entre os itens da lista
  renderSeparator = () => {
    // Retorna uma View que serve como separador, com um CSS definido
    return <View style={styles.separator} />;
  };
 
  render() {
    const { item, shoppingList, editingIndex } = this.state;
 
    return (
      <SafeAreaView style={styles.container}>
        {/* Ajustando a barra de status para não interferir */}
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
 
        <Text style={styles.title}>Lista de Compras</Text>
 
        <TextInput
          // Aplica o estilo definido em styles.input para o componente de entrada de texto
          style={styles.input}
          // Exibe uma dica de texto para o usuário informando o que deve ser digitado
          placeholder="Digite o nome do item"
          // Valor atual do campo de entrada, vinculado ao estado 'item' no componente
          value={item}
          // Atualiza o estado 'item' sempre que o texto é alterado pelo usuário
          onChangeText={(text) => this.setState({ item: text })}
        />
 
 
        <TouchableOpacity
          style={[
            styles.button, // Aplica o estilo geral para o botão (estilo comum a todos os botões)
            editingIndex === -1 ? styles.addButton : styles.saveButton, // Aplica o estilo específico baseado em 'editingIndex':
            // Se 'editingIndex' for -1, aplica o estilo 'addButton' (para adicionar item)
            // Caso contrário, aplica o estilo 'saveButton' (para salvar item editado)
          ]}
          onPress={editingIndex === -1 ? this.addItem : this.saveEdit} // Define a ação ao pressionar o botão:
        // Se 'editingIndex' for -1, chama a função 'addItem' para adicionar um novo item
        // Caso contrário, chama a função 'saveEdit' para salvar as edições feitas no item
        >
          <Text style={styles.buttonText}>
            {editingIndex === -1 ? 'Adicionar' : 'Salvar Edição'}
            {/* O texto exibido no botão depende do valor de 'editingIndex':
    // Se for -1 (não estamos editando), o texto será 'Adicionar'
    // Caso contrário, o texto será 'Salvar Edição'*/}
          </Text>
        </TouchableOpacity>
 
 
        <FlatList
          data={shoppingList} // A propriedade 'data' recebe a lista de itens que será exibida na FlatList. Neste caso, é a lista 'shoppingList'.
          renderItem={this.renderItem} // A função 'renderItem' é chamada para renderizar cada item da lista. Ela recebe um objeto de item e deve retornar o componente que será exibido para cada item.
          keyExtractor={(item, index) => index.toString()} // A função 'keyExtractor' extrai uma chave única para cada item. Aqui, estamos usando o índice do item convertido para string (evita warnings ao usar índices como chave).
          ItemSeparatorComponent={this.renderSeparator} // A propriedade 'ItemSeparatorComponent' permite adicionar um componente visual entre os itens da lista. Neste caso, 'renderSeparator' é uma função que retorna o separador visual (como uma linha ou espaço).
          style={styles.list} // Aplica o estilo definido para a lista, que está presente no objeto 'styles' como 'list'. Isso permite customizar a aparência da FlatList (como margens, padding, etc.).
        />
 
      </SafeAreaView>
    );
  }
}
 
const { width } = Dimensions.get('window'); // Desestruturação da largura da janela (tela) do dispositivo. A função 'Dimensions.get('window')' retorna um objeto contendo as dimensões da janela, e a desestruturação extrai apenas a propriedade 'width', que representa a largura da tela.
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,  // Adiciona padding superior para evitar sobreposição da barra de status
  },
  title: {
    fontSize: 24,
    //fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold-Italic',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    width: width * 0.9,
    fontFamily: 'Roboto-Bold-Italic',
  },
  list: {
    marginTop: 20,
    width: width * 0.9,
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    flex: 1,
    fontFamily: 'Roboto'
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkIcon: {
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    width: width * 0.9,
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
 
export default App;