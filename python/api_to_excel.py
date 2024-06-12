import requests
import pandas as pd

# data 담을 list 생성
records = []

# API URL 및 헤더
# https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=5be5478c4f4447d48ee3a43ad9816086&locale=kr
api_url = "https://api.visitjeju.net/vsjApi/contents/searchList"
headers = {
    "Content-Type": "application/json"
}


for i in range(1,55):

    params = {
        "apiKey": "5be5478c4f4447d48ee3a43ad9816086",  # API 키
        "locale": "kr",
        "page": i
        # 추가 필요한 파라미터들을 여기에 추가하세요.
    }
    # API 데이터 가져오기
    response = requests.get(api_url, headers=headers, params=params)
    response.raise_for_status()
    data = response.json()
    print(">>> Page :",i,"번째 데이터 가져오는 중 ...")
    # print('data : ',data)

    # 데이터 가공
    # items = data['items']
    items = data.get('items',[])
    

    for item in items:
        if item is None:
            continue

        contentsid = item.get('contentsid','') or ''                        # 콘텐츠코드
        label = item.get('contentscd','').get('label','') or ''              # 콘텐츠코드 라벨
        contentscd = item.get('contentscd','').get('value','') or ''            # 콘텐츠코드 값
            
        title = item.get('title', '') or ''                                     # 콘텐츠 명

        if item.get('region1cd','') is not None:
            region1cd_value = item.get('region1cd','').get('value','') or ''       # 1차 지역코드 값 (수)
            region1cd_label = item.get('region1cd','').get('label','') or ''        # 1차 지역코드 라벨

        if item.get('region2cd','') is not None:
            region2cd_value = item.get('region2cd','').get('value','') or ''        # 2차 지역코드 값(수)
            region2cd_label = item.get('region2cd','').get('label','') or ''        # 2차 지역코드 라벨
        
        address = item.get('address', '') or ''                                 # 주소
        roadaddress = item.get('roadaddress', '') or ''                         # 도로명 주소

        tag = item.get('alltag', '') or ''                                         # 태그
        introduction = item.get('introduction', '') or ''                         # 간단 소개
        latitude = item.get('latitude', '') or ''                                 # 위도
        longitude = item.get('longitude', '') or ''                             # 경도
        postcode = item.get('postcode', '') or ''                                # 우편번호
        phoneno = item.get('phoneno', '') or ''                                 # 전화번호

        # print('>>> repPhoto : ',item.get('repPhoto',''))
        if item.get('repPhoto','') is not None:
            descseo = item.get('repPhoto', '').get('descseo', '') or ''            # 검색엔진 최적화 키워드
            imgpath = item.get('repPhoto', '').get('photoid', '').get('imgpath', '') or ''            # 일반 이미지 경로
            thumbnailpath = item.get('repPhoto', '').get('photoid', '').get('thumbnailpath', '') or ''    # 썸네일 이미지 경로

        record = {
            
            'contentsid' : contentsid,
            'label': label,                 # 콘텐츠코드 라벨
            'contentscd': contentscd,            # 콘텐츠코드 값
            
            'title': title,                                     # 콘텐츠 명

            'region1cd_value': region1cd_value,        # 1차 지역코드 값 (수)
            'region1cd_label': region1cd_label,        # 1차 지역코드 라벨

            'region2cd_value': region2cd_value,        # 2차 지역코드 값(수)
            'region2cd_label': region2cd_label,        # 2차 지역코드 라벨

            'address': address,                                 # 주소
            'roadaddress': roadaddress,                         # 도로명 주소

            'tag': tag,                                         # 태그
            'introduction': introduction,                         # 간단 소개
            'latitude': latitude,                                 # 위도
            'longitude': longitude,                             # 경도
            'postcode': postcode,                                # 우편번호
            'phoneno': phoneno,                                 # 전화번호

            'descseo': descseo,            # 검색엔진 최적화 키워드
            'imgpath': imgpath,            # 일반 이미지 경로
            'thumbnailpath': thumbnailpath,    # 썸네일 이미지 경로
        }
        records.append(record)


# 데이터프레임 생성
df = pd.DataFrame(records)

# 엑셀 파일로 저장
output_file = '../data/visitjeju_data.xlsx'
df.to_excel(output_file, index=False)

print(f"Data saved to {output_file}")
