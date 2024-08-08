import db from '../database/db.js'; // 데이터베이스 연결 설정

// 여행 장소 목록 불러오기
export const MgetPlaceList = (req, res) => {
    try {
        // console.log('MgetPlaceList');
        const sql = `SELECT BIN_TO_UUID(pla_id) as pla_id, pla_name, pla_cate, pla_thumb, pla_rate_avg FROM place`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log( rows );
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};
// 여행 장소 목록 5개 불러오기
export const MgetPlaceList5 = (req, res) => {
    try {
        // console.log('MgetPlaceList');
        const sql = `SELECT BIN_TO_UUID(pla_id) as pla_id, pla_name, pla_cate, pla_thumb, pla_rate_avg FROM place ORDER BY pla_hit LIMIT 5`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log( rows );
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 카테고리 별 여행 장소 5개 불러오기
export const MgetPlaceListByCate5 = (req, res) => {
    try {
        // console.log('MgetPlaceList');
        let sql = `SELECT BIN_TO_UUID(pla_id) as pla_id, pla_name, pla_cate, pla_thumb, 
        pla_rate_avg FROM place `;
        let searchTerm = "";
        switch(req.params.cate) {
            case "맛집" : 
                searchTerm = `WHERE pla_cate = '음식점'`;
                break;
            case "카페" : 
                searchTerm = `WHERE pla_cate = '음식점' AND pla_name LIKE '%카페%'`;
                break;
            case "숙소" : 
                searchTerm = `WHERE pla_cate = '숙박' `; 
                break;
            case "액티비티" : 
                searchTerm = `WHERE pla_cate = '축제/행사' `;
                break;
            case "박물관∙전시회" : 
                searchTerm = `WHERE pla_name LIKE '%박물관%' OR pla_name LIKE '%전시%'`;
                break;
            case "자연경관" : 
                searchTerm = `WHERE pla_cate = '관광지'`;
                break;
            case "쿠폰∙할인" : 
                searchTerm = `WHERE pla_cate = '정보'`;
                break;
        }
        sql = sql + searchTerm + " LIMIT 5";
        db.query(sql, searchTerm, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log( rows );
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 카테고리 별 여행 장소 목록 불러오기
export const MgetPlaceListByCate = (req, res) => {
    try {
        // console.log('MgetPlaceList');
        let sql = `SELECT BIN_TO_UUID(pla_id) as pla_id, pla_name, pla_cate, 
                pla_addr1, pla_thumb, pla_rate_avg , pla_saved, pla_tag
            FROM place `;
        let searchTerm = "";
        switch(req.params.cate) {
            case "맛집" : 
                searchTerm = `WHERE pla_cate = '음식점'`;
                break;
            case "카페" : 
                searchTerm = `WHERE pla_cate = '음식점' AND pla_name LIKE '%카페%'`;
                break;
            case "숙소" : 
                searchTerm = `WHERE pla_cate = '숙박' `; 
                break;
            case "액티비티" : 
                searchTerm = `WHERE pla_cate = '축제/행사' `;
                break;
            case "박물관∙전시회" : 
                searchTerm = `WHERE pla_name LIKE '%박물관%' OR pla_name LIKE '%전시%'`;
                break;
            case "자연경관" : 
                searchTerm = `WHERE pla_cate = '관광지'`;
                break;
            case "쿠폰∙할인" : 
                searchTerm = `WHERE pla_cate = '정보'`;
                break;
        }
        sql = sql + searchTerm + " ORDER BY pla_hit";
        db.query(sql, searchTerm, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log( rows );
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 여행 장소 상세보기
export const MgetPlace = (req, res) => {
    try {
        const sql = `SELECT BIN_TO_UUID(pla_id) as pla_id, pla_name, pla_cate, pla_thumb, pla_image, pla_rate_avg, pla_addr1, pla_content, pla_phone FROM place WHERE BIN_TO_UUID(pla_id)= ?
        `;
        db.query(sql, [req.params.id], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            res.send(row);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }    
};

// 검색어로 여행 장소 찾기
export const MgetPlaceListBySearch = (req, res) => {
    try {
        const sql = `SELECT BIN_TO_UUID(pla_id) as pla_id, pla_name, pla_cate, pla_thumb, pla_image, pla_rate_avg, pla_addr1, pla_content, pla_phone FROM place WHERE pla_name LIKE ?`;
        const param = "%"+[req.params.searchTerm]+"%";
        db.query(sql, [param], (err, rows) => {
            if (err) {A
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log( rows );
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }  
}

// 조회수 증가
export const MupdateHits = (req, res) => {
    try {
        const sql = `
            UPDATE place
            SET pla_hit = pla_hit + 1
            WHERE BIN_TO_UUID(pla_id) = ?
        `;
        db.query(sql, [req.params.id], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
            };
        })
    } catch (error) {
        console.error("Error : ", error);
        res.status(500).send('Server error');
    }
}


export default MgetPlaceList;