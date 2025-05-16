import type { ReactNode, TdHTMLAttributes } from 'react';

import { Input, Select, DatePicker, Form } from 'antd';
import type { SelectProps } from 'antd';

type EditableCellProps = {
  title: string;
  editing: boolean;
  dataIndex: string;
  inputType: 'text' | 'select' | 'date';
  options?: SelectProps['options'];
  record: Record<string, unknown>;
  index: number;
  children: ReactNode;
  handleChange: (value: string) => void;
} & TdHTMLAttributes<HTMLTableCellElement>;

const EditableCell = ({
  title,
  editing,
  dataIndex,
  inputType,
  options,
  children,
  handleChange,
  ...restProps
}: EditableCellProps) => {
  let inputNode;
  if (inputType === 'text') {
    inputNode = <Input onChange={(e) => handleChange(e.target.value)} />;
  } else if (inputType === 'select') {
    inputNode = <Select options={options as SelectProps['options']} onChange={handleChange} />;
  } else if (inputType === 'date') {
    inputNode = (
      <DatePicker
        format="YYYY-MM-DD"
        onChange={(date, dateString) =>
          handleChange(Array.isArray(dateString) ? dateString.join(',') : dateString)
        }
      />
    );
  } else {
    inputNode = <Input onChange={(e) => handleChange(e.target.value)} />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `${title}을(를) 입력하세요.` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
