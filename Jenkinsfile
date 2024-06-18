pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = '10e92a92-58dc-4c78-89ed-4492837de586' // Use the ID you set when adding credentials
        DOCKER_IMAGE = 'minhiptit/social_network_ver2'
    }

    stages {
        stage('Checkout') {
            steps {
                // Correct the Git repository URL
                git url: 'https://github.com/Minh141120/social-media-poster.git', branch: 'main'
            }
        }
        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        // Build and push AuthService image
                        def authServiceImage = docker.build("${DOCKER_IMAGE}-authservice", "./snv2_backend/AuthService")
                        authServiceImage.push("${env.BUILD_NUMBER}")
                        authServiceImage.push("latest")

                        // Build and push PostService image
                        def postServiceImage = docker.build("${DOCKER_IMAGE}-postservice", "./snv2_backend/PostService")
                        postServiceImage.push("${env.BUILD_NUMBER}")
                        postServiceImage.push("latest")

                        // Build and push SocialService image
                        def socialServiceImage = docker.build("${DOCKER_IMAGE}-socialservice", "./snv2_backend/SocialService")
                        socialServiceImage.push("${env.BUILD_NUMBER}")
                        socialServiceImage.push("latest")

                        // Build and push UserService image
                        def userServiceImage = docker.build("${DOCKER_IMAGE}-userservice", "./snv2_backend/UserService")
                        userServiceImage.push("${env.BUILD_NUMBER}")
                        userServiceImage.push("latest")

                        // Build and push Frontend image
                        def frontendImage = docker.build("${DOCKER_IMAGE}-frontend", "./snv2_frontend")
                        frontendImage.push("${env.BUILD_NUMBER}")
                        frontendImage.push("latest")
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Example deployment steps, can be customized as per your deployment strategy
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
