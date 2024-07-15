from flask import Flask, request, jsonify
import tensorflow as tf

app = Flask(__name__)

# load the model
model_path = "../../data/deep_FM2024-06-21-15-12-21.keras"
model = tf.keras.models.load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict() :
    data = request.get_json(force=True)
    # Assuming data is a list of feature vectors
    predictions = model.predict(data)
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)