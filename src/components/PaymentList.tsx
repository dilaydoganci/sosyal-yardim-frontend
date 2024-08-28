import React from 'react';
import PaymentItem from './PaymentItem';

interface Payment {
    id: number;
    tcKimlikNo: string;
    musteriAd: string;
    musteriSoyad: string;
    odenecekTtr: number;
    odemeTr: string;
    odemeAck: string;
}

interface PaymentListProps {
    payments: Payment[];
    onPay: (odemeNo: number) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ payments, onPay }) => {
    return (
        <div className="payment-list">
            {payments.map(payment => (
                <PaymentItem 
                    key={payment.id}
                    {...payment}
                    onPay={onPay}
                />
            ))}
        </div>
    );
};

export default PaymentList;
