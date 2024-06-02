import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Five } from "../Five/Five";
import { FiveList } from "../FiveList/FiveList";
import Header from "../Header/Header";

export default function Schedule() {
  return (
    <div className="flex max-w-2xl min-h-[420px] h-fit shadow-2xl backdrop-blur-md rounded-xl p-7 bg-white/70 w-full flex-col">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<FiveList />} />
          <Route path="/:id" element={<Five />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
