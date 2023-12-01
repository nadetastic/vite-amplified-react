import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import tile from "./tile.json";
import { generateClient } from "aws-amplify/api";

import { fetchAuthSession } from "aws-amplify/auth";

// import { createTodo } from "./graphql/mutations";
// import { listTodos } from "./graphql/queries";
// import { CreateTodoInput, Todo } from "./API";

import { get } from "aws-amplify/api";

// import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
// import { type AuthUser } from "aws-amplify/auth";
// import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { useScript } from "./hooks";

const initialState: any = { name: "", description: "" };
const client = generateClient();
const existingConfig = Amplify.getConfig();
console.log("existing config", existingConfig);

// const App: React.FC<AppProps> = ({ signOut, user }) => {
const App = () => {
  const [formState, setFormState] = useState<any>(initialState);
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const current = Amplify.getConfig();

    console.log("current", current);
    try {
      const restOperation = get({
        apiName: "MyApi",
        path: "",
      });
      const response = await restOperation.response;
      console.log("GET call succeeded: ", response);
    } catch (error) {
      console.log("GET call failed: ", error);
    }
  }
  //   try {
  //     const { tokens } = await fetchAuthSession();
  //     const idToken = tokens?.idToken;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo,
        },
      });
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div style={styles.container}>
      {/* <Heading level={1}>Hello {user?.username}</Heading> */}
      {/* <Button onClick={signOut}>Sign out</Button> */}
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) =>
          setFormState({ ...formState, name: event.target.value })
        }
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) =>
          setFormState({ ...formState, description: event.target.value })
        }
        style={styles.input}
        value={formState.description as string}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>
        Create Todo
      </button>
      <button onClick={fetchTodos}>Get</button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
      <div>
        <Map />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
} as const;

// export default withAuthenticator(App);
export default App;

function Map() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map", // container id
      // style: "https://demotiles.maplibre.org/style.json", // style URL
      style: "",
      center: [-97.0403, 32.8998], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    new maplibregl.Marker().setLngLat([-96.8495, 32.8448]).addTo(map);
  }, []);
  return (
    <div className="map-wrap">
      <div
        // ref={mapContainer}
        className="map"
        id="map"
        style={{ height: "100vh", width: "100vw" }}
      ></div>
    </div>
  );
}
