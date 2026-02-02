// ไฟล์: src/components/GameMap/index.js
import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import 'leaflet/dist/leaflet.css';

// Component ย่อยสำหรับคำนวณการ Zoom และล็อคขอบ
// ต้องแยกออกมาเพื่อให้ใช้ Hook 'useMap' ได้
function MapController({ mapWidth, mapHeight }) {
  const { useMap } = require('react-leaflet');
  const map = useMap();

  useEffect(() => {
    // ฟังก์ชันคำนวณ MinZoom ให้ภาพพอดีกรอบเสมอ (ไม่เกิดช่องว่าง)
    const updateMinZoom = () => {
      const containerSize = map.getSize();
      const containerWidth = containerSize.x;
      const containerHeight = containerSize.y;

      // คำนวณอัตราส่วนว่าต้องซูมออกเท่าไหร่ถึงจะเห็นภาพเต็มพอดี
      // Math.max คือเลือกด้านที่ยาวกว่า เพื่อให้ภาพครอบคลุมพื้นที่ทั้งหมด (Cover Mode)
      // ถ้าอยากให้เห็นภาพทั้งหมดโดยมีขอบเหลือบ้าง ให้เปลี่ยนเป็น Math.min (Contain Mode)
      const minZoomX = Math.log2(containerWidth / mapWidth);
      const minZoomY = Math.log2(containerHeight / mapHeight);
      
      // เลือกค่าซูมที่ "ใหญ่กว่า" เพื่อให้ภาพเต็มจอเสมอ ไม่มีขอบขาว
      const calculatedMinZoom = Math.max(minZoomX, minZoomY);

      map.setMinZoom(calculatedMinZoom); // ตั้งค่า MinZoom ใหม่
      
      // ถ้าซูมปัจจุบันมันน้อยกว่า MinZoom ที่คำนวณได้ ให้เด้งกลับมา
      if (map.getZoom() < calculatedMinZoom) {
        map.setZoom(calculatedMinZoom);
      }
      
      // บังคับให้ขอบเขตแผนที่ (MaxBounds) เท่ากับขนาดภาพเป๊ะๆ
      // เพิ่ม Padding เล็กน้อย (เช่น 50px) กันบั๊กเส้นขอบ
      map.setMaxBounds([[-50, -50], [mapHeight + 50, mapWidth + 50]]);
    };

    // ทำงานครั้งแรก
    updateMinZoom();
    // จัดแผนที่ให้อยู่ตรงกลางตอนเริ่ม
    map.fitBounds([[0, 0], [mapHeight, mapWidth]]);

    // เมื่อมีการย่อขยายหน้าจอ ให้คำนวณใหม่
    map.on('resize', updateMinZoom);

    // Cleanup function
    return () => {
      map.off('resize', updateMinZoom);
    };
  }, [map, mapWidth, mapHeight]);

  return null;
}

function GameMapContent() {
  const L = require('leaflet');
  const { MapContainer, ImageOverlay, Marker, Popup } = require('react-leaflet');

  // ✅ 1. ตั้งค่าขนาดรูปภาพตามจริง
  const mapWidth = 2004;
  const mapHeight = 2004;
  const bounds = [[0, 0], [mapHeight, mapWidth]];

  // แก้ไข Icon หมุด (เหมือนเดิม)
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
  });

  return (
    <div style={{ position: 'relative', height: '600px', width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
        <MapContainer 
        center={[mapHeight / 2, mapWidth / 2]}
        zoom={0} // ค่าเริ่มต้น (เดี๋ยว MapController จะมาแก้ให้เอง)
        scrollWheelZoom={true} // ใช้เมาส์ซูมได้
        style={{ height: '100%', width: '100%', background: '#a2d2ff' }} // สีพื้นหลังเผื่อโหลดไม่ทัน
        crs={L.CRS.Simple}
        maxBoundsViscosity={1.0} // 🔥 สำคัญ! ค่า 1.0 คือชนขอบแข็งปั้ก ไม่มีการเด้งดึ๋งออกนอกขอบ
        >
        {/* ดึงรูปแผนที่มาวาง */}
        <ImageOverlay
            url="/img/world-map.jpg" // ❗เปลี่ยนชื่อไฟล์ตรงนี้ให้ตรงกับของคุณ
            bounds={bounds}
        />

        {/* ตัวควบคุมแผนที่อัจฉริยะที่เราเขียนเพิ่ม */}
        <MapController mapWidth={mapWidth} mapHeight={mapHeight} />

        {/* หมุดตัวอย่าง */}
        <Marker position={[1000, 1000]}>
            <Popup>📍 จุดกึ่งกลางแผนที่ (1000, 1000)</Popup>
        </Marker>

        </MapContainer>
    </div>
  );
}

export default function GameMap() {
  return (
    <BrowserOnly fallback={<div>กำลังโหลดแผนที่...</div>}>
      {() => <GameMapContent />}
    </BrowserOnly>
  );
}