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

  // Add framer-motion import if missing and if we are adding motion
  if (content.includes('icon-rotate') && !content.includes("import { motion")) {
    // try finding import React
    if (content.includes("import React")) {
        content = content.replace(/import React(.*?);/, "import React$1;\nimport { motion } from 'framer-motion';");
    } else {
        content = "import { motion } from 'framer-motion';\n" + content;
    }
  }

  // Use a precise regex to replace <div className="icon-rotate..."> ... </div>
  // We can match <div className="icon-rotate text-white"> ... </div>
  // Because nested divs could be tricky, but in our case, the inner content is just an <Icon /> component which is self-closing.
  // Wait, in Footer it's:
  // <div className="icon-rotate">
  //   <LinkedinIcon size={20} />
  // </div>
  
  // We will do a generic replacement:
  // <div className="icon-rotate[ extra_classes]"> to <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="[extra_classes]">
  
  const regexStart = /<div\s+className=["']icon-rotate\s*(.*?)["']\s*>/g;
  content = content.replace(regexStart, (match, p1) => {
      changed = true;
      const extraClasses = p1.trim();
      let classAttr = extraClasses ? ` className="${extraClasses}"` : "";
      return `<motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}${classAttr}>`;
  });
  
  // Now we need to replace the closing </div> for those motion.divs.
  // Since we don't want to replace ALL </div>, we can match:
  // <motion.div [attributes] > \n <Icon ... /> \n </div>
  // But wait, regex for this is:
  const regexEnd = /(<motion\.div whileHover=\{\{ rotate: 360 \}\} whileTap=\{\{ rotate: 360 \}\} transition=\{\{ duration: 0\.6, ease: "easeInOut" \}\}.*?>[\s\S]*?)<\/div>/g;
  content = content.replace(regexEnd, "$1</motion.div>");

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
