import Login from "./components/Login";

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
  <Login />
  );
}

export default App;
