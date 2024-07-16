// import bcrypt from bcrypt;
import placeDB from '../models/placeDB.js';

// const textToHash = async (text) => {
//     const saltRounds = 10;
//     try {
//         const hash = await bcrypt.hash(text, saltRounds);
//         return hash
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };

export const getPlaces = (req, res) => {
    placeDB.getPlaces((err, results) => {
        if (err) {
            return res.status(500).json({ error: err,message });
        }
        res.json(results);
    });
};

export default getPlaces;