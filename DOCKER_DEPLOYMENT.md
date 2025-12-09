# Docker Deployment Guide

## Production-Grade Skin Lesion Detection Application

This application uses Docker and Docker Compose to deploy a Flask backend and React frontend with production best practices.

## 🏗️ Architecture

- **Backend**: Flask + Gunicorn with PyTorch models
- **Frontend**: React + TypeScript served by Nginx
- **Reverse Proxy**: Nginx handles routing and serves static files
- **Containerization**: Multi-stage Docker builds for optimized images

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 4GB RAM available
- Model files (.pkl) in CNN-AI directory

## 🚀 Quick Start

1. **Ensure model files exist**:
   ```bash
   dir CNN-AI\*.pkl
   ```
   Required files:
   - model1_efficientnet_b0.pkl
   - model2_shufflenetv2.pkl
   - model3_mobilenetv3_small.pkl

2. **Build and run containers**:
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application**:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

4. **Check container status**:
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

## 🛠️ Production Features

### Backend (Flask)
- ✅ Multi-stage build for smaller image size
- ✅ Gunicorn WSGI server with 2 workers
- ✅ Non-root user for security
- ✅ Health check endpoint
- ✅ Request timeouts (120s for ML inference)
- ✅ Resource limits (2 CPU, 4GB RAM)

### Frontend (React)
- ✅ Multi-stage build (Node build + Nginx serve)
- ✅ Nginx with security headers
- ✅ Gzip compression enabled
- ✅ Static asset caching (1 year)
- ✅ API proxy to backend
- ✅ Non-root user for security
- ✅ Resource limits (0.5 CPU, 512MB RAM)

### Docker Compose
- ✅ Health checks for both services
- ✅ Automatic restart policies
- ✅ Isolated network
- ✅ Volume mounts for model files
- ✅ Dependency management

## 📝 Available Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

### Scale services (if needed)
```bash
docker-compose up -d --scale backend=2
```

### Check health status
```bash
curl http://localhost:5000/health
curl http://localhost:8080/health
```

### Clean up everything
```bash
docker-compose down -v
docker system prune -a
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file (copy from `.env.example`):
```env
FLASK_ENV=production
PYTHONUNBUFFERED=1
VITE_API_URL=/api
```

### Port Configuration
Edit `docker-compose.yml` to change ports:
```yaml
ports:
  - "8080:8080"  # Frontend: <host>:<container>
  - "5000:5000"  # Backend: <host>:<container>
```

### Resource Limits
Adjust in `docker-compose.yml`:
```yaml
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 4G
```

## 🐛 Troubleshooting

### Container fails to start
```bash
docker-compose logs backend
docker-compose logs frontend
```

### Model files not found
Ensure .pkl files are in CNN-AI directory and volumes are correctly mounted.

### Port already in use
```bash
# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :5000

# Change ports in docker-compose.yml
```

### High memory usage
- Reduce number of Gunicorn workers
- Adjust resource limits in docker-compose.yml

### API requests failing
- Check nginx.conf proxy configuration
- Verify backend is healthy: `curl http://localhost:5000/health`
- Check network connectivity: `docker network inspect combio-asg_app-network`

## 📊 Monitoring

### Container stats
```bash
docker stats
```

### Resource usage
```bash
docker-compose top
```

## 🔒 Security Features

1. **Non-root users**: Both containers run as non-root
2. **Read-only model files**: Model volumes mounted as read-only
3. **Security headers**: Nginx adds HSTS, X-Frame-Options, etc.
4. **Network isolation**: Services communicate via internal network
5. **Resource limits**: Prevent resource exhaustion

## 🚀 Deployment to Cloud

### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker-compose build
docker tag combio-asg-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/backend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/backend:latest
```

### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/<project-id>/backend CNN-AI/
gcloud run deploy backend --image gcr.io/<project-id>/backend --platform managed
```

### Digital Ocean
- Use Docker Compose directly on a Droplet
- Or deploy to App Platform with Dockerfile

## 📈 Performance Tips

1. **Use GPU for inference** (if available):
   - Add GPU support to docker-compose.yml
   - Ensure CUDA drivers installed on host

2. **Enable caching**:
   - Model weights are loaded once on startup
   - Static assets cached by Nginx

3. **Load balancing**:
   - Use multiple backend replicas
   - Add Nginx as reverse proxy/load balancer

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Build and push
  run: |
    docker-compose build
    docker-compose push
```

### Jenkins
```groovy
stage('Deploy') {
  steps {
    sh 'docker-compose up -d --build'
  }
}
```

## 📞 Support

For issues or questions:
- Check logs: `docker-compose logs`
- Review Docker documentation
- Ensure all prerequisites are met

---

**Developer**: Steven Liementha  
**Version**: 1.0.0  
**Last Updated**: December 2025
