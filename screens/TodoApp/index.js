import React, {useState} from 'react'
import {FlatList, Text, View} from 'react-native'
import { Container, Card, Title, Input, Button } from './styles'
import { connect } from 'react-redux'

import {addTodo, deleteTodo} from '../../redux/actions'

const TodoApp = ({todo_list, addTodo, deleteTodo, navigation}) => {

  const [task, setTask] = useState('')

  const handleAddTodo = () => {
    console.log(task)
    addTodo(task)
    setTask('')
  }

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }

  return (
    <Container>
      <Card>
        <Title>Adicione aqui uma tarefa</Title>
        <Input placeholder="tarefa" value={task} onChangeText={(t) => setTask(t)}/>
        <Button title="ADICIONAR TAREFA" color="#6200EE" onPress={handleAddTodo} />
      </Card>
      <FlatList 
        data={todo_list}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {return(
          <View>
            <Text>{item.task}</Text>
            <Button title="X" color="red" onPress={() => handleDeleteTodo(item.id)} />
            <Button title="ir para Tarefa" onPress={() => navigation.navigate('DetailTask', {id: item.id})} />
          </View>
        )}}
      />
    </Container>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todo.todo_list
  }
}

const mapDispatchToProps = {addTodo, deleteTodo}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)