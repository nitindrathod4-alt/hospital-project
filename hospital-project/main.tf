terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

# ECR Repository
resource "aws_ecr_repository" "hospital_app" {
  name = "hospital-app"
}

# Existing VPC/Subnets (example)
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# EKS Cluster IAM Role
resource "aws_iam_role" "eks_cluster_role" {
  name = "hospital-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
    }]
  })
}

# EKS Cluster
resource "aws_eks_cluster" "hospital" {
  name     = "hospital-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = data.aws_subnets.default.ids
  }
}

# RDS MySQL
resource "aws_db_instance" "hospital_mysql" {
  identifier           = "hospital-mysql"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20

  db_name              = "hospitaldb"
  username             = "admin"
  password             = "ChangeThisPassword123!"

  skip_final_snapshot  = true
  publicly_accessible  = false
}

output "ecr_repo_url" {
  value = aws_ecr_repository.hospital_app.repository_url
}

output "eks_cluster_name" {
  value = aws_eks_cluster.hospital.name
}

output "rds_endpoint" {
  value = aws_db_instance.hospital_mysql.endpoint
}