import { useState } from 'react';
import { Player } from '../../components/player/Player';
import { MiniPlayer } from '../../components/player/MiniPlayer';
import type { PlayerState } from '../../components/player/Player';
import { Button } from '../../components/primitives/Button';

const gradients = {
  neon:    'radial-gradient(circle at 65% 65%, oklch(0.45 0.16 310) 0%, transparent 60%), linear-gradient(180deg, oklch(0.22 0.05 280) 0%, oklch(0.12 0.02 250) 100%)',
  forest:  'radial-gradient(ellipse at 30% 80%, oklch(0.48 0.06 150) 0%, oklch(0.20 0.02 180) 70%)',
  dusk:    'linear-gradient(180deg, oklch(0.42 0.06 30) 0%, oklch(0.28 0.04 250) 60%, oklch(0.20 0.03 260) 100%)',
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

const stateOptions: { label: string; value: PlayerState }[] = [
  { label: '就绪', value: 'ready' },
  { label: '加载中', value: 'loading' },
  { label: '播放中', value: 'playing' },
  { label: '已暂停', value: 'paused' },
  { label: '缓冲中', value: 'buffering' },
  { label: '出错', value: 'error' },
];

export function PlayerSection() {
  const [playerState, setPlayerState] = useState<PlayerState>('paused');
  const [miniPlaying, setMiniPlaying] = useState(false);
  const [miniVisible, setMiniVisible] = useState(true);
  const [miniProgress, setMiniProgress] = useState(38);

  return (
    <div>
      <Section title="播放器" num="01 · Player">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {stateOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={playerState === opt.value ? 'accent' : 'secondary'}
              size="sm"
              onClick={() => setPlayerState(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-hairline)' }}>
          <Player
            title="城市延时摄影全流程拆解：从脚本到成片"
            creator="视觉探索者"
            initialState={playerState}
            key={playerState}
            chapters={[
              { time: 180, label: '器材选择' },
              { time: 540, label: '拍摄技巧' },
              { time: 900, label: '后期处理' },
            ]}
            bookmarks={[
              { time: 320, label: '关键时刻' },
            ]}
          />
        </div>
      </Section>

      <Section title="迷你播放器" num="02 · MiniPlayer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMiniVisible(true)}
              disabled={miniVisible}
            >
              显示
            </Button>
            <input
              type="range"
              min={0}
              max={100}
              value={miniProgress}
              onChange={(e) => setMiniProgress(Number(e.target.value))}
              style={{ width: 120 }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>
              {miniProgress}%
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
            {miniVisible && (
              <div style={{ position: 'relative', height: 72 }}>
                <MiniPlayer
                  title="城市延时摄影全流程拆解"
                  subtitle="视觉探索者 · 24:05"
                  placeholderGradient={gradients.neon}
                  progress={miniProgress}
                  playing={miniPlaying}
                  onPlay={() => setMiniPlaying(true)}
                  onPause={() => setMiniPlaying(false)}
                  onClose={() => setMiniVisible(false)}
                  onExpand={() => {}}
                />
              </div>
            )}
            <div style={{ position: 'relative', height: 72 }}>
              <MiniPlayer
                title="Dieter Rams: Ten Principles"
                subtitle="Vitsœ · 18:20"
                placeholderGradient={gradients.forest}
                progress={62}
                playing={false}
                onPlay={() => {}}
              />
            </div>
            <div style={{ position: 'relative', height: 72 }}>
              <MiniPlayer
                title="「镜头语言」深景深 vs 浅景深"
                subtitle="虚焦工作室 · 12:34"
                placeholderGradient={gradients.dusk}
                progress={8}
                playing={true}
                onPause={() => {}}
                onClose={() => {}}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
