import { useState } from 'react';
import { VideoCardGrid } from '../../components/cards/VideoCardGrid';
import { VideoCardList } from '../../components/cards/VideoCardList';
import { VideoCardCover } from '../../components/cards/VideoCardCover';
import { CollectionCard } from '../../components/cards/CollectionCard';
import { CreatorCard } from '../../components/cards/CreatorCard';
import { DownloadCard } from '../../components/cards/DownloadCard';
import { Button } from '../../components/primitives/Button';

const gradients = {
  dusk:    'linear-gradient(180deg, oklch(0.42 0.06 30) 0%, oklch(0.28 0.04 250) 60%, oklch(0.20 0.03 260) 100%)',
  forest:  'radial-gradient(ellipse at 30% 80%, oklch(0.48 0.06 150) 0%, oklch(0.20 0.02 180) 70%)',
  neon:    'radial-gradient(circle at 65% 65%, oklch(0.45 0.16 310) 0%, transparent 60%), linear-gradient(180deg, oklch(0.22 0.05 280) 0%, oklch(0.12 0.02 250) 100%)',
  warm:    'radial-gradient(circle at 30% 40%, oklch(0.58 0.10 60) 0%, oklch(0.22 0.04 30) 70%)',
  violet:  'linear-gradient(160deg, oklch(0.40 0.10 290) 0%, oklch(0.20 0.05 280) 100%)',
  glacier: 'linear-gradient(180deg, oklch(0.65 0.04 200) 0%, oklch(0.30 0.04 220) 100%)',
};

function Section({ title, num, children }: { title: string; num: string; children: React.ReactNode }) {
  return (
    <section style={{ paddingBottom: 48, borderBottom: '1px solid var(--line-hairline)', marginBottom: 48 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>{num}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, letterSpacing: '-0.01em', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

const sampleVideos = [
  { title: '「镜头语言」深景深 vs 浅景深的表达差异', creator: '虚焦工作室', meta: '2024 · 12:34', gradient: 'dusk' as const },
  { title: 'Dieter Rams: The Ten Principles of Good Design', creator: 'Vitsœ', meta: '2023 · 18:20', gradient: 'forest' as const },
  { title: '城市延时摄影全流程拆解', creator: '视觉探索者', meta: '2024 · 24:05', gradient: 'neon' as const },
  { title: 'Why Brutalism Works in 2024', creator: 'Architecture Now', meta: '2024 · 9:48', gradient: 'warm' as const },
  { title: '电影感色调调色详解 Luts 使用技巧', creator: '调色实验室', meta: '2024 · 31:12', gradient: 'violet' as const },
  { title: 'The Quiet Architecture of Kengo Kuma', creator: 'Dezeen', meta: '2023 · 14:22', gradient: 'glacier' as const },
];

export function CardsSection() {
  const [liked, setLiked] = useState<Set<number>>(new Set([1]));
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectMode, setSelectMode] = useState(false);

  const toggleLike = (i: number) => setLiked((s) => {
    const n = new Set(s);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });
  const toggleSelect = (i: number) => setSelected((s) => {
    const n = new Set(s);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });

  return (
    <div>
      <Section title="VideoCard.Grid (16:9)" num="01 · Grid">
        <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
          <Button
            variant={selectMode ? 'accent' : 'secondary'}
            size="sm"
            onClick={() => { setSelectMode((m) => !m); if (selectMode) setSelected(new Set()); }}
          >
            {selectMode ? `已选 ${selected.size} 项` : '批量选择'}
          </Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px 16px' }}>
          {sampleVideos.map((v, i) => (
            <VideoCardGrid
              key={i}
              title={v.title}
              creator={v.creator}
              meta={v.meta}
              duration="12:34"
              placeholderGradient={gradients[v.gradient]}
              liked={liked.has(i)}
              selectable={selectMode}
              selected={selected.has(i)}
              onLike={() => toggleLike(i)}
              onSelect={() => toggleSelect(i)}
              onPlay={() => {}}
              onMore={() => {}}
              onAddToCollection={() => {}}
            />
          ))}
        </div>
      </Section>

      <Section title="VideoCard.Portrait (9:16)" num="02 · Portrait">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '24px 16px' }}>
          {sampleVideos.slice(0, 4).map((v, i) => (
            <VideoCardGrid
              key={i}
              portrait
              title={v.title.slice(0, 30) + '…'}
              creator={v.creator}
              meta={v.meta}
              duration="0:42"
              placeholderGradient={gradients[v.gradient]}
              liked={liked.has(i)}
              onLike={() => toggleLike(i)}
            />
          ))}
        </div>
      </Section>

      <Section title="VideoCard.List" num="03 · List">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, overflow: 'hidden' }}>
          {sampleVideos.map((v, i) => (
            <VideoCardList
              key={i}
              title={v.title}
              creator={v.creator}
              meta={v.meta}
              duration="12:34"
              placeholderGradient={gradients[v.gradient]}
              tags={i < 3 ? ['设计', '摄影'] : undefined}
            />
          ))}
        </div>
      </Section>

      <Section title="VideoCard.Cover" num="04 · Cover">
        <VideoCardCover
          title="城市延时摄影全流程拆解：从脚本到成片"
          eyebrow="精选"
          creator="视觉探索者"
          meta="2024 · 24:05"
          placeholderGradient={gradients.neon}
        />
      </Section>

      <Section title="CollectionCard" num="05 · Collection">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px 16px' }}>
          {['设计参考', '摄影灵感', '建筑'].map((name, i) => (
            <CollectionCard
              key={i}
              title={name}
              count={12 + i * 7}
              thumbnailGradient={gradients[(['dusk', 'forest', 'warm'] as const)[i]]}
              thumbnailGradientMid={gradients[(['forest', 'neon', 'glacier'] as const)[i]]}
              thumbnailGradientBack={gradients[(['violet', 'dusk', 'neon'] as const)[i]]}
            />
          ))}
        </div>
      </Section>

      <Section title="CreatorCard" num="06 · Creator">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {[
            { name: '虚焦工作室', platform: 'Bilibili', count: 48 },
            { name: 'Dezeen', platform: 'YouTube', count: 312 },
            { name: 'Architecture Now', platform: 'Vimeo', count: 27 },
          ].map((c, i) => (
            <CreatorCard key={i} name={c.name} platform={c.platform} videoCount={c.count} />
          ))}
        </div>
      </Section>

      <Section title="DownloadCard.Row" num="07 · Download">
        <div>
          <DownloadCard
            title="城市延时摄影全流程拆解"
            placeholderGradient={gradients.neon}
            status="downloading"
            progress={62}
            speed="2.4 MB/s"
            eta="剩余 3 分钟"
          />
          <DownloadCard
            title="Dieter Rams: The Ten Principles"
            placeholderGradient={gradients.forest}
            status="paused"
            progress={31}
          />
          <DownloadCard
            title="「镜头语言」深景深 vs 浅景深"
            placeholderGradient={gradients.dusk}
            status="parsing"
          />
          <DownloadCard
            title="The Quiet Architecture of Kengo Kuma"
            placeholderGradient={gradients.glacier}
            status="failed"
          />
          <DownloadCard
            title="电影感色调调色详解"
            placeholderGradient={gradients.violet}
            status="complete"
          />
        </div>
      </Section>
    </div>
  );
}
