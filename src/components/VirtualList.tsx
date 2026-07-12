import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { ROW_HEIGHT } from '../types';

const OVERSCAN = 8;

interface Props<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export interface VirtualListHandle {
  scrollToIndex: (index: number) => void;
  getScrollTop: () => number;
}

function VirtualListInner<T>(
  { items, renderItem, className }: Props<T>,
  ref: React.Ref<VirtualListHandle>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setContainerHeight(entries[0].contentRect.height));
    ro.observe(el);
    setContainerHeight(el.clientHeight);
    return () => ro.disconnect();
  }, []);

  const handleScroll = useCallback(() => {
    if (containerRef.current) setScrollTop(containerRef.current.scrollTop);
  }, []);

  useImperativeHandle(ref, () => ({
    scrollToIndex(index: number) {
      const el = containerRef.current;
      if (el) el.scrollTop = index * ROW_HEIGHT;
    },
    getScrollTop() { return containerRef.current?.scrollTop ?? 0; },
  }));

  const totalHeight = items.length * ROW_HEIGHT;
  const startIdx = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endIdx = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + OVERSCAN);
  const visibleItems = items.slice(startIdx, endIdx);

  return (
    <div ref={containerRef} className={`overflow-y-auto ${className ?? ''}`} onScroll={handleScroll}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: startIdx * ROW_HEIGHT, left: 0, right: 0 }}>
          {visibleItems.map((item, i) => (
            <div key={startIdx + i} style={{ height: ROW_HEIGHT }}>
              {renderItem(item, startIdx + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const VirtualList = forwardRef(VirtualListInner) as <T>(
  props: Props<T> & { ref?: React.Ref<VirtualListHandle> },
) => JSX.Element;
