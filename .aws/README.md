# AWS ECS Deployment Guide

## 🚀 Overview

This directory contains the configuration files for deploying the Vendorify Next.js application to AWS ECS using a tag-based CI/CD pipeline.

## 📋 Prerequisites

1. **AWS Account** with appropriate permissions
2. **GitHub Account** with repository access
3. **AWS CLI** installed and configured
4. **AWS Infrastructure** already set up (ECR, ECS, IAM roles)

## 🏗️ Infrastructure Setup (Manual)

Before using the CI/CD pipeline, you need to manually set up the following AWS resources:

1. **Create ECR Repository**
   - Go to ECR → Create repository
   - Name: `vendorify-app`

2. **Create ECS Cluster**
   - Go to ECS → Create cluster
   - Name: `vendorify-cluster`
   - Infrastructure: AWS Fargate

3. **Create Task Definition**
   - Use the `task-definition.json` as a template
   - Update the image URI with your ECR repository
   - Update IAM roles

4. **Create ECS Service**
   - Name: `vendorify-service`
   - Use the task definition created above
   - Configure load balancer (ALB)

5. **Create IAM Roles**
   - `ecsTaskExecutionRole` - for ECS to pull images and write logs
   - `ecsTaskRole` - for the container to access AWS services

## 🔐 GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Add the following secrets:

   | Secret Name | Description | How to Get |
   |-------------|-------------|------------|
   | `AWS_ACCESS_KEY_ID` | AWS access key | IAM → Users → Security credentials |
   | `AWS_SECRET_ACCESS_KEY` | AWS secret key | IAM → Users → Security credentials |

## 🔄 CI/CD Pipeline - Tag-Based Deployment

The pipeline deploys **ONLY** when you create a version tag:

### Automatic Deployment via Git Tag

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Create and push a version tag**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

   Or create and push in one command:
   ```bash
   git tag v1.0.0 && git push origin v1.0.0
   ```

3. The pipeline will automatically:
   - ✅ Trigger on the tag push
   - 🏗️ Build the Docker image
   - 🏷️ Tag it with your version (e.g., `v1.0.0`)
   - 📤 Push to Amazon ECR
   - 🚀 Deploy to ECS
   - ⏳ Wait for deployment stability

### Version Tag Format

Tags must follow semantic versioning: `v*.*.*`

Examples:
- `v1.0.0` - Major release
- `v1.2.3` - Minor/patch release
- `v2.0.0-beta` - Pre-release

### Manual Deployment

You can also trigger deployments manually from GitHub Actions:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to AWS ECS** workflow
3. Click **Run workflow**
4. Enter the tag version (e.g., `v1.0.0`)
5. Click **Run workflow**

### View Deployments

Check deployment status:
- Go to **Actions** tab in your GitHub repository
- Click on the running workflow
- Monitor the deployment progress

## 📊 Monitoring

### CloudWatch Logs
```bash
aws logs tail /ecs/vendorify-app --follow
```

### ECS Service Status
```bash
aws ecs describe-services \
  --cluster vendorify-cluster \
  --services vendorify-service
```

### Task Status
```bash
aws ecs list-tasks \
  --cluster vendorify-cluster \
  --service-name vendorify-service
```

## 🔧 Configuration Files

- **`deploy-to-ecs.yml`** - GitHub Actions workflow for tag-based CI/CD
- **`task-definition.json`** - ECS task configuration

## 📦 Versioning Strategy

### Semantic Versioning

Follow semantic versioning principles:

- **MAJOR** (v1.0.0 → v2.0.0): Breaking changes
- **MINOR** (v1.0.0 → v1.1.0): New features, backward compatible
- **PATCH** (v1.0.0 → v1.0.1): Bug fixes, backward compatible

### Deployment Workflow

```bash
# Development
git checkout -b feature/new-feature
# ... make changes ...
git commit -m "Add new feature"
git push origin feature/new-feature

# After PR is merged to main
git checkout main
git pull origin main

# Create release tag
git tag v1.1.0
git push origin v1.1.0  # This triggers deployment!

# Check existing tags
git tag -l

# Delete a tag if needed (local)
git tag -d v1.0.0

# Delete a tag (remote)
git push origin --delete v1.0.0
```

## 🌍 Environment Variables

Add environment variables to the task definition:

```json
"environment": [
  {
    "name": "NODE_ENV",
    "value": "production"
  },
  {
    "name": "NEXT_PUBLIC_API_URL",
    "value": "https://api.example.com"
  }
]
```

For sensitive data, use secrets:

```json
"secrets": [
  {
    "name": "DATABASE_URL",
    "valueFrom": "arn:aws:secretsmanager:region:account:secret:secret-name"
  }
]
```

## 💰 Cost Optimization

- **Fargate Spot**: Use Fargate Spot for non-production environments
- **Auto Scaling**: Configure ECS service auto-scaling based on CPU/memory
- **Task Size**: Adjust CPU and memory based on actual usage

## 🛠️ Troubleshooting

### Deployment Not Triggering

1. Verify tag format matches `v*.*.*`
2. Check GitHub Actions is enabled
3. Ensure AWS credentials are set in GitHub Secrets

### Tag Already Exists

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0

# Create new tag
git tag v1.0.1
git push origin v1.0.1
```

### Deployment Fails

1. Check GitHub Actions logs
2. Verify AWS credentials are correct
3. Ensure IAM roles have necessary permissions

### Container Won't Start

1. Check CloudWatch logs
2. Verify environment variables
3. Test Docker image locally

### Health Check Failures

1. Verify the health check path exists
2. Check security group rules
3. Ensure container port is correct

## 📚 Useful Commands

```bash
# View all tags
git tag -l

# View current version
git describe --tags

# Create and push tag
git tag v1.0.0 && git push origin v1.0.0

# View running tasks
aws ecs list-tasks --cluster vendorify-cluster

# Force new deployment
aws ecs update-service \
  --cluster vendorify-cluster \
  --service vendorify-service \
  --force-new-deployment

# Scale service
aws ecs update-service \
  --cluster vendorify-cluster \
  --service vendorify-service \
  --desired-count 3

# View task logs
aws logs tail /ecs/vendorify-app --follow

# List ECR images with tags
aws ecr describe-images \
  --repository-name vendorify-app \
  --query 'sort_by(imageDetails,& imagePushedAt)[*].[imageTags[0],imagePushedAt]' \
  --output table
```

## 🔗 Resources

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
