import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api' //조정

// 검사항목 목록 가져오기
export const fetchDiagnosisList = async () => {
    return axios.get(`${BASE_URL}/diagnosis`) // 실제 경로는 팀원과 맞추기
}

// 특정 검사의 문항들 가져오기
export const fetchQuestions = async (testId: number) => {
    return axios.get(`${BASE_URL}/diagnosis/${testId}/questions`)
}

// 응답 제출 (ex: 결과 점수 처리)
export const submitAnswers = async (testId: number, answers: number[]) => {
    return axios.post(`${BASE_URL}/diagnosis/${testId}/submit`, { answers })
}