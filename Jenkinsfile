pipeline {
    agent any
    
    options {
        timeout(time: 60, unit: 'MINUTES') // Set a higher timeout limit
    }

    environment {
        DOCKER_CREDENTIALS_ID = '10e92a92-58dc-4c78-89ed-4492837de586'
        DOCKER_IMAGE = 'minhitptit/social_network_ver2'
        DOCKER_CLIENT_TIMEOUT = '300'
        COMPOSE_HTTP_TIMEOUT = '300'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Minh141120/social-media-poster.git', branch: 'main'
            }
        }
        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        def authServiceImage = docker.build("${DOCKER_IMAGE}-authservice", "./snv2_backend/AuthService")
                        authServiceImage.push("${env.BUILD_NUMBER}")
                        authServiceImage.push("latest")

                        def postServiceImage = docker.build("${DOCKER_IMAGE}-postservice", "./snv2_backend/PostService")
                        postServiceImage.push("${env.BUILD_NUMBER}")
                        postServiceImage.push("latest")

                        def socialServiceImage = docker.build("${DOCKER_IMAGE}-socialservice", "./snv2_backend/SocialService")
                        socialServiceImage.push("${env.BUILD_NUMBER}")
                        socialServiceImage.push("latest")

                        def userServiceImage = docker.build("${DOCKER_IMAGE}-userservice", "./snv2_backend/UserService")
                        userServiceImage.push("${env.BUILD_NUMBER}")
                        userServiceImage.push("latest")

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
                    sh 'sudo docker-compose down || true'
                    sh '''
                        if lsof -i:5173; then
                          echo "Port 5173 is in use, killing the process..."
                          sudo kill $(lsof -t -i:5173)
                        fi
                    '''
                    sh '''
                        echo "Flushing IP tables..."
                        sudo iptables --flush
                        sudo iptables -t nat --flush
                        sudo iptables -t mangle --flush
                        sudo iptables -X
                        sudo iptables -t nat -X
                        sudo iptables -t mangle -X
                    '''
                    sh 'sudo docker-compose up -d'
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
