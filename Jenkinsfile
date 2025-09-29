pipeline {
  agent any

  options {
    timestamps()
  }

  stages {
    stage('Build') {
      steps {
        echo 'Build'
      }
    }

    stage('Test') {
      steps {
        echo 'Test'
      }
      post {
        always {
          echo 'Publish test reports'
        }
      }
    }

    stage('Code Quality') {
      steps {
        echo 'Code Quality'
      }
    }

    stage('Security') {
      steps {
        echo 'Security'
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
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
