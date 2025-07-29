import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { CVData } from '@/app/page';

const getCvHtml = (data: CVData): string => {
  const skillsHtml = data.skills.split(',').map(skill => 
    skill.trim() ? `<span class="skill-pill">${skill.trim()}</span>` : ''
  ).join('');

  const experienceHtml = data.experience.map(exp => `
    <div class="item">
      <div class="item-header">
        <h3 class="item-title">${exp.position}</h3>
        <span class="item-duration">${exp.duration}</span>
      </div>
      <h4 class="item-subtitle">${exp.company}</h4>
      <ul class="description">
        ${exp.description.split('\n').map(line => line ? `<li>${line.replace('-', '').trim()}</li>` : '').join('')}
      </ul>
    </div>
  `).join('');

  const educationHtml = data.education.map(edu => `
    <div class="item">
       <div class="item-header">
        <h3 class="item-title">${edu.school}</h3>
        <span class="item-duration">${edu.year}</span>
      </div>
      <h4 class="item-subtitle">${edu.degree}</h4>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>CV - ${data.name}</title>
      <style>
        body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.5; background: #fff; color: #404040; -webkit-print-color-adjust: exact; }
        .page { display: flex; width: 210mm; height: 297mm; margin: 0 auto; }
        .sidebar { width: 35%; background: #172554; color: #fff; padding: 32px; box-sizing: border-box; }
        .main { width: 65%; padding: 32px; box-sizing: border-box; }
        .profile-name { font-size: 26pt; font-weight: bold; color: #fff; line-height: 1.2; margin: 0; word-break: break-word; }
        .profile-title { font-size: 12pt; font-weight: normal; color: #93c5fd; margin: 8px 0 24px 0; }
        .contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 9pt; }
        .sidebar-section { margin-bottom: 24px; }
        .sidebar-section h2 { font-size: 10pt; font-weight: bold; color: #60a5fa; border-bottom: 1px solid #60a5fa; padding-bottom: 4px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1.5px; }
        .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
        .skill-pill { display: inline-block; background-color: #dbeafe; color: #1e3a8a; padding: 4px 10px; border-radius: 16px; font-size: 8pt; font-weight: bold; }
        .section { margin-bottom: 24px; }
        .section h2 { font-size: 10pt; font-weight: bold; color: #1e3a8a; border-bottom: 1px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1.5px;}
        .item { margin-bottom: 20px; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; }
        .item-title { font-size: 11pt; font-weight: bold; color: #172554; margin: 0; }
        .item-subtitle { font-size: 10pt; font-weight: normal; color: #525252; margin: 2px 0 6px 0; }
        .item-duration { font-size: 9pt; font-weight: normal; color: #737373; font-style: italic; white-space: nowrap; padding-left: 16px; }
        .description { list-style: none; padding-left: 0; margin: 0; font-size: 9.5pt; }
        .description li { padding-left: 1.2em; text-indent: -1.2em; }
        .description li::before { content: '•'; color: #1e3a8a; margin-right: 0.5em; font-size: 12pt; line-height: 1;}
      </style>
    </head>
    <body>
      <div class="page">
        <div class="sidebar">
          <h1 class="profile-name">${data.name}</h1>
          <p class="profile-title">${data.title}</p>
          <div class="sidebar-section">
            <h2>Kontak</h2>
            <div class="contact-item"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span> ${data.phone}</div>
            <div class="contact-item"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span> ${data.email}</div>
            <div class="contact-item"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span> ${data.address}</div>
          </div>
          <div class="sidebar-section">
            <h2>Keterampilan</h2>
            <div class="skills-container">${skillsHtml}</div>
          </div>
        </div>
        <div class="main">
          <div class="section"><h2>Ringkasan Profil</h2><p>${data.summary}</p></div>
          <div class="section"><h2>Pengalaman Kerja</h2>${experienceHtml}</div>
          <div class="section"><h2>Pendidikan</h2>${educationHtml}</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(req: NextRequest) {
  try {
    const data: CVData = await req.json();
    let browser;

    if (process.env.NODE_ENV === 'production') {
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    const page = await browser.newPage();
    await page.setContent(getCvHtml(data), { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV_${data.name.replace(/\s/g, '_')}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Gagal membuat PDF di server:', error);
    return new NextResponse('Gagal memproses PDF di server.', { status: 500 });
  }
}