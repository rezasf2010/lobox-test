import "./CustomTextInput.scss";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  id: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const CustomTextInput = <T extends FieldValues>({
  id,
  placeholder,
  register,
  onKeyDown,
}: TextInputProps<T>) => {
  return (
    <div className="custom-input-wrapper">
      <input
        className="custom-input"
        id={id}
        type="text"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        {...register(id)}
      />
    </div>
  );
};

export default CustomTextInput;
