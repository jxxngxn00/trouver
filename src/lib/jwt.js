import jwt from 'jsonwebtoken';
dotenv.config();

const generateToken = (member) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: member.id,
        user_id: member.user_id,
        nickname: member.nickname,
      },
      '16b9ba268ce990f6c8307291b2fdc793', //Secret Key
      {
        expiresIn: '1d', //유효기간
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generateToken };