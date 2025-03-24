import { MouseEvent, useState, useEffect, useRef } from "react";
import "./customDropdown.scss";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { useForm } from "react-hook-form";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BsCheckLg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

const CustomDropdown = () => {
  const sampleOptions = [
    "Education 🎓",
    "yeeeah, science! ⚗️",
    "Art 🎭",
    "Sport ⚽",
    "Games 🎮",
    "Health 🏩",
  ];

  // states section
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState(sampleOptions);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // react-hook-form setup
  const { register, getValues, resetField } = useForm();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newText = getValues("newOption") as string;
      if (newText.trim()) {
        setDropdownOptions([newText, ...dropdownOptions]);
        resetField("newOption");
      }
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setDropdownOptions((prev) => prev.filter((opt) => opt !== optionToRemove));
  };

  return (
    <div className="dropdown">
      <div className="dropdown-wrraper" ref={dropdownRef}>
        <div className="dropdown-container">
          {/* Title part of dropdown */}
          <div className="dropdown-header" onClick={handleClick}>
            <div className="dropdown-title">
              {" "}
              {selectedOption ? selectedOption : "science"}
            </div>
            {isOpen ? <GoChevronUp /> : <GoChevronDown />}
          </div>
        </div>
        {/* Options Parf of dropdown */}
        {isOpen && (
          <div className="dropdown-options">
            <ul>
              <CustomTextInput
                id="newOption"
                placeholder="New Option"
                register={register}
                onKeyDown={handleKeyDown}
              />
              {dropdownOptions.map((option, i) => {
                const isUserAdded = !sampleOptions.includes(option);
                return (
                  <li
                    key={i}
                    className={`options-list ${selectedOption === option ? "option-selected" : ""}`}
                    onClick={() => {
                      setSelectedOption(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                    {isUserAdded ? (
                      <CgClose
                        title="Remove option"
                        className="remove-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOption(option);
                          setSelectedOption("");
                        }}
                      />
                    ) : selectedOption === option ? (
                      <BsCheckLg />
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
