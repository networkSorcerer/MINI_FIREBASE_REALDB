// src/App.jsx
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, push, onValue, update, remove } from "firebase/database";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // READ: 실시간 불러오기
  useEffect(() => {
    const todosRef = ref(db, "todos");
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setTodos([]);
      const list = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      setTodos(list);
    });
  }, []);

  // CREATE
  const addTodo = () => {
    if (!text.trim()) return;
    push(ref(db, "todos"), {
      text,
      createdAt: Date.now(),
    });
    setText("");
  };

  // UPDATE
  const updateTodo = (id) => {
    const newText = prompt("수정할 내용을 입력하세요:");
    if (!newText) return;
    update(ref(db, `todos/${id}`), { text: newText });
  };

  // DELETE
  const deleteTodo = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      remove(ref(db, `todos/${id}`));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Firebase Realtime Database CRUD</h1>

      {/* CREATE */}
      <input
        type="text"
        placeholder="새 할 일 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>추가</button>

      <hr />

      {/* READ + UPDATE + DELETE */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 10 }}>
            {todo.text}{" "}
            <button onClick={() => updateTodo(todo.id)}>수정</button>{" "}
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
