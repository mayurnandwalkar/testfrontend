import { useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

import {
  ColorInput,
  ColorPickerWrapper,
  ColorWrapper,
} from "./ColorPickerElement";

const ColorPicker = ({ color, setFieldValue, setShowPicker, showPicker }) => {
  const pickerRef = useRef(null);
  const btnRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      setShowPicker(false);
    }
  };

  return (
    <ColorPickerWrapper>
      <ColorInput
        ref={btnRef}
        textcolor={color}
        onClick={() => setShowPicker(!showPicker)}
      >
        Pick Icon Color
      </ColorInput>

      {showPicker && (
        <ColorWrapper ref={pickerRef}>
          <HexColorPicker
            onChange={(color) => {
              setFieldValue("color", color);
            }}
            color={color}
          />
        </ColorWrapper>
      )}
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
