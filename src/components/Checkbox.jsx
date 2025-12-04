import styled from "@emotion/styled";

const StyledInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #F07F23;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  cursor: pointer;

  color: #6A6A6A;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export default function Checkbox({ checked, onChange, label }) {
  return (
    <CheckboxLabel>
      <StyledInput
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label && <span>{label}</span>}
    </CheckboxLabel>
  );
}