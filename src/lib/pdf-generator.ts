import { jsPDF } from "jspdf";
import { type Product } from "@/data/products";

const getFormattedDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const loadImageAsBase64 = (url: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const resolvedUrl = url.startsWith("http")
      ? url
      : typeof window !== "undefined"
      ? `${window.location.origin}${url}`
      : url;

    const img = new Image();
    if (resolvedUrl.startsWith("http") && !resolvedUrl.startsWith(window.location.origin)) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } else {
          resolve(null);
        }
      } catch (err) {
        console.warn("Base64 conversion failed:", err);
        resolve(null);
      }
    };
    img.onerror = () => {
      console.warn("Failed to load image for PDF:", url);
      resolve(null);
    };
    img.src = resolvedUrl;
  });
};

const getDivisionCode = (product: Product) => {
  if (product.divisionSlug === "life-sciences") return "LS";
  if (product.divisionSlug === "molecular-diagnostics") return "MD";
  const div = product.division.toLowerCase();
  if (div.includes("diagnostics")) return "CD";
  if (div.includes("pharma")) return "PH";
  if (div.includes("genomics")) return "GE";
  if (div.includes("biotech")) return "BT";
  return "GP";
};

const buildSpecsTable = (product: Product, catalogNumber: string): Record<string, string> => {
  const metadata: Record<string, string> = {
    "Product Name": product.name,
    Division: product.division,
    Category: product.category,
    "Catalog Number": catalogNumber,
  };

  if (product.subCategory) {
    metadata["Sub-Category"] = product.subCategory;
  }

  if (product.specs && Object.keys(product.specs).length > 0) {
    return { ...metadata, ...product.specs };
  }

  const isInstrument =
    product.name.toLowerCase().includes("analyzer") ||
    product.name.toLowerCase().includes("system") ||
    product.name.toLowerCase().includes("sequencer") ||
    product.name.toLowerCase().includes("extractor") ||
    product.name.toLowerCase().includes("incubator") ||
    product.name.toLowerCase().includes("platform");

  if (product.divisionSlug === "life-sciences") {
    return {
      ...metadata,
      "Regulatory Status": "Research Use Only (RUO)",
    };
  }

  if (product.divisionSlug === "molecular-diagnostics") {
    return {
      ...metadata,
      "Regulatory Status": "In Vitro Diagnostics (IVD) / CE-IVD",
    };
  }

  if (isInstrument) {
    return {
      ...metadata,
      "Operating Temp": "18-35°C",
      "Power Requirements": "AC 100-240V, 50/60Hz",
      "Regulatory Status": "CE Compliant / ISO 13485 Certified",
    };
  }

  return {
    ...metadata,
    "Regulatory Status": "Research Use Only (RUO) / General Laboratory Use",
  };
};

const getSafetyGuidelines = (product: Product): string[] => {
  const isInstrument =
    product.name.toLowerCase().includes("analyzer") ||
    product.name.toLowerCase().includes("system") ||
    product.name.toLowerCase().includes("sequencer") ||
    product.name.toLowerCase().includes("extractor") ||
    product.name.toLowerCase().includes("incubator") ||
    product.name.toLowerCase().includes("platform");

  if (product.divisionSlug === "life-sciences" || product.divisionSlug === "molecular-diagnostics") {
    return [
      "Always wear appropriate personal protective equipment (PPE), including lab coat, powder-free disposable gloves, and safety glasses.",
      "Do not pipette by mouth. Keep reagents closed tightly when not in use.",
      "Follow the product insert and validated laboratory protocols for sample handling and workflow setup.",
      "Dispose of biological specimen wastes, reagents, and packaging materials in accordance with municipal biohazard regulations.",
    ];
  }

  if (isInstrument) {
    return [
      "Ensure the instrument is connected to a properly grounded power outlet of the correct voltage.",
      "Do not open the instrument casing while powered on. Refer servicing to qualified personnel.",
      "Wear appropriate personal protective equipment (PPE) when handling biological samples or operating the machine.",
      "Clean and disinfect work surfaces and sample ports regularly to avoid cross-contamination.",
    ];
  }

  return [
    "Wear appropriate personal protective equipment (PPE) including lab coat, gloves, and safety glasses.",
    "Handle in accordance with good industrial hygiene and safety practice.",
    "Keep container tightly closed in a dry, cool and well-ventilated place.",
    "Dispose of contents/container to an approved waste disposal plant in accordance with local regulations.",
  ];
};

/**
 * Programmatically generates and downloads a professional datasheet PDF for any product.
 */
export async function generateProductPDF(product: Product) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 15;
  const marginTop = 20;
  const marginBottom = 20;
  const contentWidth = pageWidth - marginX * 2;

  let cursorY = marginTop;

  const setHeadingStyle = () => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 87, 184);
  };

  const setSubHeadingStyle = () => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
  };

  const setBodyStyle = () => {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
  };

  const setMetaStyle = () => {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
  };

  const checkPageBreak = (heightNeeded: number) => {
    const limit = pageHeight - marginBottom;
    if (cursorY + heightNeeded > limit) {
      doc.addPage();
      cursorY = marginTop;
      return true;
    }
    return false;
  };

  const renderBulletList = (
    items: string[],
    dotColor: [number, number, number],
    indent = 6
  ) => {
    setBodyStyle();
    items.forEach((item) => {
      checkPageBreak(6);
      doc.setFillColor(...dotColor);
      doc.circle(marginX + 2, cursorY - 1, 0.8, "F");
      const lines = doc.splitTextToSize(item, contentWidth - indent - 2);
      doc.text(lines, marginX + indent, cursorY);
      cursorY += lines.length * 4.5 + 2;
    });
    cursorY += 4;
  };

  const base64Image = product.image ? await loadImageAsBase64(product.image) : null;
  const catalogNumber = `MBC-${getDivisionCode(product)}-${product.slug.toUpperCase().substring(0, 12)}`;

  // PAGE 1: COVER
  doc.setFillColor(0, 87, 184);
  doc.rect(0, 0, pageWidth, 55, "F");
  doc.setFillColor(0, 182, 122);
  doc.rect(0, 55, pageWidth, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.text("MIRACO BIOCARE", marginX, 22);
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Healthcare, Diagnostics & Life Sciences Solutions", marginX, 29);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TECHNICAL DATASHEET", marginX, 44);

  cursorY = 75;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 159, 227);
  doc.text(product.division.toUpperCase(), marginX, cursorY);
  cursorY += 5;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text(`Product Category: ${product.category}`, marginX, cursorY);
  cursorY += 5;
  if (product.subCategory) {
    doc.text(`Sub-Category: ${product.subCategory}`, marginX, cursorY);
    cursorY += 5;
  }
  cursorY += 7;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(product.name, contentWidth);
  doc.text(titleLines, marginX, cursorY);
  cursorY += titleLines.length * 7 + 8;

  const imageWidth = 100;
  const imageHeight = 75;
  const imageX = (pageWidth - imageWidth) / 2;

  const drawPlaceholderBox = (x: number, y: number, w: number, h: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.rect(x, y, w, h, "FD");
    doc.setDrawColor(0, 159, 227);
    doc.setLineWidth(0.5);
    doc.line(x + 20, y + 25, x + w - 20, y + h - 25);
    doc.circle(x + w / 2, y + h / 2, 8, "S");
    doc.setTextColor(148, 163, 184);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    const placeholderLines = doc.splitTextToSize(product.name, w - 16);
    doc.text(placeholderLines, x + w / 2, y + h / 2 + 18, { align: "center" });
  };

  if (base64Image) {
    try {
      doc.addImage(base64Image, "PNG", imageX, cursorY, imageWidth, imageHeight);
    } catch {
      drawPlaceholderBox(imageX, cursorY, imageWidth, imageHeight);
    }
  } else {
    drawPlaceholderBox(imageX, cursorY, imageWidth, imageHeight);
  }
  cursorY += imageHeight + 15;

  doc.setDrawColor(241, 245, 249);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 8;

  setMetaStyle();
  doc.text(`Document Reference: DS-${product.slug.toUpperCase().replace(/-/g, "_")}`, marginX, cursorY);
  cursorY += 5;
  doc.text(`Catalog Number: ${catalogNumber}`, marginX, cursorY);
  cursorY += 5;
  doc.text(`Publication Date: ${getFormattedDate()}`, marginX, cursorY);
  doc.text(`Version: 2.1 (Validated)`, pageWidth - marginX, cursorY, { align: "right" });

  // PAGE 2+: PRODUCT DETAILS
  doc.addPage();
  cursorY = marginTop;

  let sectionIndex = 1;

  setHeadingStyle();
  doc.text(`${sectionIndex}. Product Overview`, marginX, cursorY);
  cursorY += 8;

  setBodyStyle();
  const descLines = doc.splitTextToSize(product.description, contentWidth);
  doc.text(descLines, marginX, cursorY);
  cursorY += descLines.length * 4.5 + 8;

  if (product.features?.length) {
    checkPageBreak(30);
    setSubHeadingStyle();
    doc.text(`${sectionIndex}.1 Key Features & Performance Indicators`, marginX, cursorY);
    cursorY += 6;
    renderBulletList(product.features, [0, 87, 184]);
  }

  if (product.benefits?.length) {
    checkPageBreak(30);
    setSubHeadingStyle();
    doc.text(`${sectionIndex}.2 Scientific & Operational Benefits`, marginX, cursorY);
    cursorY += 6;
    renderBulletList(product.benefits, [0, 182, 122]);
  }

  if (product.applications?.length) {
    checkPageBreak(30);
    setSubHeadingStyle();
    doc.text(`${sectionIndex}.3 Laboratory Use Cases & Applications`, marginX, cursorY);
    cursorY += 6;
    renderBulletList(product.applications, [0, 159, 227]);
  }

  sectionIndex++;

  // Technical Specifications
  checkPageBreak(50);
  setHeadingStyle();
  doc.text(`${sectionIndex}. Technical Specifications`, marginX, cursorY);
  cursorY += 8;

  const mergedSpecs = buildSpecsTable(product, catalogNumber);
  const rowHeight = 7.5;
  const colWidthKey = 55;
  const colWidthVal = contentWidth - colWidthKey;

  doc.setFillColor(241, 245, 249);
  doc.rect(marginX, cursorY, contentWidth, rowHeight, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(marginX, cursorY, contentWidth, rowHeight, "S");
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("Parameter", marginX + 4, cursorY + 5);
  doc.text("Standard Specification", marginX + colWidthKey + 4, cursorY + 5);
  cursorY += rowHeight;

  Object.entries(mergedSpecs).forEach(([key, value], idx) => {
    const valLines = doc.splitTextToSize(value, colWidthVal - 8);
    const calculatedRowHeight = Math.max(rowHeight, valLines.length * 4.5 + 3);

    checkPageBreak(calculatedRowHeight);

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginX, cursorY, contentWidth, calculatedRowHeight, "F");
    }

    doc.setDrawColor(241, 245, 249);
    doc.rect(marginX, cursorY, contentWidth, calculatedRowHeight, "S");

    doc.setFont("Helvetica", "bold");
    doc.setTextColor(71, 85, 105);
    doc.text(key, marginX + 4, cursorY + 5);

    doc.setFont("Helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    doc.text(valLines, marginX + colWidthKey + 4, cursorY + 5);

    cursorY += calculatedRowHeight;
  });
  cursorY += 10;

  // Storage Info
  if (product.storageInfo) {
    checkPageBreak(30);
    setSubHeadingStyle();
    doc.text(`${sectionIndex}.1 Storage & Stability Conditions`, marginX, cursorY);
    cursorY += 6;
    setBodyStyle();
    const storageLines = doc.splitTextToSize(product.storageInfo, contentWidth);
    doc.text(storageLines, marginX, cursorY);
    cursorY += storageLines.length * 4.5 + 8;
  }

  sectionIndex++;

  // Product Contents
  if (product.productContents && product.productContents.length > 0) {
    checkPageBreak(35);
    setHeadingStyle();
    doc.text(`${sectionIndex}. Product Contents & Kit Components`, marginX, cursorY);
    cursorY += 8;
    renderBulletList(product.productContents, [0, 182, 122]);
    sectionIndex++;
  }

  // Ordering Information
  if (product.orderingInfo && product.orderingInfo.length > 0) {
    checkPageBreak(35);
    setHeadingStyle();
    doc.text(`${sectionIndex}. Ordering Information`, marginX, cursorY);
    cursorY += 8;
    renderBulletList(product.orderingInfo, [0, 159, 227]);
    sectionIndex++;
  }

  // Safety
  if (product.safetyInfo && product.safetyInfo.length > 0) {
    checkPageBreak(35);
    setHeadingStyle();
    doc.text(`${sectionIndex}. Safety & Handling Guidelines`, marginX, cursorY);
    cursorY += 8;
    renderBulletList(product.safetyInfo, [239, 68, 68]);
    sectionIndex++;
  }

  // Contact
  checkPageBreak(40);
  setHeadingStyle();
  doc.text(`${sectionIndex}. Contact & Technical Support`, marginX, cursorY);
  cursorY += 8;

  setSubHeadingStyle();
  doc.text("Miraco Biocare Private Limited", marginX, cursorY);
  cursorY += 5;

  setBodyStyle();
  [
    "Address: Bohlochipora, Soura, Srinagar, Jammu & Kashmir, India – 190011",
    "Email: info@miracobiocare.com | miracobiocare@gmail.com",
    "Phone: +91 9596241023 | +91 8178882335",
    "Website: www.miracobiocare.com",
    `Product Reference: ${product.name} (${catalogNumber})`,
    "Support Desk:info@miracobiocare.com",
  ].forEach((line) => {
    checkPageBreak(6);
    doc.text(line, marginX, cursorY);
    cursorY += 4.5;
  });

  // Headers & footers
  const totalPages = doc.getNumberOfPages();

  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(marginX, 12, pageWidth - marginX, 12);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("MIRACO BIOCARE - PRODUCT DATASHEET", marginX, 10);
    doc.text(product.name.toUpperCase(), pageWidth - marginX, 10, { align: "right" });

    doc.line(marginX, pageHeight - 12, pageWidth - marginX, pageHeight - 12);
    doc.text(`Page ${i} of ${totalPages}`, marginX, pageHeight - 8);
    doc.text("© 2026 Miraco Biocare Private Limited. All rights reserved.", pageWidth - marginX, pageHeight - 8, { align: "right" });
  }

  const cleanFileName =
    product.name
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_-]+/g, "_") + "_Datasheet.pdf";

  doc.save(cleanFileName);
}
