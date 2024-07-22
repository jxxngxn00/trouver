import pandas as pd
import pymysql
import os

# 엑셀 파일 경로와 시트 이름
path = os.getcwd()
excel_file_path = path +'/data/dataset/visitjeju_data.xlsx'
sheet_name = '데이터'

# MySQL 연결 설정
user = 'trouver'
password = '1234'
host = 'localhost'
port = 3306
database = 'trouver'

# 엑셀 파일 읽기
df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
# print(df)
# Nan값 0 으로 대체
df = df.fillna(0)

# MySQL 연결
connection = pymysql.connect(
    host=host,
    user=user,
    password=password,
    database=database,
    port=port
)

# 데이터베이스에 데이터 삽입
try:
    with connection.cursor() as cursor:
        for index, row in df.iterrows():
            print('insert :::',index+1,row['title'])
            if row['label'] == "테마여행":
                continue

            
            sql = """
            insert into place (
                pla_cont_code, pla_name, pla_phone, pla_addr1, pla_addr2, pla_post,
                pla_content, pla_addr_x, pla_addr_y, pla_image, pla_thumb, pla_keyword, pla_cate,
                pla_tag, pla_id
            ) values ( 
                %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s, 
                %s, UUID_TO_BIN(UUID())
            )
            """
            cursor.execute(sql, (row['contentsid'], row['title'], row['phoneno'], row['address'], row['roadaddress'], row['postcode'],
                                 row['introduction'], row['longitude'], row['latitude'], row['imgpath'], row['thumbnailpath'], row['descseo'], row['label'],
                                 row['tag']))
        connection.commit()
    print('Data inserted successfully.')
except Exception as e:
    print(f"Error: {e}")
    connection.rollback()
finally:
    connection.close()
