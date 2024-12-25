import React from "react";

function ModalDetail({ isOpen, onClose, title, details }) {
  if (!isOpen) return null; // Không hiển thị modal nếu chưa mở

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-3">
          {details &&
            Object.entries(details).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value || "N/A"}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ModalDetail;
