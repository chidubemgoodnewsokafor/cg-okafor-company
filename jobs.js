
/* =========================================================
   C.G. OKAFOR CO.
   CAREERS AND JOB MANAGEMENT

   EDIT THIS FILE TO MANAGE JOB VACANCIES.

   status: "open"   = Display vacancy on careers page.
   status: "closed" = Hide vacancy from current opportunities.

   No changes to careers.html are required.
   ========================================================= */


const companyJobs = [

  // =======================================================
  // SOILEVA FARMS
  // =======================================================

  {
    id: "farm-attendant",

    title: "Farm Attendant",

    division: "Soileva Farms",

    category: "Farm Operations",

    status: "open",

    description:
      "We are looking for a responsible and hardworking Farm Attendant to support daily farm activities and help maintain efficient crop and livestock operations.",

    responsibilities: [
      "Attend to routine crop and livestock activities.",
      "Assist with planting, transplanting, feeding and watering.",
      "Monitor farm conditions and report unusual observations.",
      "Assist with harvesting and produce handling.",
      "Maintain cleanliness and orderliness around the farm.",
      "Keep basic farm activity and production records."
    ],

    qualifications: [
      "Basic education or relevant agricultural training.",
      "Practical farming experience is an advantage.",
      "Ability to follow instructions and work responsibly.",
      "Willingness to learn different farm operations.",
      "Good observation and communication skills."
    ],

    additionalSkills: [
      "Experience in vegetable production, poultry or livestock management.",
      "Basic record keeping."
    ]
  },


  // =======================================================
  // SOILEVA FARMS
  // =======================================================

  {
    id: "farm-labourer",

    title: "Farm Labourer",

    division: "Soileva Farms",

    category: "Farm Operations",

    status: "open",

    description:
      "We are seeking hardworking individuals to support physical and general farm activities, helping prepare and maintain farmland and assist with agricultural production.",

    responsibilities: [
      "Assist with land clearing and preparation.",
      "Prepare beds and support planting activities.",
      "Carry out weeding and general farm maintenance.",
      "Assist with manure and fertilizer application.",
      "Support harvesting, sorting and loading of farm produce.",
      "Carry out other general farm duties as required."
    ],

    qualifications: [
      "Basic education.",
      "Ability to undertake physical farm work.",
      "Willingness to work outdoors and follow instructions.",
      "Reliability, discipline and a good work attitude.",
      "Previous farm labour experience is an advantage."
    ],

    additionalSkills: [
      "Experience handling basic farm tools and equipment.",
      "Practical knowledge of land preparation and crop production."
    ]
  },


  // =======================================================
  // SOILEVA FARMCARE
  // =======================================================

  {
    id: "store-manager",

    title: "Store Manager",

    division: "Soileva Farmcare",

    category: "Retail and Business Operations",

    status: "open",

    description:
      "We are looking for a commercially minded and organised Store Manager to oversee agricultural retail operations, manage inventory, support customers and coordinate physical and online sales.",

    responsibilities: [
      "Manage daily store operations and sales activities.",
      "Supervise stock levels, inventory and product records.",
      "Assist customers with agricultural product enquiries.",
      "Coordinate online orders and product listings.",
      "Support social media promotion and digital marketing activities.",
      "Maintain sales records and prepare basic reports.",
      "Build and maintain good customer relationships.",
      "Coordinate product displays and store organisation."
    ],

    qualifications: [
      "OND, HND or B.Sc. in Business Administration, Marketing, Agriculture or a related discipline, or equivalent relevant experience.",
      "Experience in retail, sales or store management is an advantage.",
      "Good communication and customer service skills.",
      "Basic computer and digital skills.",
      "Ability to manage stock and maintain accurate records.",
      "Good organisation and problem-solving abilities."
    ],

    additionalSkills: [
      "Social media management.",
      "Online store and e-commerce management.",
      "Graphic design or basic promotional content creation.",
      "Knowledge of agricultural inputs and farming practices.",
      "Microsoft Excel and other office applications."
    ]
  },


  // =======================================================
  // OKAFOR AGRISCIENCE
  // =======================================================

  {
    id: "agricultural-research-officer",

    title: "Agricultural Research and Field Officer",

    division: "Okafor Agriscience",

    category: "Research and Development",

    status: "closed",

    description:
      "Support agricultural research, field trials and the development of practical solutions for crop and livestock farming.",

    responsibilities: [
      "Assist in planning and conducting agricultural trials.",
      "Collect and document field and farm data.",
      "Monitor crop and livestock experiments.",
      "Assist with research reports and findings.",
      "Support the evaluation of agricultural products and practices."
    ],

    qualifications: [
      "HND or B.Sc. in Agriculture, Crop Science, Animal Science or a related discipline.",
      "Interest in agricultural research and experimentation.",
      "Good observation and documentation skills.",
      "Basic computer and data management skills."
    ],

    additionalSkills: [
      "Field trial experience.",
      "Microsoft Excel and data analysis.",
      "Practical crop or livestock production."
    ]
  },


  // =======================================================
  // OKAFOR FARM TECHNOLOGY
  // =======================================================

  {
    id: "technical-sales-officer",

    title: "Technical Sales and Support Officer",

    division: "Okafor Farm Technology",

    category: "Technology and Equipment",

    status: "closed",

    description:
      "Promote agricultural equipment and technology while helping customers understand, select and use appropriate farming solutions.",

    responsibilities: [
      "Promote and sell agricultural equipment.",
      "Demonstrate products to prospective customers.",
      "Provide basic technical guidance and customer support.",
      "Coordinate equipment installation and maintenance.",
      "Follow up with customers and identify business opportunities.",
      "Maintain sales and customer records."
    ],

    qualifications: [
      "OND, HND or B.Sc. in Mechanical Engineering, Electrical Engineering, Agricultural Engineering, Agriculture or a related discipline.",
      "Sales or customer service experience is an advantage.",
      "Good communication and problem-solving skills.",
      "Willingness to learn about different farm technologies."
    ],

    additionalSkills: [
      "Equipment maintenance and troubleshooting.",
      "Digital marketing and social media.",
      "Product demonstrations and presentations.",
      "Driving experience."
    ]
  },


  // =======================================================
  // OKAFOR GRAIN AND OILSEEDS
  // =======================================================

  {
    id: "procurement-operations-officer",

    title: "Procurement and Operations Officer",

    division: "Okafor Grain and Oilseeds",

    category: "Procurement and Operations",

    status: "closed",

    description:
      "Coordinate the sourcing and procurement of agricultural commodities while supporting quality control, inventory and operational activities.",

    responsibilities: [
      "Identify and maintain relationships with commodity suppliers.",
      "Coordinate agricultural produce sourcing and purchasing.",
      "Assist with produce inspection and quality checks.",
      "Monitor inventory and warehouse activities.",
      "Coordinate transportation and commodity deliveries.",
      "Maintain procurement and transaction records."
    ],

    qualifications: [
      "OND, HND or B.Sc. in Agriculture, Agricultural Economics, Business Administration, Procurement or a related discipline.",
      "Good negotiation and communication skills.",
      "Basic inventory and record management skills.",
      "Ability to coordinate suppliers and operational activities."
    ],

    additionalSkills: [
      "Commodity trading and agricultural sourcing.",
      "Warehouse and logistics management.",
      "Microsoft Excel.",
      "Knowledge of grain and oilseed markets."
    ]
  },


  // =======================================================
  // CORPORATE OPERATIONS
  // =======================================================

  {
    id: "accounts-administration-officer",

    title: "Accounts and Administration Officer",

    division: "C.G. Okafor Co.",

    category: "Corporate Operations",

    status: "closed",

    description:
      "Support the company's financial record keeping, administrative processes and general business coordination.",

    responsibilities: [
      "Maintain financial and administrative records.",
      "Assist with bookkeeping and transaction documentation.",
      "Coordinate invoices, payments and expense records.",
      "Support office administration and documentation.",
      "Assist with operational reporting.",
      "Maintain organised company records."
    ],

    qualifications: [
      "OND, HND or B.Sc. in Accounting, Finance, Business Administration or a related discipline.",
      "Good numerical and organisational skills.",
      "Basic computer and office application skills.",
      "Attention to detail and confidentiality."
    ],

    additionalSkills: [
      "Microsoft Excel.",
      "Accounting software.",
      "Bookkeeping and financial reporting.",
      "Administrative coordination."
    ]
  },


  // =======================================================
  // CORPORATE OPERATIONS
  // =======================================================

  {
    id: "marketing-communications-officer",

    title: "Marketing and Communications Officer",

    division: "C.G. Okafor Co.",

    category: "Corporate Operations",

    status: "closed",

    description:
      "Support the visibility and growth of C.G. Okafor Co. and its businesses through marketing, digital communication and creative content.",

    responsibilities: [
      "Manage and support company social media platforms.",
      "Create promotional content and marketing materials.",
      "Coordinate digital marketing activities.",
      "Support business campaigns and product promotions.",
      "Prepare communications and company updates.",
      "Assist with website content and online visibility."
    ],

    qualifications: [
      "OND, HND or B.Sc. in Marketing, Mass Communication, Business Administration or a related discipline, or equivalent practical experience.",
      "Good written and verbal communication skills.",
      "Understanding of social media platforms.",
      "Creativity and attention to detail."
    ],

    additionalSkills: [
      "Graphic design.",
      "Photography and video editing.",
      "Website management.",
      "Copywriting and content creation.",
      "Digital advertising and analytics."
    ]
  }

];


// =========================================================
// WHATSAPP APPLICATION NUMBER
// International format without + or spaces.
// =========================================================

const recruitmentWhatsApp = "2349060485238";


// =========================================================
// JOB DISPLAY
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("jobs-container");
  const emptyMessage = document.getElementById("jobs-empty");
  const loadingMessage = document.getElementById("jobs-loading");

  if (!container || !emptyMessage) return;

  const openJobs = companyJobs.filter(function (job) {
    return job.status === "open";
  });

  container.innerHTML = "";

  if (loadingMessage) {
    loadingMessage.remove();
  }

  if (openJobs.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;


  // =====================================================
  // CREATE JOB LISTINGS
  // =====================================================

  openJobs.forEach(function (job) {

    const jobCard = document.createElement("details");
    jobCard.className = "about-faq-item job-card";
    jobCard.id = "job-" + job.id;


    // JOB TITLE AND DIVISION

    const summary = document.createElement("summary");

    const titleWrapper = document.createElement("span");

    const title = document.createElement("strong");
    title.textContent = job.title;

    const division = document.createElement("small");
    division.textContent =
      job.division + " · " + job.category;

    division.style.display = "block";
    division.style.marginTop = "8px";

    titleWrapper.appendChild(title);
    titleWrapper.appendChild(division);


    const status = document.createElement("span");
    status.className = "job-status";
    status.textContent = "OPEN";

    status.setAttribute("aria-label", "Vacancy open");

    summary.appendChild(titleWrapper);
    summary.appendChild(status);

    jobCard.appendChild(summary);


    // JOB DESCRIPTION

    const answer = document.createElement("div");
    answer.className = "about-faq-answer";


    const description = document.createElement("p");
    description.textContent = job.description;

    answer.appendChild(description);


    // RESPONSIBILITIES

    const responsibilitiesHeading = document.createElement("h4");
    responsibilitiesHeading.textContent = "Responsibilities";

    answer.appendChild(responsibilitiesHeading);

    const responsibilitiesList = document.createElement("ul");

    job.responsibilities.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      responsibilitiesList.appendChild(li);
    });

    answer.appendChild(responsibilitiesList);


    // QUALIFICATIONS

    const qualificationsHeading = document.createElement("h4");
    qualificationsHeading.textContent = "Qualifications";

    answer.appendChild(qualificationsHeading);

    const qualificationsList = document.createElement("ul");

    job.qualifications.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      qualificationsList.appendChild(li);
    });

    answer.appendChild(qualificationsList);


    // ADDITIONAL SKILLS

    if (job.additionalSkills && job.additionalSkills.length > 0) {

      const skillsHeading = document.createElement("h4");
      skillsHeading.textContent = "Additional Skills";

      answer.appendChild(skillsHeading);

      const skillsList = document.createElement("ul");

      job.additionalSkills.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        skillsList.appendChild(li);
      });

      answer.appendChild(skillsList);
    }


    // WHATSAPP APPLICATION

    const applyMessage =
      "Hello C.G. Okafor Co., I am interested in applying for the position of " +
      job.title +
      " at " +
      job.division +
      ". I would like to submit my application and learn about the next steps.";

    const applyLink = document.createElement("a");

    applyLink.href =
      "https://wa.me/" +
      recruitmentWhatsApp +
      "?text=" +
      encodeURIComponent(applyMessage);

    applyLink.className = "faq-business-link";

    applyLink.textContent = "Apply via WhatsApp →";

    applyLink.target = "_blank";
    applyLink.rel = "noopener noreferrer";

    answer.appendChild(applyLink);


    jobCard.appendChild(answer);

    container.appendChild(jobCard);

  });

});
