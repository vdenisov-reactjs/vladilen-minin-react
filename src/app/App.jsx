import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Modal from './components/Modal/Modal';
// import AddTodo from './components/AddTodo';
import Context from './shared/context';
import Loader from './shared/Loader';

const AddTodo = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./components/AddTodo'));
        }, 3000);
    });
});

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API = 'https://jsonplaceholder.typicode.com';
        fetch(`${API}/todos?_limit=5`)
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos);
                    setLoading(false);
                }, 2000);
            });
    }, []);

    function toggleTodo(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
        );
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function addTodo(title) {
        setTodos(
            todos.concat({
                title,
                id: Date.now(),
                completed: false,
            }),
        );
    }

    return (
        <Context.Provider value={{ removeTodo }}>
            <div className="wrapper">
                <h1>React tutorial</h1>

                <Modal />

                <React.Suspense fallback={<p>Loading...</p>}>
                    <AddTodo onCreate={addTodo} />
                </React.Suspense>

                {loading && <Loader />}

                {todos.length ? (
                    <TodoList todos={todos} onToggle={toggleTodo} />
                ) : loading ? null : (
                    <p>No todos</p>
                )}
            </div>
        </Context.Provider>
    );
}

export default App;
