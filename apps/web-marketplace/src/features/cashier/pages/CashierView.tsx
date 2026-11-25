import React, { useState } from 'react';
import { Order } from '../../../types/order';
import { OrderQueuePanel } from '../components/OrderQueuePanel';
import { SalesSummaryPanel } from '../components/SalesSummaryPanel';
import { StoreSettingsPanel } from '../components/StoreSettingsPanel';
import { HelpView } from '../../help/pages/HelpView';
import { CashierNavTab } from '../../../components/layout/MarketplaceNavbar';

interface CashierViewProps {
  orders: Order[];
  onToggleItemCheck: (orderId: string, itemId: string) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  activeTab?: CashierNavTab;
}

/**
 * CashierView — Manajemen Kasir & Operasional Toko Fisik
 * Menghilangkan header redundant (Gambar 2 dihapus) sesuai instruksi pengguna.
 * Budget: < 200 LOC.
 */
export const CashierView: React.FC<CashierViewProps> = ({
  orders,
  onToggleItemCheck,
  onUpdateStatus,
  activeTab = 'DASHBOARD',
}) => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  const playIrasshaimase = () => {
    setAudioPlayed(true);
    setTimeout(() => setAudioPlayed(false), 2000);
  };

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 select-none animate-fadeIn">
      {activeTab === 'DASHBOARD' && (
        <OrderQueuePanel
          orders={orders}
          onToggleItemCheck={onToggleItemCheck}
          onUpdateStatus={onUpdateStatus}
          playIrasshaimase={playIrasshaimase}
          audioPlayed={audioPlayed}
          filterMode="ALL"
        />
      )}

      {activeTab === 'GA_QUEUE' && (
        <OrderQueuePanel
          orders={orders}
          onToggleItemCheck={onToggleItemCheck}
          onUpdateStatus={onUpdateStatus}
          playIrasshaimase={playIrasshaimase}
          audioPlayed={audioPlayed}
          filterMode="GA_ONLY"
        />
      )}

      {activeTab === 'RECAP' && <SalesSummaryPanel orders={orders} />}

      {activeTab === 'SETTINGS' && <StoreSettingsPanel />}

      {activeTab === 'HELP' && <HelpView mode="cashier" />}
    </div>
  );
};
