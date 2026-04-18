import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import router from "./routes/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors theme="light" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
