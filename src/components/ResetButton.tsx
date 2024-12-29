import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button({
  width: '100%',
  border: 'none',
  padding: 16,
  outline: 'none',
  borderRadius: 3,
  marginBottom: 8,
  cursor: 'pointer',
});

export const ResetButton: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <Button onClick={onReset} style={{ marginTop: '20px' }}>
      Reset Todos
    </Button>
  );
};
