import { useEffect, useState } from "react";
import SignIn from "./components/Sign/SignIn";
import SignUp from "./components/Sign/SignUp";

const App = () => {
  useEffect(() => {}, []);

  return (
    <main>
      <SignUp />
      <SignIn />
    </main>
  );
};

export default App;
