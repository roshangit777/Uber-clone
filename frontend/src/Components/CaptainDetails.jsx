import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { MdSpeed } from "react-icons/md";
import { BiNotepad } from "react-icons/bi";

const CaptainDetails = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full"
            src="https://i.pinimg.com/originals/40/3e/6c/403e6c37a2276d7d7b13d57375aa7ce9.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">Harsh Patel</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs 200</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex mt-8 p-3 bg-gray-100 rounded-2xl justify-center gap-5 items-start">
        <div className="text-center">
          <span className="text-3xl mb-2 font-thin flex justify-center">
            <IoTimeOutline />
          </span>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-small text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <span className="text-3xl mb-2 font-thin flex justify-center">
            <MdSpeed />
          </span>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-small text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <span className="text-3xl mb-2 font-thin flex justify-center">
            <BiNotepad />
          </span>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-small text-gray-600">Hours Online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
