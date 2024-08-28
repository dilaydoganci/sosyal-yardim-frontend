import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:5041/api/SosyalYardim';

// Sosyal Yardım Ödemelerini Sorgulama
export const sorgulaSosyalOdeme = async (tckn: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/SorgulaSosyalOdeme/${tckn}`);
        return response.data.response; // Sosyal Yardım listesi döner
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// Ödeme Yapma Fonksiyonu
interface OdemeYapRequest {
    tcKimlikNo: string;
    odemeNo: number;
}

export const odemeYap = async (request: OdemeYapRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/OdemeYap`, request);
        return response.data; // Başarı veya hata mesajı döner
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
