declare type PhoneOption = {
  label: string;
  value: string;
};

declare interface PhoneSelector {
  defaultValue: string;
  disabled?: boolean;
  width?: number;
  search?: boolean;
  onChange: (value: string) => void;
  className?: string;
}
