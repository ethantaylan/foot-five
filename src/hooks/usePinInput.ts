import { ChangeEvent, useRef, useState } from "react";

export const usePinInput = () => {
  const [pin, setPin] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [isValid, setIsValid] = useState<{ [key: string]: boolean | null }>({
    a: null,
    b: null,
    c: null,
    d: null,
  });

  const pinInputRefs = Array.from({ length: 4 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handlePinChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const isValidInput = /^\d$/.test(value);

      if (isValidInput) {
        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          [String.fromCharCode(97 + index)]: true,
        }));

        const nextInput = pinInputRefs[index + 1];
        if (nextInput && nextInput.current) {
          nextInput.current.focus();
        }

        setPin((prevPin) => ({
          ...prevPin,
          [String.fromCharCode(97 + index)]: parseInt(value, 10),
        }));
      } else {
        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          [String.fromCharCode(97 + index)]: false,
        }));
      }
    };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      !/[0-9]/.test(event.key) &&
      ![
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Tab",
        "Ctrl",
      ].includes(event.key)
    ) {
      event.preventDefault();
    }
  };

  return { pin, isValid, pinInputRefs, handlePinChange, handleKeyDown };
};
