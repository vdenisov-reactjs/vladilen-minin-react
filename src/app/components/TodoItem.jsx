import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../shared/context';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem',
    },
    element: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginRight: '1rem',
    },
};

function TodoItem({ todo, index, onChange }) {
    const { removeTodo } = useContext(Context);
    const classes = [];

    if (todo.completed) {
        classes.push('done');
    }

    return (
        <div style={styles.container}>
            <span style={styles.element} className={classes.join(' ')}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    style={styles.input}
                    onChange={() => onChange(todo.id)}
                />
                <strong>{index + 1}</strong>
                &nbsp;
                {todo.title}
            </span>

            <button className="rm-btn" onClick={() => removeTodo(todo.id)}>
                &times;
            </button>
        </div>
    );
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

export default TodoItem;
