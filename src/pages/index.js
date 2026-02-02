import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// Import Components ย่อยที่เราสร้างไว้
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import GameMap from '@site/src/components/GameMap';

// ส่วนหัว (Hero Header)
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="heroBanner">
      <div className="container">
        {/* ไอคอนหัวใจลอยได้ */}
        <div className="floating-icon" style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>
          💖
        </div>
        
        <h1 className="heroTitle">{siteConfig.title}</h1>
        <p className="hero__subtitle" style={{ fontSize: '1.5rem', color: '#8d99ae', marginBottom: '2.5rem' }}>
          {siteConfig.tagline}
        </p>
        
        <div className={clsx('buttons')}>
          <Link
            className="cuteButton"
            to="/docs/intro">
            เริ่มผจญภัยเลย! 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

// ส่วนแสดงแผนที่ในหน้าแรก
function HomeMapSection() {
    return (
      <section className="homeMapSection">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#4a4e69', fontWeight: 'bold' }}>
              🌍 แผนที่โลก Heartopia
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              สำรวจตำแหน่ง NPC จุดสำคัญ และทรัพยากรทั้งหมดได้ที่นี่
            </p>
          </div>
          
          {/* กล่องใส่แผนที่ + เงาสวยๆ */}
          <div style={{ 
            boxShadow: '0 20px 60px rgba(162, 210, 255, 0.4)', 
            borderRadius: '16px', 
            overflow: 'hidden',
            border: '4px solid white'
          }}>
              <GameMap />
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
               <Link to="/map" className="button button--secondary button--lg" style={{ borderRadius: '50px' }}>
                  ดูแผนที่แบบเต็มจอ 🔍
               </Link>
          </div>
        </div>
      </section>
    );
  }

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`ยินดีต้อนรับสู่ ${siteConfig.title}`}
      description="คู่มือการเล่นเกม Heartopia และแผนที่โลก">
      
      {/* 1. ส่วนหัวข้อ */}
      <HomepageHeader />
      
      <main>
        {/* 2. ส่วนเมนูการ์ด */}
        <section className="featureSection">
             <HomepageFeatures />
        </section>

        {/* 3. ส่วนแผนที่ */}
        <HomeMapSection />
      </main>
      
    </Layout>
  );
}