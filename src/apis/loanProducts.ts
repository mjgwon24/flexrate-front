import {apiClient} from "@/apis/client";

/**
 * 대출 상품 목록 전체 조회 API
 * @return data
 */
const getAllProducts = async () => {
    const {data} = await apiClient.get(`/api/loans`);
    return data;
};

/**
 * 특정 대출 상품을 선택했을 시 LoanApplication 생성 API
 * @param productId 선택한 대출 상품 ID
 * @param token 사용자 인증을 위한 토큰
 */
const selectLoanProduct = async (productId: number, token: string | null) => {
    if (!token) throw new Error('로그인이 필요합니다.');

    await apiClient.post(`/api/loans/${productId}/select`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const loanProductApi = {
    getAllProducts,
    selectLoanProduct,
};