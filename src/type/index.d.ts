declare type PhoneOption = {
  label: string;
  value: string;
};

declare interface PhoneSelector {
  placeholder?: string;
  defaultValue: string;
  disabled?: boolean;
  width?: number;
  search?: boolean;
  onChange: (value: string) => void;
  className?: string;
}
