import React, { ChangeEvent } from 'react';
import { PhoneOption } from './type/dropdown';
import dataSet from './utils/country';
import Flag from 'react-country-flag';
import styled from 'styled-components';

type Props = {
  defaultValue: string;
  disabled?: boolean;
  width?: number;
  search?: boolean;
  onChange: (value: string) => void;
};

export default ({ width, defaultValue, disabled, search, onChange }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = React.useState<PhoneOption>({ label: 'Select', value: '' });
  const [show, setShow] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string | null>(null);
  const options: PhoneOption[] = React.useMemo(() => {
    return dataSet.map((code) => ({
      label: `${code[0]} +${code[2]}`,
      value: code[1],
    }));
  }, []);

  React.useEffect(() => {
    if (defaultValue && options) {
      options.forEach((option) => {
        if (option.label.split('+')[1] === defaultValue.toLowerCase()) {
          setSelectedValue(option);
        }
        if (option.value.toLowerCase() === defaultValue.toLowerCase()) {
          setSelectedValue(option);
        }
      });
    }
  }, [defaultValue, options]);

  const handleClickOutside = React.useCallback((event: any) => {
    event.stopPropagation();

    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
      setSearchValue('');
    }
  }, []);

  const onChangeSearchValue = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  return (
    <Container ref={ref}>
      <Selected disabled={disabled} isDefault={selectedValue.value === ''} width={width} onClick={() => setShow(true)}>
        {selectedValue.value === '' ? (
          <SelectedText isEmpty={selectedValue.value === ''}>{selectedValue.label}</SelectedText>
        ) : (
          <SelectedText>
            <>
              <Flag countryCode={selectedValue.value} />+{selectedValue.label.split('+')[1]}
            </>
          </SelectedText>
        )}
      </Selected>
      {show && (
        <SelectWrapper width={width}>
          {search !== false && (
            <SearchWrapper>
              <Input
                onFocus={() => {
                  setShow(true);
                }}
                type="text"
                value={searchValue ?? ''}
                onChange={onChangeSearchValue}
                placeholder={`Search for Phone Country`}
              />
            </SearchWrapper>
          )}

          <Options>
            {options
              .filter((v) => (searchValue ? v.label.toLowerCase().includes(searchValue.toLowerCase()) : true))
              .map((option, key) => {
                return (
                  <List
                    hasSearch={search}
                    key={key}
                    onClick={() => {
                      setSelectedValue(option);

                      onChange(option.label.split('+')[1]);

                      setShow(false);
                      setSearchValue('');
                    }}
                  >
                    {<Flag countryCode={option.value} />}
                    {option.label}
                  </List>
                );
              })}
          </Options>
        </SelectWrapper>
      )}
    </Container>
  );
};

const SelectedText = styled.div<{ isEmpty?: boolean; fontColor?: string }>`
  font-family: ${({ theme }) => theme.wfont.NotoSansKRLight};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  margin-left: 20px;

  color: ${({ isEmpty, fontColor }) => (isEmpty ? '#BEC1CA' : fontColor)};
`;
const Selected = styled.div<{
  isDefault: boolean;
  width?: number;
  hasBorder?: boolean;
  backgroundColor?: string;
  disabled?: boolean;
}>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 30px;
  border: none;
  text-align: start;
  background-color: ${({ theme, backgroundColor, disabled }) =>
    backgroundColor ? (disabled ? theme.colors.s5 : backgroundColor) : '#f9f9f9'};

  color: ${({ isDefault }) => (isDefault ? '#BEC1CA' : '#0a112c')};

  pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};
`;
const DropButton = styled.img`
  position: absolute;
  right: 5%;
`;
const List = styled.div<{ hoverColor?: string; hasSearch?: boolean }>`
  padding: 15px 15px;
  font-family: ${({ theme }) => theme.wfont.NotoSansKRLight};
  font-size: 16px;
  color: ${({ hoverColor }) => (hoverColor ? '#f9f9f9' : '#0a112c')};

  &:hover {
    cursor: pointer;
    background-color: ${({ hoverColor }) => (hoverColor ? hoverColor : '#f9f9f9')};
  }

  :first-child {
    border-top-left-radius: ${({ hasSearch }) => (hasSearch ? 0 : 15)}px;
    border-top-right-radius: ${({ hasSearch }) => (hasSearch ? 0 : 15)}px;
  }

  :last-child {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;
const Options = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;
const Input = styled.input<{ backgroundColor?: string }>`
  text-indent: 20%;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#f9f9f9')};
  width: 80%;
  height: 40px;
  border-radius: 21px;
  margin: 20px 0;
  border: none;
  outline: none;

  &::placeholder {
    color: #d7d7d8;
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectWrapper = styled.div<{
  width?: number;
  backgroundColor?: string;
  borderColor?: string;
}>`
  z-index: 999;
  position: absolute;
  width: 30%;
  max-width: 400px;
  min-width: ${({ width }) => (width ? width : 275)}px;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background-color: ${({ theme, backgroundColor }) => (backgroundColor ? backgroundColor : theme.colors.s1)};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : `1px solid #e6e8ed`)};
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;
const Container = styled.div``;
