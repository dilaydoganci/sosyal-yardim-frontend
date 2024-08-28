import React from 'react';
import { format } from 'date-fns';

interface PaymentItemProps {
    id: number;
    tcKimlikNo: string;
    musteriAd: string;
    musteriSoyad: string;
    odenecekTtr: number;
    odemeTr: string;
    odemeAck: string;
    onPay: (odemeNo: number) => void;
}

const PaymentItem: React.FC<PaymentItemProps> = ({
    id, tcKimlikNo, musteriAd, musteriSoyad, odenecekTtr, odemeTr, odemeAck, onPay
}) => {

    const formattedDate = format(new Date(odemeTr), 'dd/MM/yyyy HH:mm');
    return (
        <div className="payment-item">
            <h3>{musteriAd} {musteriSoyad}</h3>
            <p>Tutar: {odenecekTtr} TL</p>
            <p>Ödeme Tarihi: {formattedDate}</p>
            <p>Açıklama: {odemeAck}</p>
            <button onClick={() => onPay(id)}>Ödeme Yap</button>
        </div>
    );
};

export default PaymentItem;
