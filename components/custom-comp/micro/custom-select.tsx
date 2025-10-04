import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, User } from "lucide-react";

// Types
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "default" | "lg";
  onChange?: (value: string) => void;
  className?: string;
}

interface FormGroupProps {
  label?: string;
  helpText?: string;
  errorText?: string;
  children: React.ReactNode;
}

// Form Group Component
const FormGroup: React.FC<FormGroupProps> = ({
  label,
  helpText,
  errorText,
  children,
}) => (
  <div style={{ marginBottom: "24px" }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "500",
          color: "#0f172a",
          marginBottom: "8px",
          lineHeight: "1.4",
        }}
      >
        {label}
      </label>
    )}
    {children}
    {helpText && !errorText && (
      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          marginTop: "6px",
          lineHeight: "1.4",
          margin: "6px 0 0 0",
        }}
      >
        {helpText}
      </p>
    )}
    {errorText && (
      <p
        style={{
          fontSize: "12px",
          color: "#ef4444",
          marginTop: "6px",
          lineHeight: "1.4",
          margin: "6px 0 0 0",
        }}
      >
        {errorText}
      </p>
    )}
  </div>
);

// Custom Select Component
export const CustomSelect: React.FC<
  SelectProps & { label?: string; helpText?: string; errorText?: string }
> = ({
  options,
  value,
  placeholder = "Select an option",
  disabled,
  error,
  size = "default",
  onChange,
  className = "",
  label,
  helpText,
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const sizeStyles = {
    sm: { height: "36px", padding: "6px 10px 6px 10px", fontSize: "13px" },
    default: { height: "40px", padding: "8px 12px 8px 12px", fontSize: "14px" },
    lg: { height: "44px", padding: "10px 14px 10px 10px", fontSize: "16px" },
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const availableOptions = options.filter((opt) => !opt.disabled);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setFocusedIndex(-1);
      }
    }
  };

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    setFocusedIndex(-1);
    onChange?.(option.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0) {
          handleSelect(availableOptions[focusedIndex]);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < availableOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(availableOptions.length - 1);
        } else {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : availableOptions.length - 1
          );
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const triggerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: selectedOption ? "#6c757d" : "#6c757d",
    backgroundColor: disabled ? "#f8fafc" : "#ffffff",
    border: `1px solid ${error ? "#ef4444" : isOpen ? "#3b82f6" : "#e2e8f0"}`,
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s ease-in-out",
    userSelect: "none",
    outline: "none",
    boxShadow: isOpen
      ? error
        ? "0 0 0 2px rgba(239, 68, 68, 0.1)"
        : "0 0 0 2px rgba(59, 130, 246, 0.1)"
      : "none",
    ...sizeStyles[size],
  };

  const optionsStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    zIndex: 1000,
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    maxHeight: "200px",
    overflowY: "auto",
    marginTop: "2px",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transform: isOpen ? "translateY(0)" : "translateY(-4px)",
    transition: "all 0.15s ease-in-out",
  };

  return (
    <FormGroup label={label} helpText={helpText} errorText={errorText}>
      <div
        ref={selectRef}
        style={{ position: "relative", display: "inline-block", width: "100%" }}
        className={className}
      >
        <div
          ref={triggerRef}
          style={triggerStyle}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          onMouseEnter={(e) => {
            if (!disabled && !isOpen) {
              e.currentTarget.style.borderColor = error ? "#ef4444" : "#cbd5e1";
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !isOpen) {
              e.currentTarget.style.borderColor = error ? "#ef4444" : "#e2e8f0";
            }
          }}
        >
          <div className="" style={{display:"flex", alignItems:"center"}}>
            <User size={18}/>
            <span style={{paddingLeft:"5px"}}>{selectedOption ? selectedOption.label : placeholder}</span>
          </div>
          <ChevronDown
            size={16}
            style={{
              color: "#64748b",
              transition: "transform 0.15s ease-in-out",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
        <div ref={optionsRef} style={optionsStyle}>
          {availableOptions.map((option, index) => (
            <div
              key={option.value}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                color: "#0f172a",
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
                borderBottom:
                  index < availableOptions.length - 1
                    ? "1px solid #f1f5f9"
                    : "none",
                backgroundColor:
                  focusedIndex === index
                    ? "#f8fafc"
                    : selectedValue === option.value
                    ? "#eff6ff"
                    : "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              <span
                style={{
                  color: selectedValue === option.value ? "#3b82f6" : "#0f172a",
                  fontWeight: selectedValue === option.value ? "500" : "normal",
                }}
              >
                {option.label}
              </span>
              {selectedValue === option.value && (
                <Check
                  size={14}
                  style={{ color: "#3b82f6", fontWeight: "600" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </FormGroup>
  );
};
