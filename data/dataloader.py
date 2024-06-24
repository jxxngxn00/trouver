import pandas as pd
import os
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from itertools import repeat
from sqlalchemy import create_engine

class dataloader:
    
    def __init__(self,path):
        #ratings_df
        COL_NAME = ['user_idx','regioncd_value','pla_r_rate','pla_r_date']
        ratings_df = pd.read_csv("./dataset/ml-1m/rating.csv",sep=';', header=0, engine='python', names=COL_NAME)
        ratings_df.drop("pla_r_date", axis=1, inplace=True)
        # print(ratings_df)

        #travels_df
        COL_NAME = ['contentsid','contentscd','regioncd_value','title','tag']
        travels_df = pd.read_csv(path+"/travel.csv",sep=';', header=0, engine='python', usecols=COL_NAME)
        travels_df = travels_df.loc[(travels_df.contentscd=='c1'),COL_NAME]

        #users_df
        user='root'
        password='1234'
        host = 'localhost'
        database = 'trouver'
        # SQLAlchemy 엔진 생성
        engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}/{database}')
        query = '''
                SELECT 
                    row_number () over(order by user_register) as user_idx,
                    BIN_TO_UUID(user_id) as user_id,user_mbti, 
                    user_gender,
                    @age := FLOOR(DATEDIFF(NOW(), user_birth) / 365.25) AS age,
                    CASE
                        WHEN @age <=19 THEN 00
                        WHEN @age BETWEEN 20 AND 29 THEN 20
                        WHEN @age BETWEEN 30 AND 39 THEN 30
                        WHEN @age BETWEEN 40 AND 49 THEN 40
                        WHEN @age BETWEEN 50 AND 59 THEN 50
                        WHEN @age >=60 THEN '60+'
                    END AS user_age_group
                FROM user'''
        users_df = pd.read_sql(query, engine)

        #travels_df -- tags_df
        travels_df["tag"] = travels_df["tag"].fillna("없음")
        tags_df = travels_df.tag.str.get_dummies(sep=",")
        travels_df.drop("tag",axis=1, inplace=True)
        travels_df = pd.concat([travels_df, tags_df], axis=1)
        # print(tags_df)

        #users_df -- genders_df, ages_df
        genders_df = pd.get_dummies(users_df.user_gender, prefix="gender")
        genders_df = genders_df.astype(int)
        users_df = pd.concat([users_df, genders_df], axis=1)
        users_df.drop("user_gender", axis=1, inplace=True)

        ages_df = pd.get_dummies(users_df.user_age_group)
        ages_df.columns = ["19세 이하","20대", "30대", "40대", "50대", "60대 이상"]
        ages_df = ages_df.astype(int)
        users_df = pd.concat([users_df, ages_df], axis=1)
        users_df.drop("user_age_group", axis=1, inplace=True)
        users_df.drop("age", axis=1, inplace=True)

        #users_df =-- mbti_df
        mbti_df = pd.get_dummies(users_df.user_mbti)
        mbti_df = mbti_df.astype(int)
        users_df = pd.concat([users_df, mbti_df], axis=1)
        users_df.drop("user_mbti",axis=1, inplace=True)

        #merge dataset
        ratings_df = ratings_df.merge(users_df, how="left")
        ratings_df = ratings_df.merge(travels_df, how="left")
        ratings_df.drop("user_id", inplace=True, axis=1)
        ratings_df.drop("title", inplace=True, axis=1)
        ratings_df.drop("contentsid", inplace=True, axis=1)
        ratings_df.drop("contentscd", inplace=True, axis=1)
        # print(">>>>>>>>>>>>>>>> object_columns")
        # object_columns = ratings_df.select_dtypes(include=['object']).columns
        # print(object_columns)
        # print(">>>>>>>>>>>>>>>> object_columns end")

        ratings_df = ratings_df.astype("float32")

        self.target = ratings_df["pla_r_rate"]
        self.binary_target = (self.target >= 4.0).astype("float32")

        ratings_df.drop("pla_r_rate", inplace=True, axis=1)
        self.X = ratings_df

        #embedding_index for lookup same field
        # continuous_field_name = {"median_household_income": ["median_household_income"]}
        categorical_field_name = {"user_idx": ["user_idx"],
                                  "regioncd_value": ["regioncd_value"],
                                  "gender": list(genders_df.columns),
                                  "age": list(ages_df.columns),
                                  "mbti": list(mbti_df.columns),
                                  "tags": list(tags_df.columns)}
        all_field_name = list(categorical_field_name.keys())

        self.embbeding_lookup_index = []
        for index, field in enumerate(all_field_name):
            # if field in continuous_field_name.keys():
            #    self.embbeding_lookup_index.extend([index])
            if field in categorical_field_name.keys():
               self.embbeding_lookup_index.extend(repeat(index, len(categorical_field_name[field])))
        self.num_fields = len(all_field_name)

    def get_num_fields(self):
        return self.num_fields

    def get_embedding_lookup_index(self):
        return self.embbeding_lookup_index

    def make_binary_set(self,test_size=0.1):
        x_train,x_test,y_train,y_test = train_test_split(self.X,self.binary_target,test_size= test_size)
        return x_train,x_test,y_train,y_test

    def make_regression_set(self,test_size=0.1):
        x_train, x_test, y_train, y_test = train_test_split(self.X, self.target,test_size= test_size)
        return x_train, x_test, y_train, y_test




if __name__ == "__main__":
    loader= dataloader("./dataset/ml-1m")
    ratings_df = loader.make_binary_set()
    print(ratings_df)