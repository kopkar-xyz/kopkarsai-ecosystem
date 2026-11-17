import React from 'react';
import { X, ShoppingBag, Store, Clock, Info, CheckCircle2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../../types/catalog';
import { formatRupiah } from '../../../lib/utils';
import { Button } from '../../../components/ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const sameDayItems = cart.filter((i) => i.product.deliveryType === 'SAME_DAY');
  const poH1Items = cart.filter((i) => i.product.deliveryType === 'PO_H1');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slideLeft border-l border-[#EAE3D5]">
        {/* Header */}
        <div className="bg-[#83273B] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-heading font-bold text-base">Keranjang Belanja</h3>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{totalCount} item</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-[#665E60]">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#EAE3D5] mb-2" />
              <p className="font-semibold text-sm">Keranjang masih kosong</p>
              <p className="text-xs mt-1">Pilih menu dari katalog untuk memesan.</p>
            </div>
          ) : (
            <>
              {/* Group 1: Same-Day Toko */}
              {sameDayItems.length > 0 && (
                <div className="bg-[#F7F2E7] rounded-2xl p-3.5 border border-[#EAE3D5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#2E6B4F] flex items-center gap-1">
                      <Store className="w-3.5 h-3.5" /> Toko Fisik (Same-Day)
                    </span>
                    <span className="text-[10px] text-[#665E60] bg-white px-2 py-0.5 rounded border border-[#EAE3D5]">
                      Checklist Kasir
                    </span>
                  </div>
                  <div className="space-y-2">
                    {sameDayItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="bg-white rounded-xl p-2.5 flex items-center justify-between border border-[#EAE3D5]/60"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#1A1615] line-clamp-1">{item.product.name}</p>
                            <p className="text-[11px] text-[#83273B] font-semibold">
                              {formatRupiah(item.product.price)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#FAF6F0] rounded-lg px-2 py-1 text-xs">
                          <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="text-[#83273B]">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold min-w-3 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="text-[#83273B]">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 2: PO H-1 */}
              {poH1Items.length > 0 && (
                <div className="bg-[#FDF0F3] rounded-2xl p-3.5 border border-[#F7BAC7]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#83273B] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Katering Basah (PO H-1)
                    </span>
                    <span className="text-[10px] text-[#83273B] bg-white px-2 py-0.5 rounded border border-[#F7BAC7]">
                      Diantar Esok Hari
                    </span>
                  </div>
                  <div className="space-y-2">
                    {poH1Items.map((item) => (
                      <div
                        key={item.product.id}
                        className="bg-white rounded-xl p-2.5 flex items-center justify-between border border-[#F7BAC7]/60"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#1A1615] line-clamp-1">{item.product.name}</p>
                            <p className="text-[11px] text-[#83273B] font-semibold">
                              {formatRupiah(item.product.price)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#FAF6F0] rounded-lg px-2 py-1 text-xs">
                          <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="text-[#83273B]">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold min-w-3 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="text-[#83273B]">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Notice */}
              <div className="p-3 bg-[#FEF6DC] rounded-xl border border-[#E5A812]/30 flex items-start gap-2 text-xs text-[#1A1615]">
                <Info className="w-4 h-4 text-[#E5A812] shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  Pesanan dapat dipotong langsung melalui <strong>Payroll Deduction (Potong Gaji)</strong> atau dibayar tunai di kasir toko koperasi saat pengambilan.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-4 bg-[#FAF6F0] border-t border-[#EAE3D5] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#665E60]">Subtotal Tagihan:</span>
              <span className="font-bold text-lg text-[#83273B]">{formatRupiah(totalPrice)}</span>
            </div>

            <Button
              onClick={() => {
                alert('Pesanan berhasil diajukan! Verifikasi kasir akan segera diproses.');
                onClearCart();
                onClose();
              }}
              className="w-full py-3"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Proses Pemesanan Karyawan</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

