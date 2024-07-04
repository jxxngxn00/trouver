from flask import Flask, request, jsonify
import tensorflow as tf
import os

app = Flask(__name__)

# Load the model
model_path = 'deep_FM2024-06-21-15-08-28.keras'
if not os.path.exists(model_path):
    print(f"Error: File not found at {model_path}.")
else:
    model = tf.keras.models.load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    # Assuming data is a list of feature vectors
    predictions = model.predictW(data)
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
