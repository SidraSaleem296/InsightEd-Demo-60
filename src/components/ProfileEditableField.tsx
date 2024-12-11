import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const ProfileEditableField = ({ value, onSave }: { value: string; onSave: (newValue: string) => void }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setEditing(false);
  };

  return editing ? (
    <div className="flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border rounded p-1"
      />
      <button onClick={handleSave} className="ml-2 text-blue-500">
        Save
      </button>
    </div>
  ) : (
    <div className="flex items-center">
      <span>{value}</span>
      <FiEdit
        className="ml-2 text-gray-500 cursor-pointer"
        onClick={() => setEditing(true)}
      />
    </div>
  );
};

export default ProfileEditableField;
