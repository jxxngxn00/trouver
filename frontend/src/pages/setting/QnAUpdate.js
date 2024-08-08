import { Modal, Picker, TextArea, Button, Form } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity"
import TopBtnBar from '../components/TopBtnBar';
import axios from 'axios';

export const QnAUpdate = () => {
    const [form] = Form.useForm();
    const go = useNavigate();
    const { qid } = useParams();
    const [value, setValue] = useState([]);
    const [qna, setQna] = useState();

    const getQnaDetail = async () => {
        const res = await axios.get(`/api/qna/detail/${qid}`);
        console.log(">>> detail : ", res.data[0]);
        return res.data[0];
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getQnaDetail();
            setQna(result);
            form.setFieldsValue({
                cate: [result.q_cate],
                content: result.q_content,
            });
        };
        fetchData();
    }, [qid]);

    const qnaColumns = [
        [{ label: '상품', value: '0'},
        { label: '일정', value: '1'},
        { label: '회원', value: '2'},
        { label: '기타', value: '3'},]
    ];

    // 저장 완료 모달 팝업
    const saveConfirm = async () => {
        const params = {
            q_cate : form.getFieldValue('cate')[0],
            q_content : form.getFieldValue('content'),
            q_id : qid,
            user_id : 'fdb1a386-48f1-11ef-bcc9-af0a24947caf' 
        };
        console.log(params);
        axios.patch(`/api/qna/update/${qid}`, params);
        Modal.alert({
            header: ( 
            <UseAnimations 
                animation={activity} 
                size={64}
                speed={0.5}
            />),
            title: '문의사항 수정 완료',
            content: '빠른 시일 내에 답변 드리겠습니다.',
            confirmText: '확인',
            closeOnMaskClick: true,
            onConfirm: () => {go('/qna')},
        });
    };

    return (
        <StyleDiv className='homeBgDiv ViewPlanBgDiv'>
            <TopBtnBar />
            <Form
                form={form}
                className='qnaInsertForm'
                layout='horizontal'
                footer={
                    <Button block type='submit' color='primary' size='large' onClick={() => saveConfirm()}>
                        수정하기
                    </Button>
                }>
                <ExplainDiv>
                    궁금한 점이나 불편사항, 개선할 점이 있으면<br/>자유롭게 이야기 해주세요. 👂
                </ExplainDiv>
                <Form.Item 
                    name='cate' 
                    label='문의사항'
                    trigger='onConfirm'
                    rules={[{ required: true, message: '필수 입력 사항입니다.'}]}
                    onClick={(e, pickerRef) => {
                        if (pickerRef.current) { pickerRef.current.open(); }
                    }}
                >
                    <Picker
                        columns={qnaColumns}
                        value={value}
                        onConfirm={(v) => setValue(v)}>
                        {value => value && value.length > 0 ? value[0].label : '유형을 선택하세요.'}
                    </Picker>
                </Form.Item>
                <Form.Item name='content' rules={[{ required: true, message: '필수 입력 사항입니다.' }]}>
                    <TextArea className='textArea'
                        defaultValue={qna?.q_content}
                        placeholder='소중한 의견을 여기에 담아 보내주세요.'
                        autoSize={{ minRows: 10, maxRows: 15 }} />
                </Form.Item>
            </Form>
        </StyleDiv>
    );
};

const StyleDiv = styled.div`
    width: 100vw;
    & .qnaInsertForm { 
        width : 90%; 
        margin-top: 3vh;
        & button { background-color : black }
    }
`;
const ExplainDiv = styled.div`
    padding: 5vh 2vw;
    text-align: center;
    font-size: 1rem;
`;

export default QnAUpdate;
