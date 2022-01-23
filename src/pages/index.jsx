import { Toaster } from "react-hot-toast";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsCalendar3 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

import { Diary } from "../components";
import { useToastLimiter } from "../hooks";

const Home = () => {
  useToastLimiter();

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          success: {
            style: {
              border: "1px solid green"
            }
          },
          error: {
            style: {
              border: "1px solid red"
            }
          }
        }}
      />

      <main className="h-screen w-screen">
        <Diary />

        <div className="w-full h-[50px] flex flex-grow justify-around items-center text-3xl border-t-[1px] border-black">
          <AiOutlineHome />
          <FiSearch />
          <IoIosAddCircleOutline />
          <BsCalendar3 />
          <CgProfile />
        </div>
      </main>
    </>
  );
};

export default Home;
