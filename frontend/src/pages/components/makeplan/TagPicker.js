import React from 'react';
import { CheckBoxInput, CheckBoxLabel } from '../../../css/Tag';

function TagPicker() {
    return (
        <div className='setDateDiv'>
            <div className='labelDiv'>
                <span className='quest'>어떤 여행을 <br/>하고 싶으세요?</span>
                <span className='detail_quest'>한가지를 꼭 선택해주세요.</span>
            </div>
            <div className='tagDiv'>
                <div className='compPicker'>
                    <span className='tagQuest'>누구와 함께 여행을 가나요?</span>
                    <div className='tagCheckBoxWrapper'>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='company1' name='company'/>
                            <CheckBoxLabel htmlFor='company1'>혼자</CheckBoxLabel>
                        </div>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='company2' name='company'/>
                            <CheckBoxLabel htmlFor='company2'>친구와</CheckBoxLabel>
                        </div>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='company3' name='company'/>
                            <CheckBoxLabel htmlFor='company3'>연인과</CheckBoxLabel>
                        </div>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='company4' name='company'/>
                            <CheckBoxLabel htmlFor='company4'>가족과</CheckBoxLabel>
                        </div>
                    </div>
                </div>
                <div className='tagPicker'>
                    <span className='tagQuest'>여행 테마 / 취미 / 관심사를 알려주세요!</span>
                    <div className='tagCheckBoxWrapper'>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='tag1' name='tag'/>
                            <CheckBoxLabel htmlFor='tag1'>쇼핑</CheckBoxLabel>
                        </div>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='tag2' name='tag'/>
                            <CheckBoxLabel htmlFor='tag2'>스포츠</CheckBoxLabel>
                        </div>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='tag3' name='tag'/>
                            <CheckBoxLabel htmlFor='tag3'>영화관람</CheckBoxLabel>
                        </div>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='tag4' name='tag'/>
                            <CheckBoxLabel htmlFor='tag4'>감귤따기</CheckBoxLabel>
                        </div>
                        <div className='tagCheckBox'>
                            <CheckBoxInput type='checkbox' id='tag5' name='tag'/>
                            <CheckBoxLabel htmlFor='tag5'>맛집탐험</CheckBoxLabel>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default TagPicker;