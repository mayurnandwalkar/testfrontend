import { useRef, useEffect } from "react";
import { Icons, RenderIcon } from "src/utils/IconsArray";
import {
  IconContainer,
  IconSelectButton,
  IconButtonLabel,
  IconWrapper,
} from "./IconPickerElement";

const IconPicker = ({
  setFieldValue,
  icon,
  color,
  showIconPicker,
  setShowIconPicker,
}) => {
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
      setShowIconPicker(false);
    }
  };

  const handleIconChange = (name) => {
    setFieldValue("icon", name);
    setShowIconPicker(false);
  };

  return (
    <>
      <IconSelectButton
        btncolor={color}
        ref={btnRef}
        onClick={() => setShowIconPicker(!showIconPicker)}
      >
        <IconButtonLabel>Icon</IconButtonLabel>
        <RenderIcon icon={icon} color={color} />
      </IconSelectButton>

      {showIconPicker && (
        <IconContainer ref={pickerRef}>
          {Icons.map((iconInfo, index) => (
            <IconWrapper
              key={index}
              onClick={() => handleIconChange(iconInfo.name)}
            >
              <iconInfo.Component color={color} />
            </IconWrapper>
          ))}
        </IconContainer>
      )}
    </>
  );
};

export default IconPicker;
