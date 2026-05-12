import { useState } from 'react';
import { TopBar, SearchTrigger } from '../../components/chrome/TopBar';
import { SideNav } from '../../components/chrome/SideNav';
import { CommandPalette } from '../../components/chrome/CommandPalette';
import { BatchBar } from '../../components/chrome/BatchBar';
import { TaskPill } from '../../components/chrome/TaskPill';
import { Button } from '../../components/primitives/Button';
import { IconButton } from '../../components/primitives/IconButton';

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

const VewLogo = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M4 6l7 10L18 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 16l5-10" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.35" strokeLinecap="round" />
  </svg>
);

const navIcons = {
  browse: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" /><rect x="8" y="1.5" width="4.5" height="4.5" rx="1" /><rect x="1.5" y="8" width="4.5" height="4.5" rx="1" /><rect x="8" y="8" width="4.5" height="4.5" rx="1" /></svg>,
  collection: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="3" width="10" height="8" rx="1" /><path d="M5 3V2M9 3V2" strokeLinecap="round" /></svg>,
  download: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 2v7M4.5 6.5L7 9l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 10.5v1h10v-1" strokeLinecap="round" /></svg>,
  settings: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="7" cy="7" r="2" /><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.1 1.1M10 10l1.1 1.1M2.9 11.1L4 10M10 4l1.1-1.1" strokeLinecap="round" /></svg>,
};

export function ChromeSection() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [batchCount, setBatchCount] = useState(3);
  const [progress, setProgress] = useState(62);
  const [navActive, setNavActive] = useState('browse');
  const [sideActive, setSideActive] = useState('all');

  return (
    <div>
      <Section title="TopBar" num="01 · TopBar">
        <div style={{ border: '1px solid var(--line-hairline)', borderRadius: 10, overflow: 'hidden' }}>
          <TopBar
            logo={<VewLogo />}
            navItems={[
              { id: 'browse',     label: '浏览',    icon: navIcons.browse,     active: navActive === 'browse',     onClick: () => setNavActive('browse') },
              { id: 'collection', label: '合集',    icon: navIcons.collection, active: navActive === 'collection', onClick: () => setNavActive('collection') },
              { id: 'download',   label: '下载',    icon: navIcons.download,   active: navActive === 'download',   onClick: () => setNavActive('download') },
            ]}
            searchTrigger={<SearchTrigger onClick={() => setCmdOpen(true)} />}
            actions={
              <>
                <IconButton label="Notifications">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 2a5 5 0 015 5v3l1.5 2H2.5L4 10V7a5 5 0 015-5z" />
                    <path d="M7 14a2 2 0 004 0" strokeLinecap="round" />
                  </svg>
                </IconButton>
                <IconButton label="Settings">
                  {navIcons.settings}
                </IconButton>
              </>
            }
          />
        </div>
      </Section>

      <Section title="SideNav" num="02 · SideNav">
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', border: '1px solid var(--line-hairline)', borderRadius: 10, overflow: 'hidden', height: 480 }}>
          <SideNav
            groups={[
              {
                id: 'nav',
                items: [
                  { id: 'all',     label: '全部视频',  icon: navIcons.browse,     active: sideActive === 'all',       onClick: () => setSideActive('all'),     count: 248 },
                  { id: 'liked',   label: '已喜欢',   icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 12S2 8.5 2 5a2.5 2.5 0 015 0 2.5 2.5 0 015 0c0 3.5-5 7-5 7z" /></svg>, active: sideActive === 'liked', onClick: () => setSideActive('liked'), count: 42 },
                  { id: 'download', label: '下载',   icon: navIcons.download,   active: sideActive === 'download',  onClick: () => setSideActive('download'), count: 7 },
                ],
              },
              {
                id: 'collections',
                label: '合集',
                onAdd: () => {},
                items: [
                  { id: 'design',    label: '设计参考',  icon: <span className="si-swatch" style={{ background: 'oklch(0.65 0.08 230)', width: 8, height: 8, borderRadius: 2, display: 'inline-block' }} />, active: sideActive === 'design',    onClick: () => setSideActive('design'),    count: 34 },
                  { id: 'photo',     label: '摄影灵感',  icon: <span className="si-swatch" style={{ background: 'oklch(0.65 0.08 150)', width: 8, height: 8, borderRadius: 2, display: 'inline-block' }} />, active: sideActive === 'photo',     onClick: () => setSideActive('photo'),     count: 19 },
                  { id: 'arch',      label: '建筑',     icon: <span className="si-swatch" style={{ background: 'oklch(0.65 0.08 60)',  width: 8, height: 8, borderRadius: 2, display: 'inline-block' }} />, active: sideActive === 'arch',      onClick: () => setSideActive('arch'),      count: 8 },
                ],
              },
            ]}
            footer={{ usedLabel: '存储', usedValue: '14.2 GB / 50 GB', fill: 28 }}
          />
          <div style={{ padding: 24, overflow: 'hidden' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 20, letterSpacing: '-0.01em', margin: '0 0 8px', color: 'var(--text-primary)' }}>全部视频</h1>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: 0 }}>248 个视频</p>
          </div>
        </div>
      </Section>

      <Section title="⌘K 命令面板" num="03 · CommandPalette">
        <Button variant="secondary" onClick={() => setCmdOpen(true)}>
          打开命令面板 <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, marginLeft: 8, padding: '2px 6px', background: 'var(--bg-raised)', border: '1px solid var(--line-soft)', borderRadius: 4 }}>⌘K</kbd>
        </Button>
        <CommandPalette
          open={cmdOpen}
          onClose={() => setCmdOpen(false)}
          groups={[
            {
              id: 'recent',
              label: '最近浏览',
              items: [
                { id: '1', title: '城市延时摄影全流程拆解', subtitle: '视觉探索者 · 24:05', leadingType: 'thumb', placeholderGradient: 'linear-gradient(180deg, oklch(0.22 0.05 280) 0%, oklch(0.12 0.02 250) 100%)' },
                { id: '2', title: 'Dieter Rams: Ten Principles', subtitle: 'Vitsœ · 18:20', leadingType: 'thumb', placeholderGradient: 'radial-gradient(ellipse at 30% 80%, oklch(0.48 0.06 150) 0%, oklch(0.20 0.02 180) 70%)' },
              ],
            },
            {
              id: 'actions',
              label: '操作',
              items: [
                { id: 'add', title: '添加视频', leading: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 2v10M2 7h10" strokeLinecap="round" /></svg>, trail: <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)' }}>⌘N</span> },
                { id: 'settings', title: '偏好设置', leading: navIcons.settings },
              ],
            },
          ]}
        />
      </Section>

      <Section title="批量操作栏 · 任务指示" num="04 · BatchBar + TaskPill">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 32, position: 'relative', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'static' }}>
              <BatchBar
                count={batchCount}
                onClear={() => setBatchCount(0)}
                actions={
                  <>
                    <Button variant="secondary" size="sm">加入合集</Button>
                    <Button variant="danger" size="sm">删除</Button>
                  </>
                }
              />
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line-hairline)', borderRadius: 10, padding: 32, position: 'relative', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <TaskPill
              progress={progress}
              title="下载中"
              subtitle="3 个任务"
            />
            <input
              type="range" min={0} max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              style={{ width: 120 }}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
