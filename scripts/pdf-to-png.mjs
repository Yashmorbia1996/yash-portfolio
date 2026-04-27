import mupdf from 'mupdf';
import { readFileSync, writeFileSync } from 'fs';

const files = [
  { src: 'public/images/certificates/cfd-solidworks-ansys-optimization.pdf', out: 'public/images/certificates/cfd-solidworks-ansys-optimization.png' },
  { src: 'public/images/certificates/gdt-basics-udemy.pdf',                  out: 'public/images/certificates/gdt-basics-udemy.png' },
  { src: 'public/images/certificates/iso-13485-2016.pdf',                    out: 'public/images/certificates/iso-13485-2016.png' },
];

for (const { src, out } of files) {
  const data = readFileSync(src);
  const doc = mupdf.Document.openDocument(data, 'application/pdf');
  const page = doc.loadPage(0);
  const scale = 2.0; // 144 dpi
  const matrix = mupdf.Matrix.scale(scale, scale);
  const pixmap = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false, true);
  writeFileSync(out, pixmap.asPNG());
  console.log('✓', out);
}
