from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import torch
import torchvision.models as models
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app, supports_credentials=True)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model1 = models.efficientnet_b0(pretrained=False)
model1.classifier[1] = torch.nn.Linear(model1.classifier[1].in_features, 3)
model1.load_state_dict(torch.load('model1_efficientnet_b0.pkl', map_location=device))
model1.to(device)
model1.eval()

model2 = models.shufflenet_v2_x1_0(pretrained=False)
model2.fc = torch.nn.Linear(model2.fc.in_features, 3)
model2.load_state_dict(torch.load('model2_shufflenetv2.pkl', map_location=device))
model2.to(device)
model2.eval()

model3 = models.mobilenet_v3_small(pretrained=False)
model3.classifier[3] = torch.nn.Linear(model3.classifier[3].in_features, 3)
model3.load_state_dict(torch.load('model3_mobilenetv3_small.pkl', map_location=device))
model3.to(device)
model3.eval()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/getresult', methods=['POST'])
@cross_origin()
def members():
    if 'files' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['files']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        classes = ['melanoma', 'nevus', 'seborrheic_keratosis']
        
        pro_file = preprocess_image(file)
        with torch.no_grad():
            # Get predictions from each model
            result1 = model1(pro_file)
            pred1 = torch.argmax(result1, dim=1).item()
            
            result2 = model2(pro_file)
            pred2 = torch.argmax(result2, dim=1).item()
            
            result3 = model3(pro_file)
            pred3 = torch.argmax(result3, dim=1).item()
        
        # Ensemble prediction (majority voting)
        predictions = [pred1, pred2, pred3]
        ensemble_pred = max(set(predictions), key=predictions.count)
        
        label = {
            "melanoma": "Melanoma",
            "nevus": "Nevus",
            "seborrheic_keratosis": "Seborrheic Keratosis",
        }
        
        return jsonify({
            "model1": label.get(classes[pred1], "Unknown"),
            "model2": label.get(classes[pred2], "Unknown"),
            "model3": label.get(classes[pred3], "Unknown"),
            "ensemble": label.get(classes[ensemble_pred], "Unknown")
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def preprocess_image(file):
    img = Image.open(file).convert('RGB')
    img = img.resize((224, 224)) 
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_tensor = torch.from_numpy(img_array).permute(2, 0, 1).float()
    img_tensor = img_tensor.unsqueeze(0)
    return img_tensor.to(device)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)



