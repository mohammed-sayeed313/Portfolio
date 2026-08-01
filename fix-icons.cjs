const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components', 'sections');
const files = [
  'Contact.jsx',
  'Experience.jsx',
  'Footer.jsx',
  'LanguagesAndInnovation.jsx',
  'TechArsenal.jsx',
  'Vision.jsx',
  'Projects.jsx',
  'FlagshipProject.jsx',
  'Education.jsx',
  'Achievements.jsx'
];

for (const file of files) {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('icon-rotate') && !content.includes("import { motion")) {
    if (content.includes("import React")) {
        content = content.replace(/import React(.*?);/, "import React$1;\nimport { motion } from 'framer-motion';");
    } else {
        content = "import { motion } from 'framer-motion';\n" + content;
    }
  }

  const regexStart = /<div\s+className=["']icon-rotate\s*(.*?)["']\s*>/g;
  content = content.replace(regexStart, (match, p1) => {
      changed = true;
      const extraClasses = p1.trim();
      let classAttr = extraClasses ? ` className="${extraClasses}"` : "";
      return `<motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}${classAttr}>`;
  });
  
  const regexEnd = /(<motion\.div whileHover=\{\{ rotate: 360 \}\} whileTap=\{\{ rotate: 360 \}\} transition=\{\{ duration: 0\.6, ease: "easeInOut" \}\}.*?>[\s\S]*?)<\/div>/g;
  content = content.replace(regexEnd, "$1</motion.div>");

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
