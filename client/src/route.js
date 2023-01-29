import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./AddUser";
import GetAllUser from "./GetAllUser";

export function RouterContainer() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/get-users" element={<GetAllUser />} />
          <Route path="/" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
