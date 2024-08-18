# 베이스 이미지로 Node.js 20 이미지 사용
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci

# 소스 코드 복사
COPY . .

# 프로덕션 빌드
RUN npm run build
# 3000번 포트 사용
EXPOSE 3000
# 애플리케이션 실행
CMD ["npm", "start"]