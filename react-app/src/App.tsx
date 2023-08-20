import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/flex-slider.css";
import "./assets/css/fontawesome.css";
import "./assets/css/owl.css";
import "./assets/css/templatemo-sixteen.css";
import "./App.css";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}
