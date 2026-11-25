import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FoodProduct } from '../../../types/food';
import { Order, DeliveryMethod, PaymentMethod } from '../../../types/order';
import { UserProfile } from '../../../types/auth';
import { OrderSummaryCard } from '../components/OrderSummaryCard';
import { DeliveryStepPanel } from '../components/DeliveryStepPanel';
import { PaymentStepPanel } from '../components/PaymentStepPanel';

interface CheckoutViewProps {
  cart: { product: FoodProduct; quantity: number }[];
  currentUser?: UserProfile;
  onBackToCart: () => void;
  onSubmitOrder: (newOrder: Order) => void;
}

/**
 * CheckoutView — Alur Checkout 2 Langkah (MP-SCR-004 & MP-SCR-005)
 * Disesuaikan lebar max-w-[1140px], gap, font size, & font weight seperti OrdersView.
 * Budget: < 200 LOC.
 */
export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  currentUser,
  onBackToCart,
  onSubmitOrder,
}) => {
  const [step, setStep] = useState<'DELIVERY' | 'PAYMENT'>('DELIVERY');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('PICKUP_KANTIN');
  const [deskLocation, setDeskLocation] = useState('');
  const [isGaPriority, setIsGaPriority] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('TRANSFER_MANDIRI');
  const [proofImage, setProofImage] = useState<string | undefined>(undefined);
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Budi Santoso');
  const [customerNik, setCustomerNik] = useState(currentUser?.nik || 'SAI-2021-PR08');
  const [department, setDepartment] = useState(currentUser?.department || 'Produksi SMT Line 3');

  // Stable invoice number for this checkout session
  const [invoiceNumber] = useState(
    () => `INV/SAI/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}/${Math.floor(1000 + Math.random() * 9000)}`
  );

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerNik(currentUser.nik);
      setDepartment(currentUser.department || 'Unit PT SAI');
      if (currentUser.role !== 'GA') setIsGaPriority(false);
    }
  }, [currentUser]);

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleProcessOrder = () => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      invoiceNumber,
      createdAt: 'Baru Saja (Hari Ini)',
      customerName,
      customerNik,
      department,
      deliveryMethod,
      deliveryLocationNote: deliveryMethod === 'MEJA_KERJA' ? (deskLocation.trim() || undefined) : undefined,
      isGaPriority,
      paymentMethod,
      status: 'MENUNGGU_CHECKLIST',
      proofImage,
      items: cart.map((c) => ({
        id: c.product.id,
        name: c.product.name,
        kanjiName: c.product.kanjiName,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.image,
        deliveryType: c.product.deliveryType || (c.product.category === 'siap-santap' ? 'PO_H1' : 'SAME_DAY'),
        isChecked: false,
      })),
      totalAmount,
      qrCodeToken: `SAI-QR-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    onSubmitOrder(newOrder);
  };

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 select-none">
      {/* 1. Header Konsisten seperti Pesanan Saya */}
      <div className="flex items-center gap-3.5 pb-1">
        <button
          type="button"
          onClick={() => (step === 'PAYMENT' ? setStep('DELIVERY') : onBackToCart())}
          className="w-9 h-9 rounded-xl bg-white border border-[#EAE3D5] flex items-center justify-center text-[#1A1615] hover:bg-[#FAF6F0] active:scale-95 transition-all cursor-pointer shadow-2xs"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {step === 'DELIVERY' ? (
          <div>
            <h1 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">
              Checkout pesanan
            </h1>
            <p className="text-xs text-[#665E60] mt-0.5">
              Konfirmasi pesanan dan pilih cara pengambilan.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">
              Pembayaran
            </h1>
            <p className="text-xs text-[#665E60] font-mono mt-0.5">
              {invoiceNumber}
            </p>
          </div>
        )}
      </div>

      {/* 2. Grid Dual-Column Layout (Kiri Form, Kanan Ringkasan) */}
      <div className="grid gap-4 lg:gap-7 lg:grid-cols-12 items-start">
        <div className="lg:col-span-8 space-y-4">
          {step === 'DELIVERY' ? (
            <DeliveryStepPanel
              customerName={customerName}
              customerNik={customerNik}
              department={department}
              deliveryMethod={deliveryMethod}
              onChangeDeliveryMethod={setDeliveryMethod}
              deskLocation={deskLocation}
              onChangeDeskLocation={setDeskLocation}
              isGaRole={currentUser?.role === 'GA'}
              isGaPriority={isGaPriority}
              onToggleGaPriority={setIsGaPriority}
            />
          ) : (
            <PaymentStepPanel
              totalAmount={totalAmount}
              paymentMethod={paymentMethod}
              onChangePaymentMethod={setPaymentMethod}
              proofImage={proofImage}
              onUploadProof={setProofImage}
              customerNik={customerNik}
            />
          )}
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <OrderSummaryCard
            cart={cart}
            totalAmount={totalAmount}
            step={step}
            onSubmit={step === 'DELIVERY' ? () => setStep('PAYMENT') : handleProcessOrder}
            isSubmitDisabled={step === 'PAYMENT' && paymentMethod !== 'PAYROLL_DEDUCTION' && !proofImage}
          />
        </div>
      </div>
    </div>
  );
};
