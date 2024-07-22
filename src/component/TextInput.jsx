import { useState } from "react";

const TextInput = (props) => {
  const [firstFocused, setFirstFocused] = useState(false);

  const handleBlur = () => setFirstFocused(true);

  return (
    <>
      <input
        type="text"
        {...props}
        onBlur={handleBlur}
        firstFocused={firstFocused.toString()}
      />
      <p className="sb-error-text">*Tên công việc không được để trống</p>
    </>
  );
};
export default TextInput;
