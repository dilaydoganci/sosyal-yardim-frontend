
import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PaymentList from './components/PaymentList';
import { sorgulaSosyalOdeme, odemeYap } from './api/api';

interface Payment {
    id: number;
    tcKimlikNo: string;
    musteriAd: string;
    musteriSoyad: string;
    odenecekTtr: number;
    odemeTr: string;
    odemeAck: string;
    odemeKd: number;
}

const App: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // handleSearch fonksiyonu
    const handleSearch = async (tckn: string) => {
        setLoading(true); // Yüklenme durumuna geç
        setError(null); // Hata durumunu sıfırla

        try {
            // API'yi çağırarak sonuçları al
            const results = await sorgulaSosyalOdeme(tckn);

            // Eğer sonuçlar boşsa hata mesajı göster
            if (results.length === 0) {
                setError("Ödeme bulunamadı.");
            } else {
                setPayments(results); // Ödemeleri state'e kaydet
            }
        } catch (err) {
            setError("Sorgulama sırasında bir hata oluştu."); // Hata mesajı
        } finally {
            setLoading(false); // Yüklenme durumu sonlandır
        }
    };

    const handlePayment = async (odemeNo: number) => {
        setLoading(true);
        setError(null);

        try {
            const paymentToProcess = payments.find(p => p.id === odemeNo);
            if (!paymentToProcess) {
                setError("Ödeme bulunamadı.");
                return;
            }

            const { tcKimlikNo, odemeKd, odemeTr } = paymentToProcess;

            if (odemeKd === 1) {
                setError("Bu ödeme daha önce yapılmış.");
                return;
            }

            if (new Date(odemeTr) > new Date()) {
                setError("Ödeme tarihi henüz gelmedi.");
                return;
            }

            const confirmed = window.confirm("Ödemeyi yapmak istediğinizden emin misiniz?");
            if (!confirmed) return;

            const response = await odemeYap({ tcKimlikNo, odemeNo });
            if (response.success) {
                alert("Ödeme başarıyla yapıldı!");
                setPayments(prev => prev.filter(p => p.id !== odemeNo));
            } else {
                setError(response.message || "Ödeme başarısız oldu.");
            }
        } catch (err) {
            setError("Ödeme işlemi sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Sosyal Yardım Ödeme Sistemi</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <PaymentList payments={payments} onPay={handlePayment} />
        </div>
    );
};

export default App;
