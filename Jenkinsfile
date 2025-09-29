pipeline {
  agent any

  options {
    timestamps()
  }

  stages {
    stage('Env Check') {
      steps {
        sh 'node -v && npm -v'
      }
    }

    stage('Build') {
      steps {
        sh '''
          rm -f artifact-backend-${BUILD_NUMBER}.tar.gz
          tar --exclude='backend/node_modules' -czf artifact-backend-${BUILD_NUMBER}.tar.gz backend
        '''
        archiveArtifacts artifacts: 'artifact-backend-*.tar.gz', onlyIfSuccessful: true
      }
}

    stage('Test') {
      steps {
        sh '''
          cd backend
          npm ci || npm install
          npm run test
        '''
      }
      post {
        always {
          echo 'Publish test reports'
        }
      }
    }

    stage('Code Quality') {
      steps {
        sh '''
          cd backend
          npm ci || npm install
          npm run lint
          npm run lint:report || true
        '''
        archiveArtifacts artifacts: 'backend/eslint-report.json', allowEmptyArchive: true
      }
}


    stage('Security') {
      steps {
        sh '''
          cd backend
          npm ci || npm install
          npm audit --production --json > audit-report.json || true
        '''
        archiveArtifacts artifacts: 'backend/audit-report.json', allowEmptyArchive: true
      }
}

    stage('Deploy') {
      steps {
        echo 'Deploy'
      }
    }

    stage('Release') {
      steps {
        echo 'Release'
      }
    }

    stage('Monitoring') {
      steps {
        echo 'Monitoring'
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished'
    }
    success {
      echo 'Success'
    }
    failure {
      echo 'Failed'
    }
  }
}
