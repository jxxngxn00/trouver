import React from 'react';

function DatePickerCustom() {
    // const [startDate, setStartDate] = useState(new Date());

    return (
        <div className='setDateDiv'>
            <div className='labelDiv'>
                <span>언제 여행을 떠나시나요?</span>
            </div>
            <div className='dateDiv'>
                <div className='startDatePicker'>
                    <label>여행 시작일</label> <br/>
                    <input
                        type="date"
                        defaultValue={new Date()}
                    />
                </div>
                <div className='endDatePicker'>
                    <label>여행 종료일</label> <br/>
                    <input
                        type="date"
                        defaultValue={new Date()}
                    />
                </div>
            </div>
            
        </div>
    );
}

export default DatePickerCustom;
