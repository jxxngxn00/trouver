import React, { useState } from 'react';
import { Dialog, Form, Input, Button, Picker } from 'antd-mobile';
import { CloseCircleFilled } from '@ant-design/icons';

const ProfileUpdate = ({ user_id }) => {
    const [form] = Form.useForm();
    const onSubmit = () => {
        const values = form.getFieldValue();
        Dialog.alert({
            content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        });
    };
    
    return (
    <>
        <Form form={form} style={{ width : "95vw"}} initialValues={{
                a: '도레미',
                b: [],
            }} footer={<Button block color='primary' onClick={onSubmit} size='large'>
                변경하기
            </Button>}>
            <Form.Item name='a' label='이름'>
            <Input placeholder='이름' disabled/>
            </Form.Item>
            <Form.Item name='birth' label='생년월일'>
            <Input placeholder='미입력' disabled/>
            </Form.Item>
            <MbtiPickerInputItem />
        </Form>
    </>
    );
};

const mbtiColumns = [
    [ { label : 'E', value: 'E'}, { label : 'I', value: 'I'}, ], 
    [ { label : 'N', value: 'N'}, { label : 'S', value: 'S'}, ], 
    [ { label : 'F', value: 'F'}, { label : 'T', value: 'T'}, ], 
    [ { label : 'P', value: 'P'}, { label : 'J', value: 'J'}, ], 
];

const MbtiPickerInputItem = () => {
    const [pickerVisible, setPickerVisible] = useState(false);
    const [value, setValue] = useState([]);
    return (<Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.mbti !== curValues.mbti}>
      {({ getFieldValue, setFieldsValue }) => (
        <Form.Item 
        name='mbti' 
        label='Mbti' 
        trigger='onConfirm' 
        arrowIcon={getFieldValue('mbti') ? (
            <CloseCircleFilled style={{
                color: 'var(--adm-color-light)',
                fontSize: 14,
            }} 
                onClick={e => {
                    e.stopPropagation();
                    setFieldsValue({ mbti: [] });
                }}
            />) : (true)} 
            onClick={() => { setPickerVisible(true);}}
        >
        <Picker
            columns={mbtiColumns}
            visible={pickerVisible}
            onClose={() => {setPickerVisible(false)}}
            value={value}
            onConfirm={v => {
                setValue(v);
                setPickerVisible(false);
                setFieldsValue( {mbti : v} );
            }}
        >
            {value => value ? value.map(v => v.label).join('') : 'mbti를 설정해주세요!'}
        </Picker>
        </Form.Item>)}
    </Form.Item>);
};
export default ProfileUpdate;