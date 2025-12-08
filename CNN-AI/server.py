from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import tensorflow as tf
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/getresult', methods=['POST'])
@cross_origin()
def members():
    if 'files' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['files']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        load_model = tf.keras.models.load_model('model1_efficientnet_b0.h5')
        classes = ['melanoma', 'nevus', 'seborrheic_keratosis']
        
        pro_file = preprocess_image(file)
        result = load_model.predict(pro_file)
        predict_label = np.argmax(result, axis=1)
        predict_label = classes[predict_label[0]]
        
        label = {
            "melanoma": "Melanoma",
            "nevus": "Nevus",
            "seborrheic_keratosis": "Seborrheic Keratosis",
        }
        predict_label = label.get(predict_label, "Unknown")
        return jsonify({"result": predict_label}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def preprocess_image(file):
    img = Image.open(file)
    img = img.resize((96, 96))
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)



