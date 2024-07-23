import { useState } from "react";

const TextInput = (props) => {
  const [firstFocused, setFirstFocused] = useState(false);

  return (
    <>
      <input
        type="text"
        {...props}
        onBlur={() => setFirstFocused(true)}
        firstfocused={firstFocused.toString()}
      />
      <p className="sb-error-text">*Tên công việc không được để trống</p>
    </>
  );
};
export default TextInput;
