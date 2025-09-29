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
        sh '''
          rm -rf deploy && mkdir -p deploy
          tar -xzf artifact-backend-${BUILD_NUMBER}.tar.gz -C deploy

          # smoke check: key files exist after "deployment"
          test -f deploy/backend/package.json
          test -f deploy/backend/server.js

          echo "Deployed to local staging directory: $(pwd)/deploy"
          ls -la deploy/backend | head -n 50
        '''
      }
}

    stage('Release') {
      steps {
        sh '''
          rm -rf prod && mkdir -p prod
          cp -r deploy/backend prod/backend

          COMMIT=$(git rev-parse --short HEAD || echo "unknown")
          DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

          cat > release_notes_${BUILD_NUMBER}.md <<EOF
    # Release ${BUILD_NUMBER}
    Commit: ${COMMIT}
    Date (UTC): ${DATE}
    Artifact: artifact-backend-${BUILD_NUMBER}.tar.gz
    Action: Promoted from deploy/ (staging) to prod/ (production)
    EOF
        '''
        archiveArtifacts artifacts: 'release_notes_*.md', onlyIfSuccessful: true
      }
}


    stage('Monitoring') {
      steps {
        sh '''
          CRIT=$(node -e "const fs=require('fs');const p='prod/backend/audit-report.json';if(!fs.existsSync(p)){console.log(0);process.exit(0)}const j=JSON.parse(fs.readFileSync(p,'utf8'));let c=0;(j.auditAdvisories?Object.values(j.auditAdvisories):[]).forEach(a=>{if(a.severity==='critical')c++});console.log(c);")
          WARN=$(node -e "const fs=require('fs');const p='prod/backend/eslint-report.json';if(!fs.existsSync(p)){console.log(0);process.exit(0)}const arr=JSON.parse(fs.readFileSync(p,'utf8'));const w=arr.reduce((s,f)=>s+(f.warningCount||0),0);console.log(w);")
          echo "Monitoring summary -> critical_vulnerabilities: $CRIT, eslint_warnings: $WARN" | tee monitoring_summary.txt
        '''
        archiveArtifacts artifacts: 'monitoring_summary.txt', onlyIfSuccessful: true
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
