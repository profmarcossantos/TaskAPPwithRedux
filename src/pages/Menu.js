import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native';
import { Alert, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class Menu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Registre suas tarefas!',
      headerTintColor: '#fff',
      headerRight: (
        <View style={{ marginRight: 15 }}>
          <Button
            onPress={() => {
              navigation.state.params.logOut()
                .then(() => {
                  navigation.replace('Login')
                })
            }}
            title="Sair"
            color="grey"
            testID='headerRightButton'
            accessibilityLabel="Right button!"
          />
        </View>
      ),
    };
  };



  constructor(props) {
    super(props);
    this.state = {
      tarefa: '',
      salvando: false,
      carregando: false,
      tarefas: []
    };
  }


  componentDidMount() {
    this.carregarTarefas()
    this.props.navigation.setParams({
      logOut: this.props.tryLogout
    });
  }

  carregarTarefas() {
    this.setState({ carregando: true })
    this.props.lerTarefas()
      .then(() => {
        this.setState({ carregando: false })
      }).catch(erro => {
        this.setState({ carregando: false })
      })

  }

  alterarTarefa(tarefa) {
    this.props.alterarTarefa(tarefa)
      .then(() => {
        this.carregarTarefas()
      })

  }

  excluirTarefa(tarefa) {
    
    Alert.alert(
      'TAREFAS!',
      'Deseja excluir esta tarefa?',
      [{
        text: 'Não',
        style: 'cancel',
        onPress: () => {
          Alert.alert(
            'Tarefa Não Excluída'
          );
        },
      }, {
        text: 'Sim',
        onPress: () => {
          this.props.excluirTarefa(tarefa)
            .then(() => {
              this.carregarTarefas()
            })
        }
      }],
      { cancelable: false }
    )


  }

  adicionarTarefa() {
    Alert.alert(
      'TAREFAS!',
      'Deseja inserir uma nova tarefa?',
      [{
        text: 'Não',
        style: 'cancel',
        onPress: () => {
          Alert.alert(
            'Tarefa Não Inserida'
          );
        },
      }, {
        text: 'Sim',
        onPress: () => {
          this.setState({ 'salvando': true })
          this.props.adicionarTarefa(this.state.tarefa)
            .then(() => {
              this.setState({ 'salvando': false, tarefa: '' })
              this.carregarTarefas()
            })
            .catch(erro => {
              Alert.alert(
                'Tarefa não Inserida!',
                erro
              );
            })
        }
      }],
      { cancelable: false }
    )
  }

  renderSalvando() {
    if (this.state.salvando == true) {
      return (
        <View style={styles.salvandoForm}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )
    } else {
      return (
        <View style={styles.containerForm}>
          <View style={styles.inputForm}>
            <TextInput
              value={this.state.tarefa}
              onChangeText={tarefa => {
                this.setState({ tarefa })
              }}
              placeholder="TAREFA"
            />
          </View>
          <View style={styles.buttonForm}>
            <Button
              title="ADD"
              onPress={() => {
                this.adicionarTarefa()
              }}
            />
          </View>
        </View>
      )
    }
  }

  renderCarregando() {
    if (this.state.carregando == true) {
      return (
        <ActivityIndicator size="small" color="#0000ff" />
      )
    } else {
      return (
        <View>
          <FlatList
            data={this.props.tarefas}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => {
                  this.alterarTarefa(item)
                }}
              >
                <View style={styles.flatview}>
                  <View style={{ flex: 1 }}>
                    {item.realizado ?
                      <Ionicons name="md-checkmark-circle" size={26} color="green" />
                      :
                      <Ionicons name="md-close-circle" size={26} color="red" />
                    }
                  </View>
                  <View style={{ flex: 6 }}>
                    <Text>{item.tarefa}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.excluirTarefa(item)
                      }}
                    >
                      <Ionicons name="md-remove-circle" size={26} color="grey" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      )
    }
  }

  render() {

    return (
      <ScrollView>
        {this.renderSalvando()}
        {this.renderCarregando()}
      </ScrollView>
    );
  }
}

import { lerTarefas, alterarTarefa, excluirTarefa, adicionarTarefa, tryLogout } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  const { tarefas } = state
  return { tarefas }
}

export default connect(mapStateToProps, { lerTarefas, alterarTarefa, excluirTarefa, adicionarTarefa, tryLogout })(Menu)

const styles = StyleSheet.create({
  salvandoForm: {
    alignItems: 'center'
  },
  containerForm: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  inputForm: {
    flex: 4,
    borderWidth: 1,
    borderBottomColor: '#c3c9cc',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    padding: 5,
    marginRight: 10
  },
  buttonForm: {
    flex: 2
  },
  flatview: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#c3c9cc',
    width: '90%',
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
  },

});