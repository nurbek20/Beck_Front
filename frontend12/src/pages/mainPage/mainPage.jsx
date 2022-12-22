import React, { useState, useContext, useEffect, useCallback } from "react";
import "./mainPage.css";
import services from "../../services/services";
import { MyContext } from "../../context/my-context/my-context";

const MainPage = () => {
  const [text, setText] = useState("");
  const { userId, todos, createPost } = useContext(MyContext);

  const createTodoHandler = async (e) => {
    e.preventDefault();
    await services.todoService(text, userId,{
      headers: {
        'Content-Type': 'application/json'
    }
    });
    setText("");
  };

  useEffect(() => {
    const loadTodo = async () => {
      const data = await services.todoGet({
        headers: {
          'Content-Type': 'application/json'
      }
      });
      createPost(data.data);
    };
    loadTodo();
  });

  const deleteTodo = async (id) => {
    const data = await services.todoRemove(id,{
      headers: {
        'Content-Type': 'application'
    }
    })
    console.log("data, _id>>>", data);
  };

  const completedTodo = async (id) => {
    await services.todoCompleted(id, {
      headers: {
        'Content-Type': 'application'
    }
    });
  };
  const importantTodo = async (id) => {
    await services.todoImportant(id, {
      headers: {
        'Content-Type': 'application'
    }
    });
  };
  return (
    <div className="container">
      <div className="main-age">
        <h4>Дабавить задачу</h4>
        <form className="form form-login" onSubmit={createTodoHandler}>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                name="input"
                className="validate"
                id="text"
              />
              <label htmlFor="input">Задача:</label>
            </div>
          </div>
          <div className="row">
            <button type="submit" className="waves-effect waves-light btn blue">
              Дабавить
            </button>
          </div>
        </form>

        <h3>Активные Задачи:</h3>
        <div className="todos">
          {todos.map((elem, index) => {
            let cls = ["row flex todos-item"];
            if (elem.completed) {
              cls.push("completed ");
            }
            if (elem.important) {
              cls.push("important");
            }
            return (
              <div key={index} className={cls.join(" ")}>
                <div className="col todos-num">{index + 1}</div>
                <div className="col todos-text">{elem.text}</div>
                <div className="col todos-buttons">
                  <i
                    className="material-icons blue-text"
                    onClick={() => completedTodo(elem._id)}
                  >
                    check
                  </i>
                  <i
                    className="material-icons orange-text"
                    onClick={() => importantTodo(elem._id)}
                  >
                    warning
                  </i>
                  <i
                    className="material-icons red-text"
                    onClick={() => deleteTodo(elem._id)}
                  >
                    delete
                  </i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
