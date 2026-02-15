import { Mission } from './types';

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "ภารกิจที่ 01: แหล่งพลังงาน",
    description: "ค้นหาวัตถุที่มี สีเหลือง และ โค้งงอ",
    targetKeywords: ["banana", "fruit", "yellow"],
  },
  {
    id: 2,
    title: "ภารกิจที่ 02: หน่วยเติมน้ำ",
    description: "ค้นหา ภาชนะสำหรับใส่น้ำ (แก้ว/ขวด)",
    targetKeywords: ["cup", "bottle", "glass", "mug"],
  },
  {
    id: 3,
    title: "ภารกิจที่ 03: ฐานข้อมูลความรู้",
    description: "ค้นหาวัตถุที่มี ตัวหนังสือ หรือ หน้ากระดาษ",
    targetKeywords: ["book", "paper", "sign", "screen"],
  },
  {
    id: 4,
    title: "ภารกิจที่ 04: สิ่งมีชีวิตชีวภาพ",
    description: "ค้นหา ต้นไม้ หรือ ดอกไม้",
    targetKeywords: ["plant", "flower", "tree", "leaf"],
  },
  {
    id: 5,
    title: "ภารกิจที่ 05: ผู้รักษาเวลา",
    description: "ค้นหาวัตถุที่มี ทรงกลม",
    targetKeywords: ["ball", "clock", "coin", "wheel"],
  },
];

export const MAX_TIME_SECONDS = 60;
