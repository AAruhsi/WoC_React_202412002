import React from "react";
const SideModal = ({ clientFiles, onFileClick }) => {
  return (
    <div className="bg-gray-900 text-white h-full w-64 fixed top-0 left-0">
      <ul className="menu bg-gray-900 text-white min-h-full p-4">
        <li className="text-lg font-bold pb-4">
          <a href="/">Code Canvas</a>
        </li>
        {clientFiles.map((file, index) => (
          <li
            key={index}
            className="py-2 px-4 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={() => onFileClick(file)}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideModal;
