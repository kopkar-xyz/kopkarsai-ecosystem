import React, { useState } from 'react';
import { useRouter, RouterProvider } from './app/router';
import { MainCategoryId, SubCategoryId, FoodProduct } from './types/food';
import { Order, OrderStatus } from './types/order';
import { UserProfile, PRESET_USERS } from './types/auth';
import { MENU_DATA } from './data/mockFoodProducts';
import { INITIAL_ORDERS } from './data/mockOrders';
import { MarketplaceNavbar, CashierNavTab } from './components/layout/MarketplaceNavbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { MarketplaceFooter } from './components/layout/MarketplaceFooter';
import { HelpSupportModal } from './components/ui/HelpSupportModal';
import { ProfileModal } from './components/ui/ProfileModal';
import { CartDrawer, CartItem } from './features/cart/components/CartDrawer';
import { OrderReceiptModal } from './features/checkout/components/OrderReceiptModal';
import { CatalogView } from './features/catalog/pages/CatalogView';
import { OrdersView } from './features/orders/pages/OrdersView';
import { CheckoutView } from './features/checkout/pages/CheckoutView';
import { CashierView } from './features/cashier/pages/CashierView';
import { HelpView } from './features/help/pages/HelpView';

/**
 * MarketplaceContent — Router-Driven Single Page Application
 * Arsitektur Bersih Sesuai Invarian < 200 Baris.
 */
const MarketplaceContent: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile>(PRESET_USERS[0]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategoryId | 'all'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryId>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'promo'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<FoodProduct | null>(() => (typeof window !== 'undefined' && window.innerWidth >= 1024 ? MENU_DATA[0] : null));
  const [cart, setCart] = useState<CartItem[]>([{ product: MENU_DATA[0], quantity: 2 }, { product: MENU_DATA[1], quantity: 1 }]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [cashierTab, setCashierTab] = useState<CashierNavTab>('DASHBOARD');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'ADMIN_TOKO') {
      navigate('/cashier');
    } else if (currentPath === '/cashier') {
      navigate('/');
    }
  };

  const handleAddToCart = (product: FoodProduct, quantity: number = 1) => {
    setIsOrderLoading(true);
    setTimeout(() => {
      setIsOrderLoading(false);
      setOrderSuccess(true);
      const isPO = product.deliveryType === 'PO_H1' || (product.stock !== undefined && (product.stock === 0 || quantity > product.stock));
      const itemProduct = isPO ? { ...product, deliveryType: 'PO_H1' as const } : product;
      setCart((prev) => {
        const exist = prev.find((i) => i.product.id === product.id);
        if (exist) return prev.map((i) => (i.product.id === product.id ? { ...i, product: itemProduct, quantity: i.quantity + quantity } : i));
        return [...prev, { product: itemProduct, quantity }];
      });
      setTimeout(() => setOrderSuccess(false), 1800);
    }, 300);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleCheckoutSubmit = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setReceiptOrder(newOrder);
    navigate('/orders');
  };

  const handleToggleItemCheck = (orderId: string, itemId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, items: o.items.map((it) => (it.id === itemId ? { ...it, isChecked: !it.isChecked } : it)) }
          : o
      )
    );
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      const product = MENU_DATA.find((m) => m.id === item.id || m.name.toLowerCase() === item.name.toLowerCase());
      if (product) handleAddToCart(product, item.quantity);
    });
    setIsCartOpen(true);
  };

  const filteredItems = MENU_DATA.filter((item) => {
    const matchQ = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.kanjiName && item.kanjiName.includes(searchQuery));
    const matchM = selectedMainCategory === 'all' || item.category === selectedMainCategory;
    const matchS = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
    return matchQ && matchM && matchS && (activeFilter !== 'promo' || !!item.discountBadge);
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1A1615] font-sans antialiased flex flex-col selection:bg-[#FCE4E9] selection:text-[#83273B] overflow-x-hidden">
      <MarketplaceNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onOpenHelp={() => navigate('/help')}
        onResetFilter={() => { setSelectedItem(null); setSelectedMainCategory('all'); setSelectedSubCategory('all'); setActiveFilter('all'); setSearchQuery(''); }}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        cashierTab={cashierTab}
        onSelectCashierTab={setCashierTab}
      />

      <main className="w-full pt-28 sm:pt-28 lg:pt-24 pb-28 sm:pb-36 xl:pb-16 min-h-screen block">
        {currentPath === '/' && (
          <CatalogView
            items={filteredItems}
            allProducts={MENU_DATA}
            selectedItem={selectedItem}
            onSelectItem={(it) => setSelectedItem(selectedItem?.id === it.id ? null : it)}
            onCloseDetail={() => setSelectedItem(null)}
            onOrderNow={handleAddToCart}
            orderSuccess={orderSuccess}
            isOrderLoading={isOrderLoading}
            selectedMainCategory={selectedMainCategory}
            onSelectMainCategory={setSelectedMainCategory}
            selectedSubCategory={selectedSubCategory}
            onSelectSubCategory={setSelectedSubCategory}
            activeFilter={activeFilter}
            onClearPromoFilter={() => setActiveFilter('all')}
          />
        )}
        {currentPath === '/orders' && (
          <OrdersView orders={orders} currentUser={currentUser} onBackToCatalog={() => navigate('/')} onViewReceipt={setReceiptOrder} onReorder={handleReorder} />
        )}
        {currentPath === '/checkout' && (
          <CheckoutView cart={cart} currentUser={currentUser} onBackToCart={() => { setIsCartOpen(true); navigate('/'); }} onSubmitOrder={handleCheckoutSubmit} />
        )}
        {currentPath === '/cashier' && (
          <CashierView orders={orders} onToggleItemCheck={handleToggleItemCheck} onUpdateStatus={handleUpdateStatus} activeTab={cashierTab} />
        )}
        {currentPath === '/help' && <HelpView mode="customer" />}
      </main>

      <MobileBottomNav
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        cartCount={cartCount}
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
      />

      <MarketplaceFooter isDetailOpen={currentPath === '/' && !!selectedItem} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onProceedToCheckout={() => { setIsCartOpen(false); navigate('/checkout'); }}
      />
      <OrderReceiptModal order={receiptOrder} onClose={() => setReceiptOrder(null)} />
      <HelpSupportModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={handleSelectUser}
      />
    </div>
  );
};

export const App: React.FC = () => (
  <RouterProvider>
    <MarketplaceContent />
  </RouterProvider>
);
