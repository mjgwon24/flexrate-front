import type { ReactNode, TdHTMLAttributes } from 'react';

import { Input, Select, DatePicker, Form } from 'antd';
import type { SelectProps } from 'antd';

type EditableCellProps = {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'text' | 'select' | 'date';
  options?: SelectProps['options'];
  record: Record<string, unknown>;
  index: number;
  children: ReactNode;
} & TdHTMLAttributes<HTMLTableCellElement>;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  options,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps) => {
  let inputNode;
  if (inputType === 'text') inputNode = <Input />;
  else if (inputType === 'select')
    inputNode = <Select options={options as SelectProps['options']} />;
  else if (inputType === 'date') inputNode = <DatePicker format="YYYY-MM-DD" />;
  else inputNode = <Input />;

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
