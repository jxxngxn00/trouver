import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const KakaoLogin = () => {
    
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 인가코드 주소에서 뽑아내기
    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get("code");
    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

    console.log("KAKAO CODE : ", KAKAO_CODE);

    // Access Token 받아오기
    const getAccessToken = async () => {
        if (accessTokenFetching) return;
        console.log("getAccessToken 호출");
        const api_key = 'a5afa7d1587b1934bd7c7606c42b481b';
        const redirect_uri = 'http://localhost:3000/kakaoLogin'
        try {
            setAccessTokenFetching(true);
            const response = await axios.post(
                `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${api_key}&redirect_uri=${redirect_uri}&code=${KAKAO_CODE}`,
                {
                    headers: {
                        "Content-Type" : "application/x-www-form-urlencoded",
                    },
                }
            );
            const accessToken = response.data.access_token;
            console.log("accessToken : ",accessToken);

            setUserInfo({
                ...userInfo,
                accessToken: accessToken,
            });

            setAccessTokenFetching(false);
        } catch (err) {
            console.error(err);
            setAccessTokenFetching(false);
        }
    };

    // 정보 요청
    const getProfile = async() => {
        try {
            console.log("getProfile 호출");
            if (userInfo?.accessToken) {
                console.log("accessToken in getProfile : ", userInfo.accessToken);
                const response = await axios.get(
                    "https://kapi.kakao.com/v2/user/me?secure_resource=true",
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.accessToken}`,
                            "Content-type" : `application/x-www-form-urlencoded;charset=utf-8`
                        },
                    }
                );
                console.log("message : ", response.data);
                setUserInfo({
                    ...userInfo,
                    name: response.data.kakao_account.profile.nickname,
                    email: response.data.kakao_account.email,
                    profileImage: response.data.kakao_account.profile.profile_image_url,
                    isLogin: true,
                });

                // console.log({
                //     name: response.data.kakao_account.profile.nickname,
                //     email: response.data.kakao_account.email,
                //     profileImage: response.data.kakao_account.profile.profile_image_url,
                //     isLogin: true,
                // })
                setLoading(false);
                navigate("/Home");
            } else {
                console.log("No accessToken available");
            }
        } catch (err) {
            console.error("Error : ",err);
        }
    };

    // 회원 중 있는지 확인 후 로그인 및 회원가입
    const getUser = async () => {
        console.log(userInfo?.email);
        try {
            const res = await axios.get(`/api/user/isSigned/${userInfo?.email}`);
            console.log(res.data);
            // if (res.data.length === 0 ) {
            //     axios.post(`/api/user/signup`, {
            //         name: userInfo.name,
            //         email: userInfo.email,
            //         profileImage: userInfo.profileImage,
            //     });
            // };

        } catch (error) {
            console.error("error :: ",error);
        }    
    }

    useEffect(()=> {
        if (loading) {
            if (KAKAO_CODE && !userInfo?.accessToken) {
                getAccessToken();
            }
            getProfile();
        }
        getUser();
    },[userInfo]);

    return (
        <div>
            오예 로긘 성공
        </div>
    ); 
};

export default KakaoLogin;