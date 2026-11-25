import React from 'react';
import { Check, ExternalLink, History, PenLine, RotateCcw } from 'lucide-react';
import { SlideOverDrawer } from '../../../components/ui/SlideOverDrawer';
import { getRevisionBadgeTone, type UnifiedLogItem } from '../data/revisionLogData';

interface RevisionTimelineCardProps {
  item: UnifiedLogItem | null;
  onClose: () => void;
  onAdvanceRevision: (key: string) => void;
  onOpenRevisionForm: (item: UnifiedLogItem) => void;
  onSelectProduct: (detailProductId: string) => void;
}

const formatRp = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

export const RevisionTimelineCard: React.FC<RevisionTimelineCardProps> = ({
  item,
  onClose,
  onAdvanceRevision,
  onOpenRevisionForm,
  onSelectProduct,
}) => {
  if (!item) return null;

  const hpp = item.hppPrice;
  const price = item.sellingPrice;
  const marginVal = hpp && price ? price - hpp : null;
  const marginPct =
    hpp && price && price > 0 ? Math.round(((price - hpp) / price) * 100) : null;

  return (
    <SlideOverDrawer
      open={Boolean(item)}
      onClose={onClose}
      maxWidthClass="sm:max-w-[460px]"
      closeAriaLabel="Tutup panel riwayat revisi"
      header={
        <div className="flex items-center gap-3 min-w-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.productName}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#EAE4D3]"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-[#FAF7EE] border border-[#EAE4D3] text-[11px] font-semibold text-[#18221D] tabular-nums">
                {item.version}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getRevisionBadgeTone(
                  item.statusBadge
                )}`}
              >
                {item.statusBadge}
              </span>
            </div>
            <h2 className="text-[17px] font-semibold text-[#18221D] mt-1 leading-snug truncate">
              {item.productName}
            </h2>
            <p className="text-[12px] text-[#7A867E] truncate">
              {item.supplier} · {item.categoryLabel} · {item.unitLabel}
            </p>
          </div>
        </div>
      }
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            {item.detailProductId && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectProduct(item.detailProductId!);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EAE4D3] hover:bg-[#FAF7EE] text-[#18221D] text-[12px] font-medium cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#526058]" />
                <span>Lihat Produk</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {item.isNeedsRevisionProduct && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRevisionForm(item);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12px] font-medium cursor-pointer shadow-xs transition-colors"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Ajukan Versi Revisi</span>
              </button>
            )}

            {item.revisionId && item.revisionStatus && item.revisionStatus !== 'Selesai' && (
              <button
                type="button"
                onClick={() => onAdvanceRevision(item.key)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12px] font-medium cursor-pointer shadow-xs transition-colors"
              >
                {item.revisionStatus === 'Dalam Perbaikan' ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ajukan Uji Ulang</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Selesai</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-[#EAE4D3] bg-white hover:bg-[#FAF7EE] text-[#526058] text-[12px] font-medium cursor-pointer transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      }
    >
      {/* 3-Column Financial Summary Strip */}
      {hpp && price && marginVal !== null && marginPct !== null && (
        <div className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2] p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 tabular-nums">
          <div>
            <div className="text-[11px] text-[#7A867E]">HPP Mitra</div>
            <div className="text-[15px] font-semibold text-[#18221D] mt-0.5">
              {formatRp(hpp)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#7A867E]">Harga Jual</div>
            <div className="text-[15px] font-semibold text-[#18221D] mt-0.5">
              {formatRp(price)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#7A867E]">Margin</div>
            <div className="text-[15px] font-semibold text-[#165239] mt-0.5">
              {formatRp(marginVal)} ({marginPct}%)
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-3">
        <div className="text-[11px] font-semibold tracking-[0.06em] text-[#7A867E] uppercase">
          LINIMASA REVISI &amp; KURASI ({item.entries.length})
        </div>

        <div className="space-y-4">
          {item.entries.map((entry, idx) => (
            <div
              key={entry.id}
              className="relative pl-5 pb-4 last:pb-0 border-l-2 border-[#EAE4D3]"
            >
              <span
                className={`absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  idx === 0 ? 'bg-[#165239]' : 'bg-[#D6CEBA]'
                }`}
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="text-[12.5px]">
                    <span className="font-semibold text-[#18221D]">{entry.actor}</span>
                    <span className="text-[#7A867E]"> · {entry.date}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium ${getRevisionBadgeTone(
                      entry.statusLabel
                    )}`}
                  >
                    {entry.version} · {entry.statusLabel}
                  </span>
                </div>

                <p className="text-[12.5px] text-[#526058] leading-relaxed">
                  {entry.note}
                </p>

                {entry.changes && entry.changes.length > 0 && (
                  <ul className="space-y-1 pt-0.5 text-[11.5px] text-[#7A867E] list-disc list-inside">
                    {entry.changes.map((chg) => (
                      <li key={chg}>{chg}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideOverDrawer>
  );
};
