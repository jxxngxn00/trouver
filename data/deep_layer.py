import tensorflow as tf
from tensorflow import keras

class deep_part(keras.layers.Layer):
    def __init__(self, layer_list=[400, 400, 400], dropout_rate=0.5, activation="relu", **kwargs):
        super().__init__(**kwargs)
        self.activaiton_fn = keras.activations.get(activation)
        self.dropout_rate = dropout_rate
        self.dense_layer_list = [keras.layers.Dense(num_neuron, activation=self.activaiton_fn, name =f'Dense_{index}') for index,num_neuron in
                                 enumerate(layer_list)]
        self.output_layer = keras.layers.Dense(1, activation="relu",name = "deep_output")
        self.dropout_layers = [keras.layers.Dropout(self.dropout_rate, name=f'Dropout_{index}') for index in range(len(layer_list))]

    def call(self, inputs):
        embed_2d = inputs
        # (None,108,V)
        embed_2d = keras.layers.Flatten(name='flat_embed')(embed_2d)
        # (None,108 * V)
        result = embed_2d
        for dropout_layer, dense_layer in zip(self.dropout_layers, self.dense_layer_list):
            result = dropout_layer(result)
            result = dense_layer(result)
            
        deep_result = self.output_layer(result)
        #(None,1)
        return deep_result