import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { ProductItem, CartItem } from '../../../types/catalog';
import { formatRupiah } from '../../../lib/utils';
import { Badge } from '../../../components/ui/Badge';

interface ProductCardProps {
  product: ProductItem;
  inCart?: CartItem;
  onSelect: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem, e?: React.MouseEvent) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  inCart,
  onSelect,
  onAddToCart,
  onUpdateQuantity,
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-3xl border border-[#EAE3D5] hover:border-[#F7BAC7] p-4 flex flex-col justify-between transition-all duration-300 shadow-bento hover:shadow-bento-hover hover:-translate-y-1 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant={product.deliveryType === 'SAME_DAY' ? 'matcha' : 'sakura'}>
            {product.badge || (product.deliveryType === 'SAME_DAY' ? 'Same-Day' : 'PO H-1')}
          </Badge>

          {product.kanjiName && (
            <span className="text-[11px] font-serif text-[#9E9496] group-hover:text-[#83273B] transition-colors">
              {product.kanjiName}
            </span>
          )}
        </div>

        {/* Circular Halo Image Frame */}
        <div className="relative w-36 h-36 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FCE4E9] to-[#FDF0F3] p-1.5 shadow-sakura-soft transition-transform group-hover:scale-105 duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>
          {product.originalPrice && (
            <span className="absolute bottom-0 right-0 bg-[#DC4C70] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm">
              PROMO
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="font-heading font-bold text-sm sm:text-base text-[#1A1615] group-hover:text-[#83273B] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-[#665E60] line-clamp-2 mt-1 leading-relaxed">
          {product.description}
        </p>

        {/* Rating & Stock */}
        <div className="flex items-center gap-3 mt-3 text-xs text-[#665E60]">
          <div className="flex items-center gap-1 text-[#E5A812] font-bold">
            <Star className="w-3.5 h-3.5 fill-[#E5A812]" />
            <span>{product.rating}</span>
            <span className="text-[#9E9496] font-normal">({product.ratingCount})</span>
          </div>
          <span className="text-[#EAE3D5]">|</span>
          <span>Stok: <strong className="text-[#1A1615]">{product.stock}</strong></span>
        </div>
      </div>

      {/* Bottom: Price & Button */}
      <div className="pt-4 mt-4 border-t border-[#FAF6F0] flex items-center justify-between">
        <div>
          {product.originalPrice && (
            <p className="text-[10px] text-[#9E9496] line-through">
              {formatRupiah(product.originalPrice)}
            </p>
          )}
          <p className="text-base sm:text-lg font-bold font-sans text-[#83273B]">
            {formatRupiah(product.price)}
          </p>
        </div>

        {inCart ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center bg-[#FDF0F3] border border-[#F7BAC7] rounded-xl px-2 py-1 gap-2 text-xs"
          >
            <button
              onClick={() => onUpdateQuantity(product.id, -1)}
              className="w-5 h-5 flex items-center justify-center text-[#83273B] hover:bg-white rounded font-bold"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-bold text-[#83273B] min-w-4 text-center">{inCart.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="w-5 h-5 flex items-center justify-center text-[#83273B] hover:bg-white rounded font-bold"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#83273B] hover:bg-[#5E1526] text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Pesan</span>
          </button>
        )}
      </div>
    </div>
  );
};

