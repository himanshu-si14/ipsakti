import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Sparkles, Shield, BookOpen,
  Leaf, Globe, FlaskConical, ListChecks, Users, Radio,
  Map, Settings, MessageSquare, ChevronRight, Zap
} from 'lucide-react';
import { USER } from '../../data/demo';

const NAV_SECTIONS = [
  {
    label: 'Workspace',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/passport/create', label: 'New Innovation', icon: Sparkles },
    ],
  },
  {
    label: 'Innovation Passport',
    items: [
      { path: '/passport/herbalx-001', label: 'Innovation Passport', icon: FileText },
      { path: '/classification', label: 'Product Classification', icon: Zap },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { path: '/ip-intelligence', label: 'IP Intelligence', icon: Shield },
      { path: '/tk-abs', label: 'Traditional Knowledge & ABS', icon: Leaf },
      { path: '/regulatory', label: 'Regulatory Intelligence', icon: BookOpen },
      { path: '/market-access', label: 'Market Access', icon: Globe },
      { path: '/evidence', label: 'Evidence Center', icon: FlaskConical },
    ],
  },
  {
    label: 'Planning',
    items: [
      { path: '/action-plan', label: 'Action Plan', icon: ListChecks },
      { path: '/expert-review', label: 'Expert Review', icon: Users },
      { path: '/radar', label: 'Regulatory Change Radar', icon: Radio },
    ],
  },
  {
    label: 'Tools',
    items: [
      { path: '/knowledge-map', label: 'Knowledge Map', icon: Map },
      { path: '/assistant', label: 'Sahayak', icon: MessageSquare },
      { path: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-name">IP-SAKTI</div>
        <div className="sidebar-brand-sub">Sahayak Platform</div>
        <span className="sidebar-brand-badge">Platform</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link${isActive ? ' active' : ''}`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{USER.initials}</div>
          <div>
            <div className="sidebar-user-name">{USER.name.split(' ')[0]}</div>
            <div className="sidebar-user-role">{USER.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
