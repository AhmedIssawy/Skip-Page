// UI
import SelectedItemBar from "./components/SelectedItemBar";
//Redux
import { useSelector } from "react-redux";
// Styles
import "@/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// Types
import type { RootState } from "@/app/store";
// Pages
import Skip from "./pages/Skip";
// Settings
import { toastSettengs } from "@/lib/settengs";

function App() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkTheme);

  return (
    <>
      <Skip isDarkMode={isDarkMode} />
      <SelectedItemBar isDarkMode={isDarkMode} />
      <ToastContainer {...toastSettengs} />
    </>
  );
}

export default App;
