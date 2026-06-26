function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('คลังนวัตกรรมดิจิทัลเพื่อการศึกษา - ศธจ.เชียงใหม่')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * ดึงข้อมูลจาก Google Sheets หากล้มเหลวจะดึงข้อมูล Fallback
 */
function getEducationalData() {
  try {
    var sheetUrl = "https://docs.google.com/spreadsheets/d/1Lc4Da0jXAeax9K9NnZQHO5PQEexBsvy73Ml3FFGJ-d8/edit?usp=sharing";
    var ss = SpreadsheetApp.openByUrl(sheetUrl);
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { success: true, data: getFallbackData(), source: "fallback (empty sheet)" };
    }
    
    // คลีน headers
    var headers = data[0].map(function(h) { 
      return h.toString().trim(); 
    });
    
    var result = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // ตรวจสอบว่ามีชื่อนวัตกรรมหรือไม่
      if (row[0] && row[0].toString().trim() !== "") {
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
          var headerName = headers[j];
          var cellValue = row[j] ? row[j].toString().trim() : "";
          obj[headerName] = cellValue;
        }
        result.push(obj);
      }
    }
    return { success: true, data: result, source: "google-sheet" };
  } catch (error) {
    return { success: false, error: error.toString(), data: getFallbackData(), source: "fallback-error" };
  }
}

/**
 * ข้อมูลสำรอง (Fallback Data) จากไฟล์ CSV เดิม 15 นวัตกรรม
 */
function getFallbackData() {
  return [
    {
      "File Name": "ระบบสารสนเทศวิเคราะห์ผลสัมฤทธิ์ระดับชาติ (O-NET): จังหวัดเชียงใหม่",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "การพัฒนาเว็บแอปพลิเคชันสารสนเทศอัจฉริยะเพื่อวิเคราะห์และเปรียบเทียบแนวโน้มผลสอบ O-NET ย้อนหลัง 4 ปี (2565-2568) ของ ศธจ.เชียงใหม่ จำแนกรายสังกัดและมาตรฐานการเรียนรู้ ช่วยให้ศึกษานิเทศก์ใช้เป็นเครื่องมือชี้เป้าในการนิเทศเชิงรุกได้อย่างแม่นยำ",
      "Link sub folder": "https://ais-pre-lelv2qehhaoemuuh7e56bb-958605973671.asia-southeast1.run.app/"
    },
    {
      "File Name": "คลังกิจกรรมการเรียนรู้ส่งเสริมพหุปัญญาล้านนา",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "แพลตฟอร์ม Web application คลังนวัตกรรมการสอนระดับประถมศึกษา (ป.4-6) ที่บูรณาการ Soft Power ล้านนาเข้ากับพหุปัญญา มีระบบสืบค้นและคัดกรองกิจกรรม (Filter) ตามระดับชั้น บริบทท้องถิ่น และมิติพหุปัญญาหลัก เพื่อให้ครูผู้สอนเข้าถึงแผนการจัดการเรียนรู้และไอเดียการประเมินผลได้สะดวก",
      "Link sub folder": "https://cm-mi-p4-p6.vercel.app/"
    },
    {
      "File Name": "ระบบประเมินและเรียนรู้องค์ประกอบ Active Learning",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "ระบบสารสนเทศดิจิทัล \"Active Learning @ CMPEO\" สนับสนุนการประเมินตนเองของครูและผู้บริหารในการขับเคลื่อนการจัดการเรียนรู้เชิงรุกเชิงพื้นที่ (เชียงใหม่ พ.ศ. 2568-2569) ประมวลผลจากงานวิจัยเชิงโครงสร้างสถิติเพื่อยกระดับขีดความสามารถการสอนอย่างยั่งยืน",
      "Link sub folder": "https://active-learning-cmpeo.vercel.app/"
    },
    {
      "File Name": "ครูพร้อมใช้ (AI Prompt Library)",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "แพลตฟอร์ม \"ครูพร้อมใช้ (AI Prompt Library)\" คลังคำสั่งปฏิสัมพันธ์ (Prompt) สำหรับครูเพื่อใช้ AI เจนเนอเรชันสร้างสื่อการสอนและเครื่องมือประเมินสมรรถนะ/พหุปัญญาผู้เรียนรายบุคคล มีระบบแยกหมวดหมู่อาชีพ วัฒนธรรม และปุ่มคัดลอกโค้ดไปใช้ได้ทันที",
      "Link sub folder": "https://sornorpoom.github.io/prompt-for-digital-art/"
    },
    {
      "File Name": "ระบบสารสนเทศ School Learning Map",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "ระบบสารสนเทศในรูปแบบ Web Application (Google Apps Script) แสดงผลในลักษณะ Matrix Dashboard เพื่อติดตามและกำกับสถานะการส่งภารกิจ/ชิ้นงานของนักเรียนจำแนกตามรายเดือนและระดับชั้น (ป.1 - ป.5) พร้อมระบบคัดกรองข้อมูล (Filter) และลิงก์ดาวน์โหลดชิ้นงานรายบุคคล ช่วยหนุนเสริมการนิเทศติดตามเชิงพื้นที่ได้อย่างเป็นระบบ",
      "Link sub folder": "https://script.google.com/macros/s/AKfycbwUcxONWi80s_iuiN6Qzodt5nHw-LC0DhdgXCIPpED_Dmy7ZRX8UKn69cIMHeDMiImIgQ/exec"
    },
    {
      "File Name": "Chiang Mai Tourism Poster Collection from teacher",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "Web Application รูปแบบ Matrix Dashboard ติดตามสถานะการส่งภารกิจของครูและนักเรียนแยกตามรายเดือนและระดับชั้น (ป.1 - ป.5) พร้อมระบบ Filter คัดกรองและลิงก์ดาวน์โหลดชิ้นงานรายบุคคล หนุนเสริมกระบวนการกำกับติดตามและประเมินผลเชิงพื้นที่ได้อย่างเป็นระบบ",
      "Link sub folder": "https://script.google.com/macros/s/AKfycbyFjb83q8KJs1j_xGOyM-j43BTTjStyhfB_xurWpDi2PhH-AX_jtJ8CSSamBqO5xxxU/exec"
    },
    {
      "File Name": "Chiang Mai Tourism Poster Collection from student",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "ระบบสารสนเทศ Web Application (Google Apps Script) รูปแบบ Matrix Dashboard แสดงสถานการณ์ส่งภารกิจแยกรายเดือนและระดับชั้น (ป.1 - ป.5) พร้อมระบบคัดกรองตัวเลือกหลักและลิงก์ดาวน์โหลดชิ้นงานรายบุคคล ช่วยหนุนเสริมการติดตามและประเมินผลสัมฤทธิ์เชิงพื้นที่",
      "Link sub folder": "https://script.google.com/macros/s/AKfycbxIySS85ZhJ0gJ66asQDTU2hhWG-3OMAqZJxaZNp8b2hMEXiVY2xjgWH2DsJyzIs9cYsg/exec"
    },
    {
      "File Name": "คลังฐานข้อมูลนวัตกรรมและรายงานการวิจัยในชั้นเรียน",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "หน้าแรกของระบบสารสนเทศ (Main Platform Interface) แพลตฟอร์มบูรณาการสื่อดิจิทัลและการศึกษาเชิงพื้นที่ มีระบบสมาชิก สถิติจำนวนผลงานแยกรายอำเภอในจังหวัดเชียงใหม่ และส่วนแสดงผลงานเด่นเพื่อสร้างแรงบันดาลใจในการเรียนรู้",
      "Link sub folder": "https://script.google.com/macros/s/AKfycbzQcL0qvQ2_YFSO5xc8JTFujJPqUPqbIKUrdT_JqR_dzOUvH15ux8WJxKgrq7AVda8O/exec"
    },
    {
      "File Name": "คลังวิเคราะห์ตัวชี้วัดบูรณาการและกิจกรรม",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "ระบบสารสนเทศ Web-based Dashboard เพื่อการบริหารจัดการหลักสูตร โดยนำเสนอผลการวิเคราะห์และเชื่อมโยงตัวชี้วัดระหว่างทางและตัวชี้วัดปลายทาง (กลุ่มสาระฯ ภาษาไทย ชั้น ป.1) บูรณาการเข้ากับกิจกรรมและเทศกาลสำคัญตามปฏิทินตลอดปีการศึกษา ช่วยให้ครูผู้ออกแบบหน่วยการเรียนรู้สามารถสืบค้นและนำไปใช้จัดการเรียนการเรียนสอนได้อย่างเป็นระบบ",
      "Link sub folder": "https://subject-activity-analysis-cmpeo.vercel.app/"
    },
    {
      "File Name": "Storybook การวิจัยในชั้นเรียน",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.5 ห้องเรียนดิจิทัลและแพลตฟอร์มสื่อมัลติมีเดียออนไลน์ (Digital Classrooms, Video & Streaming Platforms)",
      "Academic Summary": "เป็นการนำเสนอแพลตฟอร์มห้องเรียนดิจิทัลและสื่อมัลติมีเดียออนไลน์เพื่อสนับสนุนการจัดกิจกรรมการเรียนรู้และการนิเทศทางไกล นวัตกรรมนี้ช่วยลดข้อจำกัดเชิงพื้นที่ เพิ่มความยืดหยุ่นในการเข้าถึงองค์ความรู้แก่ครูผู้สอน และเป็นเครื่องมือขับเคลื่อนการนิเทศในยุคดิจิทัลอย่างเป็นระบบ",
      "Link sub folder": "https://classroom-storybook-portal.vercel.app/"
    },
    {
      "File Name": "Storybook การวัดผลในชั้นเรียน",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.5 ห้องเรียนดิจิทัลและแพลตฟอร์มสื่อมัลติมีเดียออนไลน์ (Digital Classrooms, Video & Streaming Platforms)",
      "Academic Summary": "ชุดเอกสารแนวทางการทำวิจัยในชั้นเรียนที่แบ่งเนื้อหาเป็นเล่มย่อยแบบเบ็ดเสร็จ (เช่น นวัตกรรม, ประชากรและกลุ่มตัวอย่าง, การเก็บรวบรวมข้อมูล, การเขียนโครงร่าง) เพื่อเป็นคู่มือมาตรฐานให้ครูใช้แก้ปัญหาและพัฒนาการเรียนรู้ของผู้เรียนอย่างเป็นระบบ",
      "Link sub folder": "https://classroom-storybook-portal.vercel.app/"
    },
    {
      "File Name": "Claude ครูสร้างเว็บ",
      "Main mission": "กลุ่มที่ 4: การพัฒนานวัตกรรมและระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "แพลตฟอร์มการเรียนรู้และระบบสารสนเทศอัจฉริยะที่ช่วยยกระดับสมรรถนะครูในการสร้างเว็บสื่อการสอนและพอร์ตโฟลิโอ (วPA) ด้วย Claude AI โดยเป็นนวัตกรรมที่เปลี่ยนบทบาทครูจากผู้ใช้สื่อสู่การเป็น \"ผู้พัฒนาสื่อนวัตกรรมดิจิทัลปฏิสัมพันธ์\" ได้ด้วยตนเองโดยไม่ต้องเขียนโค้ด",
      "Link sub folder": "https://claude-web-guide-for-teachers.vercel.app/"
    },
    {
      "File Name": "รวมเล่ม school learning map final.pdf",
      "Main mission": "กลุ่มที่ 3: การบริหารจัดการเครือข่ายและประสานความร่วมมือเพื่อการพัฒนาการศึกษาเชิงพื้นที่",
      "Sub mission": "3.3 รายงานผลการดำเนินงานเชิงระบบและสารสนเทศเพื่อการตัดสินใจของผู้บริหาร",
      "Academic Summary": "เอกสารการจัดทำแผนที่การเรียนรู้ของโรงเรียน (School Learning Map) เชิงระบบ ที่รวบรวมสารสนเทศ ทิศทาง และผลการดำเนินงานของสถานศึกษาในเครือข่าย เพื่อให้ผู้บริหารและศึกษานิเทศก์ใช้เป็นฐานข้อมูลเชิงยุทธศาสตร์ในการตัดสินใจพัฒนาและนิเทศการศึกษาได้ตรงตามบริบทจริง",
      "Link sub folder": "https://drive.google.com/file/d/1SyioEhFerADIJploYWUoaryqfFsGKeXs/view?usp=sharing"
    },
    {
      "File Name": "ระบบคลังความรู้การนิเทศการศึกษาบนฐาน ลุก/รับ/ทำ/เรียน/รู้",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.4 แพลตฟอร์มและระบบสารสนเทศอัจฉริยะบนเครือข่ายอินเทอร์เน็ต (Website/Dashboard)",
      "Academic Summary": "ระบบ Web Dashboard ส่วนหน้า (Frontend) ที่เชื่อมโยงฐานข้อมูลจาก Google Sheets แบบ Real-time รวบรวมเอกสารวิชาการ 127 ไฟล์ จำแนกตามภารกิจหลัก 4 กลุ่มงาน เพื่อเป็นศูนย์กลางการเรียนรู้และการนิเทศดิจิทัลเชิงพื้นที่",
      "Link sub folder": "https://educational-supervision-hub.vercel.app/"
    },
    {
      "File Name": "ระบบคลัง Prompt for Antigravity 2.0 เพื่อการศึกษา",
      "Main mission": "กลุ่มที่ 4: การพัฒนาระบบนิเวศการเรียนรู้ดิจิทัลและเทคโนโลยีสารสนเทศเพื่อการนิเทศการศึกษา",
      "Sub mission": "4.2 การพัฒนาระบบอัตโนมัติและเครื่องมือช่วยปฏิบัติงาน (การเขียนสคริปต์/โค้ด/ระบบอัตโนมัติ)",
      "Academic Summary": "แพลตฟอร์มสารสนเทศเพื่อการขับเคลื่อนและบริหารจัดการชุดคำสั่ง (Prompt) ในระบบปัญญาประดิษฐ์ (AI) แยกกลุ่มผู้ใช้งานเป็นครูผู้สอน ผู้บริหาร และศึกษานิเทศก์ หนุนเสริมการทำงานเชิงอัตโนมัติและการสังเคราะห์งานวิจัยในชั้นเรียน",
      "Link sub folder": "https://script.google.com/macros/s/AKfycbwsO5CN6GF8ErK69DDOFMOX71k_cDWGBUfeyY3lpvW648UArtIDgvavxiegCJwONlvt/exec"
    }
  ];
}
