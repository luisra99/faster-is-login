import { IdentityProviderList } from "../../../src";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100vh",
      }}
    >
      <IdentityProviderList
        variant="button"
        redirectPath="/dashboard"
        specific
      />
    </div>
  );
}

export default App;
