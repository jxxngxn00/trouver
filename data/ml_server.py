# app.py
from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model # type: ignore
import os

app = Flask(__name__)
# Register the custom model class
@tf.keras.utils.register_keras_serializable()
class DeepFM(tf.keras.Model):
    def __init__(self, sparse_feature_dims, dense_feature_dims, embedding_dim=8, deep_layers=[32, 32]):
        super(DeepFM, self).__init__()
        self.embedding_layers = [tf.keras.layers.Embedding(input_dim=dim, output_dim=embedding_dim) for dim in sparse_feature_dims]
        self.flatten_layers = [tf.keras.layers.Flatten() for _ in sparse_feature_dims]
        self.dense_layers = [tf.keras.layers.Dense(units, activation='relu') for units in deep_layers]
        self.output_layer = tf.keras.layers.Dense(1, activation='sigmoid')
    
    def call(self, inputs):
        sparse_inputs, dense_inputs = inputs[:len(self.embedding_layers)], inputs[len(self.embedding_layers):]
        embeddings = [self.flatten_layers[i](self.embedding_layers[i](sparse_inputs[i])) for i in range(len(sparse_inputs))]
        concatenated_features = tf.keras.layers.Concatenate()([*embeddings, *dense_inputs])
        x = concatenated_features
        
        for dense_layer in self.dense_layers:
            x = dense_layer(x)
        
        fm_output = tf.keras.layers.Dense(1)(concatenated_features)
        deep_output = tf.keras.layers.Dense(1)(x)
        
        combined_output = tf.keras.layers.Concatenate()([fm_output, deep_output])
        output = self.output_layer(combined_output)
        
        return output
    
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "deep_FM2024-06-21-15-12-21.keras")
# Load the trained model
model = load_model("data/deep_FM2024-06-21-15-12-21.keras")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
