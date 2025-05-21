import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080';

/**
 * 대출 상품 목록 전체 조회 API
 * @return data
 */
const getAllProducts = async () => {
    const {data} = await axios.get(`${API_URL}/api/loans`);
    return data;
};

/**
 * 대출 상품 목록 전체 조회 API
 * @param productId 선택한 대출 상품 ID
 * @param token 사용자 인증을 위한 토큰
 */
const selectLoanProduct = async (productId: number, token: string | null) => {
    if (!token) throw new Error('로그인이 필요합니다.');

    await axios.post(`${API_URL}/api/loans/${productId}/select`, null, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const loanProductApi = {
    getAllProducts,
    selectLoanProduct,
};