import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  Plus, 
  HardDrive, 
  Download, 
  Sparkles, 
  HelpCircle,
  Briefcase,
  RotateCcw
} from 'lucide-react';
import { ChecklistItem } from '../types';

interface PreparednessChecklistProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: Omit<ChecklistItem, 'id'>) => void;
  onResetChecklist?: () => void;
}

export const PreparednessChecklist: React.FC<PreparednessChecklistProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onResetChecklist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('Water & Food');
  const [showAddForm, setShowAddForm] = useState(false);

  // Escape key listener for Add form
  useEffect(() => {
    if (!showAddForm) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAddForm(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddForm]);

  const categories = ['all', 'Water & Food', 'Medical', 'Documents', 'Power & Light', 'Sanitation'];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const essentialItems = items.filter((i) => i.isEssential);
  const completedEssential = essentialItems.filter((i) => i.completed).length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    onAddItem({
      title: newItemTitle.trim(),
      category: newItemCategory,
      description: 'Personalized emergency readiness necessity.',
      completed: false,
      isEssential: true,
    });

    setNewItemTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card with Progress Ring and Local Storage Badge */}
      <div className="bg-white rounded-3xl border border-[#263746]/10 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DDF4E9] text-[#13734B]">
                <HardDrive className="w-3.5 h-3.5" />
                <span>Saved in Local Browser Storage</span>
              </span>
              <span className="text-xs font-semibold text-[#263746]/60">
                72-Hour Evacuation Bag
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263746] tracking-tight">
              Emergency Survival Kit Readiness
            </h2>
            <p className="text-sm text-[#263746]/80 mt-1 max-w-xl">
              Guidance checklist to sustain your household for 3 days without municipal utilities. Your checked items and custom entries are automatically saved on this device.
            </p>
          </div>

          {/* Large Progress Indicator */}
          <div className="bg-[#FAFBF7] border border-[#263746]/8 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#ecf4ff"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#167D78"
                  strokeWidth="6"
                  strokeDasharray="163.3"
                  strokeDashoffset={163.3 - (163.3 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute font-extrabold text-sm text-[#167D78] tabular-nums">
                {progressPercent}%
              </span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#263746]/60 block">
                Survival Readiness
              </span>
              <span className="text-base font-extrabold text-[#263746] block">
                {completedCount} of {totalCount} Items Ready
              </span>
              <span className="text-xs font-semibold text-[#3D9368]">
                {completedEssential}/{essentialItems.length} Essential verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs, Add Button, and Reset Option */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#263746]/10 rounded-xl shadow-xs overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#167D78] text-white shadow-xs'
                  : 'text-[#263746]/70 hover:text-[#263746] hover:bg-[#FAFBF7]'
              }`}
            >
              {cat === 'all' ? 'All Essentials' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onResetChecklist && (
            <button
              onClick={onResetChecklist}
              className="px-3 py-2 rounded-xl border border-[#263746]/20 text-[#263746]/70 hover:bg-[#FAFBF7] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Reset checklist to standard 72h survival pack template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Standard Template</span>
            </button>
          )}

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl bg-[#ecf4ff] hover:bg-[#d8eafe] text-[#167D78] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Item</span>
          </button>
        </div>
      </div>

      {/* Custom Item Form with Semantic Labels & IDs */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white rounded-2xl border border-[#263746]/15 p-5 shadow-xs flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label htmlFor="custom-item-name" className="block text-xs font-bold text-[#263746] mb-1">
              Item Name / Description <span className="text-[#C94242]">*</span>
            </label>
            <input
              id="custom-item-name"
              type="text"
              required
              placeholder="e.g. Extra baby formula or prescription spectacles"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              className="w-full bg-white border border-[#263746]/20 rounded-xl px-3.5 py-2 text-xs text-[#263746] focus:outline-none focus:border-[#167D78] focus:ring-2 focus:ring-[#167D78]/20"
            />
          </div>

          <div className="w-full sm:w-48">
            <label htmlFor="custom-item-category" className="block text-xs font-bold text-[#263746] mb-1">
              Category
            </label>
            <select
              id="custom-item-category"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as ChecklistItem['category'])}
              className="w-full bg-white border border-[#263746]/20 rounded-xl px-3 py-2 text-xs text-[#263746] focus:outline-none focus:border-[#167D78] cursor-pointer"
            >
              <option value="Water & Food">Water & Food</option>
              <option value="Medical">Medical</option>
              <option value="Documents">Documents</option>
              <option value="Power & Light">Power & Light</option>
              <option value="Sanitation">Sanitation</option>
            </select>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl border border-[#263746]/20 text-xs font-bold text-[#263746] cursor-pointer"
            >
              Cancel (Esc)
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#167D78] text-white text-xs font-bold shadow-xs hover:bg-[#126561] cursor-pointer"
            >
              Save to Bag
            </button>
          </div>
        </form>
      )}

      {/* Checklist Items: Scaled 24x24px Checkboxes */}
      <div className="bg-white rounded-3xl border border-[#263746]/10 p-4 sm:p-6 shadow-sm divide-y divide-[#263746]/8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggleItem(item.id)}
            className="py-4 px-2 sm:px-3 flex items-start gap-4 hover:bg-[#FAFBF7] rounded-xl transition-colors cursor-pointer select-none"
          >
            {/* Prominent 24x24px footprint checkbox */}
            <div className="pt-0.5 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleItem(item.id);
                }}
                className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all cursor-pointer ${
                  item.completed
                    ? 'bg-[#167D78] border-[#167D78] text-white'
                    : 'bg-white border-[#263746]/30 hover:border-[#167D78]'
                }`}
                aria-label={`Toggle ${item.title}`}
              >
                {item.completed && <CheckSquare className="w-4 h-4 stroke-[3]" />}
              </button>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-base font-bold tracking-tight transition-all ${
                    item.completed
                      ? 'text-[#263746]/50 line-through'
                      : 'text-[#263746]'
                  }`}
                >
                  {item.title}
                </span>

                {item.isEssential && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#b44800] bg-[#ffeedd] px-2 py-0.5 rounded-md">
                    Priority Essential
                  </span>
                )}

                <span className="text-xs text-[#263746]/50 font-medium">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-[#263746]/70 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
