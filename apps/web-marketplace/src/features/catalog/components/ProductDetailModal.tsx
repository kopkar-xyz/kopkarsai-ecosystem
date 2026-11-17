import React from 'react';
import { X, Plus } from 'lucide-react';
import { ProductItem } from '../../../types/catalog';
import { formatRupiah } from '../../../lib/utils';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-[#EAE3D5] shadow-2xl animate-scaleUp"
      >
        {/* Header with image */}
        <div className="relative h-48 bg-gradient-to-b from-[#FCE4E9] to-[#FAF6F0] flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-[#665E60] hover:text-[#1A1615] shadow-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-32 h-32 rounded-full p-1.5 bg-white shadow-sakura-card">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-1">
            <Badge variant={product.deliveryType === 'SAME_DAY' ? 'matcha' : 'sakura'}>
              {product.deliveryType === 'SAME_DAY' ? 'Same-Day Toko Fisik' : 'Pre-Order Katering H-1'}
            </Badge>
            {product.kanjiName && (
              <span className="font-serif text-xs text-[#83273B] font-bold">
                {product.kanjiName}
              </span>
            )}
          </div>

          <h2 className="text-lg font-heading font-extrabold text-[#1A1615] mt-1">
            {product.name}
          </h2>
          <p className="text-xs text-[#83273B] font-medium mb-3">
            Mitra: {product.supplierName}
          </p>

          <p className="text-xs text-[#665E60] leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Ingredients */}
          {product.ingredients && (
            <div className="bg-[#FAF6F0] rounded-2xl p-3 mb-4 border border-[#EAE3D5]">
              <p className="text-[11px] font-bold text-[#1A1615] mb-1">Komposisi Bahan:</p>
              <div className="flex flex-wrap gap-1">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#EAE3D5] text-[#665E60]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer action */}
          <div className="flex items-center justify-between pt-2 border-t border-[#FAF6F0]">
            <div>
              <p className="text-[11px] text-[#665E60]">Total Harga</p>
              <p className="text-xl font-bold text-[#83273B] font-sans">
                {formatRupiah(product.price)}
              </p>
            </div>

            <Button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              size="sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah ke Keranjang</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

