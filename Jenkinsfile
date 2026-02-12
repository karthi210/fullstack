pipeline {
    agent any

    environment {
        APP_NAME = "fullstack-monitoring"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git 'https://github.com/YOUR_USERNAME/fullstack-monitoring.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t backend-monitoring .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t frontend-monitoring .'
                }
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                docker-compose down || true
                '''
            }
        }

        stage('Deploy Stack') {
            steps {
                sh '''
                docker-compose up -d --build
                '''
            }
        }

        stage('Verify Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo "Deployment Successful 🚀"
        }
        failure {
            echo "Deployment Failed ❌"
        }
    }
}
