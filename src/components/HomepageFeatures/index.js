import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

// ==========================================
// 1. ส่วนตั้งค่าข้อมูล (CONFIG)
// ==========================================
// หมายเหตุ: ถ้าคุณมีไฟล์รูปไอคอน (PNG/SVG) แบบในภาพตัวอย่าง
// ให้เปลี่ยนจาก Emoji เป็น path รูปภาพ เช่น: icon: '/img/icons/fishing.png', isImage: true
const WikiData = [
  {
    title: '🎮 Gameplay & Systems',
    items: [
      { label: 'D.G. Membership', link: '/docs/gameplay/membership', icon: '💳' },
      { label: 'Shops', link: '/docs/gameplay/shops', icon: '🏪' },
    ]
  },
  {
    title: '🎣 Active Hobbies',
    items: [
      // ตัวอย่างการใช้รูปภาพ (ถ้ามี)
      // { label: 'Fishing', link: '/docs/hobbies/fishing', icon: '/img/hobby-fishing.png', isImage: true },
      { label: 'Fishing', link: '/docs/hobbies/fishing', icon: '🎣' },
      { label: 'Bug Catching', link: '/docs/hobbies/bug-catching', icon: '🦋' },
      { label: 'Birdwatching', link: '/docs/hobbies/birdwatching', icon: '🦜' },
      { label: 'Gardening', link: '/docs/hobbies/gardening', icon: '🌻' },
      { label: 'Cooking', link: '/docs/hobbies/cooking', icon: '🍳' },
    ]
  },
  {
    title: '🌍 The World',
    items: [
      { label: 'Weather', link: '/docs/world/weather', icon: '🌦️' },
      { label: 'Geography (Map)', link: '/map', icon: '🗺️' },
      { label: 'Animal Catalog', link: '/docs/world/animals', icon: '🦊' },
      { label: 'Villagers', link: '/docs/world/villagers', icon: '👥' },
      { label: 'Forage', link: '/docs/world/forage', icon: '🍄' },
      { label: 'Materials', link: '/docs/world/materials', icon: '🪵' },
      { label: 'Crops', link: '/docs/world/crops', icon: '🥕' },
    ]
  }
];

// ==========================================
// 2. ส่วนแสดงผล (COMPONENTS)
// ==========================================

// Component ย่อย: รายการเมนูแต่ละบรรทัด (Icon + Text)
function MenuItem({ label, link, icon, isImage }) {
  return (
    <Link to={link} className="menu-item-link">
      <div className="menu-item-row">
        {/* ส่วนไอคอน */}
        <div className="menu-item-icon">
          {isImage ? (
             <img src={icon} alt={label} />
          ) : (
             <span style={{ fontSize: '2.5rem' }}>{icon}</span>
          )}
        </div>
        {/* ส่วนข้อความ */}
        <div className="menu-item-label">
          {label}
        </div>
      </div>
    </Link>
  );
}

// Component หลัก: กรอบหมวดหมู่ (Floating Header + Content Box)
function CategorySection({ title, items }) {
  return (
    <div className="category-section-wrapper">
      {/* 1. กล่องหัวข้อที่ลอยอยู่ด้านบน (สีเขียว) */}
      <div className="category-floating-header">
        {title}
      </div>

      {/* 2. กรอบเนื้อหาหลัก (สีครีม) */}
      <div className="category-content-box">
        <div className="menu-item-list">
          {items.map((item, idx) => (
            <MenuItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="features-section-container">
      <div className="container">
        {/* ปรับให้เป็น Grid 2 คอลัมน์ เพื่อความสวยงาม */}
        <div className="row" style={{ justifyContent: 'center' }}>
            {WikiData.map((section, idx) => (
            <div key={idx} className={clsx('col col--6')} style={{ marginBottom: '4rem' }}>
                <CategorySection title={section.title} items={section.items} />
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}