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

/**
 * 테이블 개별 셀 수정 렌더링 컴포넌트
 * @param title 테이블 헤더
 * @param editing 편집 모드 여부
 * @param dataIndex 테이블 데이터 인덱스
 * @param inputType 입력 타입 (text, select, date)
 * @param options 셀렉트 옵션 (select 타입일 경우)
 * @param children 자식 요소
 * @param handleChange 셀 값 변경 핸들러
 * @param restProps 기타 HTML 속성
 *
 * @since 2025.05.16
 * @author 권민지
 */
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
  const renderInputNode = () => {
    switch (inputType) {
      case 'text':
        return <Input onChange={(e) => handleChange(e.target.value)} />;
      case 'select':
        return <Select options={options} onChange={(value) => handleChange(String(value))} />;
      case 'date':
        return (
          <DatePicker
            format="YYYY-MM-DD"
            onChange={(_, dateString) =>
              handleChange(Array.isArray(dateString) ? dateString.join(',') : dateString)
            }
          />
        );
      default:
        return <Input onChange={(e) => handleChange(e.target.value)} />;
    }
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `${title}을(를) 입력하세요.` }]}
        >
          {renderInputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
