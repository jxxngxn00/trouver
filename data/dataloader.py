import pandas as pd
import os
from uszipcode import SearchEngine
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from itertools import repeat

class dataloader:
    def __init__(self,path):

        COL_NAME = ['user_id','regioncd_value','pla_r_rate','pla_r_date']
        rating_df = pd.read_csv(path+"/rating.csv",sep=';', header=0, engine='python', names=COL_NAME)
    
        COL_NAME = ['contentsid','regioncd_value','title','tag']
        travel_df = pd.read_csv(path+"/travel.csv",sep=';', header=0, engine='python', usecols=COL_NAME)

        COL_NAME = ['userId', 'gender', 'age', 'Occupation', 'zip_code']
        users_df = pd.read_csv(os.path.join(path, "users.dat"), sep='::', header=None, engine='python', names=COL_NAME)
        ratings_df.drop("timestamp", axis=1, inplace=True)

        #travels_df -- tags_df
        #genres_df
        genres_df = movies_df.genres.str.get_dummies(sep="|")
        movies_df.drop("genres", axis=1, inplace=True)
        movies_df = pd.concat([movies_df, genres_df], axis=1)

        #users_df -- genders_df
        #gender_df
        genders_df = pd.get_dummies(users_df.gender, prefix="gender")
        users_df = pd.concat([users_df, genders_df], axis=1)
        users_df.drop("gender", axis=1, inplace=True)
        ages_df = pd.get_dummies(users_df.age)
        ages_df.columns = ["Under 18", "18-24", "25-34", "35-44", "45-49", "50-55", "56+"]
        users_df = pd.concat([users_df, ages_df], axis=1)
        users_df.drop("age", axis=1, inplace=True)

        #users_df =-- mbti_df
        #occupation_df
        occupation_df = pd.get_dummies(users_df.Occupation)
        users_df = pd.concat([users_df, occupation_df], axis=1)
        users_df.drop("Occupation", axis=1, inplace=True)
        #state_df from zipcode

        search = SearchEngine(simple_zipcode=True)
        users_df["state"] = users_df.zip_code.apply(lambda x: search.by_zipcode(x).to_dict()["state"])
        state_df = pd.get_dummies(users_df.state)
        users_df = pd.concat([users_df, state_df], axis=1)
        users_df.drop("state", axis=1, inplace=True)

        #merge dataset
        ratings_df = ratings_df.merge(users_df, how="left")
        ratings_df = ratings_df.merge(movies_df, how="left")
        ratings_df = ratings_df.astype("float32")
        self.target = ratings_df["rating"]
        self.binary_target = (self.target >= 4.0).astype("float32")

        ratings_df.drop("rating", inplace=True, axis=1)
        self.X = ratings_df
        #embedding_index for lookup same field
        continuous_field_name = {"median_household_income": ["median_household_income"]}
        categorical_field_name = {"userId": ["userId"],
                                  "movieId": ["movieId"],
                                  "gender": list(genders_df.columns),
                                  "age": list(ages_df.columns),
                                  "occupation": list(occupation_df.columns),
                                  "state:": list(state_df.columns),
                                  "genres": list(genres_df.columns),
                                  "year": list(year_df.columns)}
        all_field_name = list(continuous_field_name.keys()) + list(categorical_field_name.keys())

        self.embbeding_lookup_index = []
        for index, field in enumerate(all_field_name):
            if field in continuous_field_name.keys():
               self.embbeding_lookup_index.extend([index])
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
    loader= dataloader("./dataset")
    ratings_df = loader.make_train_set()
    print(ratings_df)