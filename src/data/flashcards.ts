import { Flashcard } from '../types';

export const PRELOAD_FLASHCARDS: Flashcard[] = [
  // --- SECTION I: GENERAL ANEMIA ---
  {
    id: 'anem_g_q1',
    category: 'General Anemia',
    part: 'Section I',
    source: 'Anemia',
    question: 'What is the pathogenesis of anemia?',
    answer: 'Anemia results from decreased RBCs or hemoglobin, causing generalized hypoxia. This hypoxia leads to:\n\n• **Hypoxic degeneration or necrosis** of parenchymatous organs (heart, liver, kidneys).\n• **Endothelial degeneration** → petechial hemorrhages (acute) and edema (subacute/chronic).\n• **Generalized catabolic processes** in chronic cases → muscular atrophy and replacement fibrosis.'
  },
  {
    id: 'anem_g_q2',
    category: 'General Anemia',
    part: 'Section I',
    source: 'Anemia',
    question: 'What are the clinical signs of anemia?',
    answer: '• **Acute:** Increased heart and respiratory rates; pale mucous membranes, fatigue, depression; fever (in infectious cases).\n• **Subacute:** Edema — especially in the lower abdomen, dewlap, and limbs.\n• **Chronic:** Generalized catabolism → yellow, gelatin-like fat; terminal emaciation.'
  },
  {
    id: 'anem_g_q3',
    category: 'General Anemia',
    part: 'Section I',
    source: 'Anemia',
    question: 'What are the postmortem lesions (Acute, Subacute, Chronic)?',
    answer: '• **Acute:** Pale mucous membranes ± petechial hemorrhages (or icterus in hemolytic cases); pale degenerative discoloration of the heart; anemic peri-acinar liver necrosis; hyperplastic red bone marrow.\n• **Subacute:** Presence of edema.\n• **Chronic:** Terminal emaciation, serous atrophy of fat; atrophy of muscles/organs and replacement fibrosis.'
  },
  {
    id: 'anem_g_q4',
    category: 'General Anemia',
    part: 'Section I',
    source: 'Anemia',
    question: 'What are the microscopic lesions of anemia (Acute, Subacute, Chronic)?',
    answer: '• **Acute:** Generalized petechial hemorrhages and peri-acinar necrosis in the liver. In hemolytic cases: bile-distended canaliculi, generalized hemosiderosis, and hemoglobin casts in the kidney.\n• **Subacute:** Presence of oedema.\n• **Chronic:** Serous atrophy of fat, atrophy of muscles and parenchymatous organs; replacement fibrosis.'
  },
  {
    id: 'anem_g_q5',
    category: 'General Anemia',
    part: 'Section I',
    source: 'Anemia',
    question: 'What are the characters of compensatory active erythropoiesis?',
    answer: 'The bone marrow responds to anemia by releasing immature RBCs into circulation:\n\n• **Rubricytosis:** Circulating nucleated red blood cells (rubricytes).\n• **Reticulocytosis:** Elevated immature RBCs — a key indicator of bone marrow activity.\n• **Polychromasia:** RBCs displaying multiple colors on a blood film due to varying maturity.'
  },
  {
    id: 'anem_g_q6',
    category: 'General Anemia',
    part: 'Section I',
    source: 'Anemia',
    question: 'What are the common pathological changes of RBCs and their significance?',
    answer: '• **Anisocytosis:** Change in size. Significance: Predominates in anemia.\n• **Hypochromasia:** Decreased Hb content. Significance: Iron deficiency / chronic blood loss.\n• **Spherocytes:** Small, round, dense RBCs. Significance: Immune-mediated hemolytic anemia.\n• **Target cells (Codocytes):** Central Hb island. Significance: Liver disease / regenerative anemia.\n• **Schistocytes:** RBC fragments. Significance: Microangiopathic anemia / sepsis.\n• **Heinz bodies:** Denatured Hb inclusions. Significance: Oxidative injury to hemoglobin.'
  },
  {
    id: 'anem_g_q7',
    category: 'General Anemia',
    part: 'Section I',
    source: 'Anemia',
    question: 'Enumerate the types of poikilocytosis (abnormal RBC shapes).',
    answer: '• **Leptocytes:** Thin, flat cells with folded edges.\n• **Target cells (Codocytes):** Bull\'s-eye appearance (seen in liver disease).\n• **Stomatocytes:** Slit or mouth-like central pallor.\n• **Echinocytes:** Uniformly spiculated cells (crenated).\n• **Spherocytes:** Small, dense, round cells — no central pallor.\n• **Schistocytes:** Fragmented RBCs.\n• **Basophilic stippling:** Residual RNA aggregates; seen in lead poisoning.\n• **Heinz bodies:** Oxidized Hb precipitates.\n• **Howell-Jolly bodies:** Nuclear remnants — seen post-splenectomy.\n• **Ghost cells:** Empty cell membranes after severe hemolysis.\n• **Keratocytes:** Helmet or bite cells.\n• **Eccentrocytes:** Hb displaced to one side.\n• **Elliptocytes:** Oval/elongated RBCs.\n• **Siderocytes:** Iron granule-containing cells.\n• **Drepanocytes:** Sickle-shaped cells.'
  },

  // --- SECTION II: DEFICIENCY ANEMIA & LEUKEMIA ---
  {
    id: 'anem_d_q1',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part A (Deficiency Anemias)',
    source: 'Anemia',
    question: 'Describe Iron Deficiency Anemia (etiology, pathogenesis, hematological picture).',
    answer: '• **Etiology:** Suckling restricted to milk; pregnancy without iron supplementation; hemorrhage (e.g., stomach ulcers) or intestinal disorders (diarrhea).\n• **Pathogenesis:** Defective hemoglobin formation due to insufficient iron supply.\n• **Hematological Picture (STAGES):**\n  1. **1st stage (Iron depletion):** Normochromic normocytic anemia.\n  2. **2nd stage (Deficient erythropoiesis):** Hypochromic normocytic anemia.\n  3. **3rd stage (Established deficiency):** Hypochromic microcytic anemia with basophilic stippling and leptocytosis.'
  },
  {
    id: 'anem_d_q2',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part A (Deficiency Anemias)',
    source: 'Anemia',
    question: 'Describe Copper (Cu) Deficiency Anemia (pathogenesis, hematological picture, clinical signs).',
    answer: '• **Pathogenesis:** Cu is a component of ceruloplasmin; deficiency disturbs transferrin metabolism and free iron control.\n• **Hematological Picture:** Macrocytic or microcytic **hypochromic** anemia.\n• **Clinical Signs:** Coat color loss, **\'spectacled appearance\'** around eyes; stringy wool, osteoporosis, spontaneous fractures, and ataxia (**\'sway back\'**).'
  },
  {
    id: 'anem_d_q3',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part A (Deficiency Anemias)',
    source: 'Anemia',
    question: 'Describe Cobalt Deficiency Anemia (pathogenesis, hematological picture, lesions).',
    answer: '• **Pathogenesis:** Cobalt deficiency affects hunger/satiety centers → starvation. Also leads to reduced B12 synthesis by ruminal bacteria.\n• **Hematological Picture:** Macrocytic **hypochromic** anemia.\n• **Postmortem:** **White liver disease** — enlarged, pale, friable liver.\n• **Microscopic:** Hepatic fatty change, bile duct proliferation, Councilman inclusions (apoptotic hepatocytes).'
  },
  {
    id: 'anem_d_q4',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part A (Deficiency Anemias)',
    source: 'Anemia',
    question: 'Describe Renal Failure Anemia (pathogenesis, hematological picture).',
    answer: '• **Pathogenesis:** RBC hemolysis due to toxic creatinine/guanidine accumulation. Loss of renal erythropoietin production and blood loss from the kidney.\n• **Hematological Picture:** Characterized by **echinocytes** and hyper-segmented neutrophil nuclei.'
  },
  {
    id: 'anem_d_q5',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part A (Deficiency Anemias)',
    source: 'Anemia',
    question: 'Describe Hepatic Failure Anemia (pathogenesis, hematological picture).',
    answer: '• **Pathogenesis:** Deficiency in globulin formation and disturbed metabolism of iron, copper, and cobalt.\n• **Hematological Picture:** Presence of **target cells**, stomatocytes, and elliptocytes.'
  },
  {
    id: 'anem_l_q6',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part B (Leukemias)',
    source: 'Anemia',
    question: 'Describe Acute Lymphocytic Leukemia (definition, hematological picture).',
    answer: '• **Definition:** Acute medullary and extramedullary proliferation of **lymphoblasts and prolymphocytes**, infiltrating organs (liver, spleen).\n• **Hematological Picture:** Normocytic normochromic anemia; total leukocyte count 80–100 × 10^9/L; 80–100% lymphocytes.'
  },
  {
    id: 'anem_l_q7',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part B (Leukemias)',
    source: 'Anemia',
    question: 'Describe Chronic Lymphocytic Leukemia (definition, hematological picture).',
    answer: '• **Definition:** Disease with a prodromal period of years; tumor cells are mostly atypical lymphocytes and prolymphocytes.\n• **Hematological Picture:** Severe lymphocytosis (50–600 × 10^9/L); lymphocytes constitute **95–100%** of the differential count.'
  },
  {
    id: 'anem_l_q8',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part B (Leukemias)',
    source: 'Anemia',
    question: 'Describe Acute Myelocytic (Myeloblastic) Leukemia (definition, hematological picture).',
    answer: '• **Definition:** Acute proliferation of **myeloblasts and pro-myelocytes** infiltrating parenchymatous organs.\n• **Hematological Picture:** Variable leukocyte counts, marked **neutropenia**, moderate anemia, and marked **thrombocytopenia**.'
  },
  {
    id: 'anem_l_q9',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part B (Leukemias)',
    source: 'Anemia',
    question: 'Describe Chronic Myelocytic (Granulocytic) Leukemia (definition, hematological picture).',
    answer: '• **Definition:** Chronic proliferation of metamyelocytes and band cells.\n• **Hematological Picture:** Total leukocyte count often exceeds 200 × 10^9/L; myeloblasts are rarer than myelocytes.'
  },
  {
    id: 'anem_l_q10',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part B (Leukemias)',
    source: 'Anemia',
    question: 'Describe Monocytic Leukemia (definition, hematological picture).',
    answer: '• **Definition:** Acute disease in young animals; medullary and extramedullary proliferation of **monoblasts and promonocytes**.\n• **Hematological Picture:** Non-responsive anemia, thrombocytopenia, high terminal leukocyte counts (50–100 × 10^9/L).'
  },
  {
    id: 'anem_l_q11',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part B (Leukemias)',
    source: 'Anemia',
    question: 'Describe Erythremic Myelosis Leukemia (definition, hematological picture).',
    answer: '• **Definition:** Acute proliferation of rubriblasts, prorubricytes, and rubricytes infiltrating organs.\n• **Hematological Picture:** Rubricytes occupy **90% of the differential count**.'
  },
  {
    id: 'anem_l_q12',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part B (Leukemias)',
    source: 'Anemia',
    question: 'Describe Megakaryocytic (Megakaryoblastic) Leukemia (definition, hematological picture).',
    answer: '• **Definition:** Rare; mainly in dogs under 2 years; peripheral megakaryoblast cells.\n• **Hematological Picture:** Pancytopenia, moderate to severe non-responsive anemia; bone marrow shows **90% megakaryoblasts**.'
  },
  {
    id: 'anem_b_q13',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part C (Bovine Leukosis)',
    source: 'Anemia',
    question: 'Describe Bovine Leukosis (etiology, transmission, pathogenesis).',
    answer: '• **Etiology:** Enzootic form is caused by **Bovine Leukosis Virus (BLV)**. Sporadic forms have no known infectious agent.\n• **Transmission:** Horizontal via blood, insects, bats, or surgical tools. Congenital: in 4–8% of cases.\n• **Pathogenesis:** BLV exposure results in: failure of infection, latent carriage, persistent benign lymphocytosis, or malignant lymphosarcoma.'
  },
  {
    id: 'anem_b_q14',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part C (Bovine Leukosis)',
    source: 'Anemia',
    question: 'Describe the pathology parameters of Bovine Leukosis (clinical, postmortem, micro, hematology).',
    answer: '• **Clinical Signs:** Milk drop, enlarged superficial lymph nodes (75–90%), muffled heart sounds, posterior paralysis.\n• **Postmortem:** Discrete or diffuse firm white tumors in the heart (right atrium), abomasum, and spinal cord in adults; kidney and thymus lesions in young animals.\n• **Microscopic:** Tissues (liver, heart, kidney) show heavy infiltration of densely packed lymphoblasts, prolymphocytes, and lymphocytes.\n• **Hematological:** **Persistent lymphocytosis** (in 30% of cases) or malignant leukemia with counts up to 100,000/µL.'
  },
  {
    id: 'anem_b_q15',
    category: 'Deficiency Anemia & Leukemia',
    part: 'Section II - Part C (Bovine Leukosis)',
    source: 'Anemia',
    question: 'What causes false positive and false negative results in Bovine Leukosis diagnostic tests?',
    answer: '• **False Positive:**\n  - Calves up to 7 months (maternal antibodies from colostrum).\n  - Vaccinated cattle.\n• **False Negative:**\n  - Early infection phases.\n  - Poor antibody response.\n  - Testing cows close to parturition.'
  },

  // --- SECTION III: HEMOLYTIC ANEMIA ---
  {
    id: 'anem_h_q1',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'What is the distinction between intravascular and intracellular (extravascular) hemolytic anemia?',
    answer: '• **Intravascular Hemolytic Anemia:** Rupture of erythrocytes **within the vascular system**.\n• **Intracellular (Extravascular) Hemolytic Anemia:** Breakdown of erythrocytes by **macrophages via phagocytosis**, primarily in the spleen and liver.'
  },
  {
    id: 'anem_h_q2',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'What are the causes, hematological picture, and symptoms of hereditary hemolytic anemia?',
    answer: '• **Causes:** Hereditary deficiency of glutathione, pyruvate kinase enzyme, or uroporphyrinogen.\n• **Hematological Picture:** RBCs show poikilocytosis (specifically **stomatocytosis**); bone marrow shows erythroid hyperplasia.\n• **Symptoms:** **Chondrodysplastic dwarfism** in dogs and **congenital porphyria**.'
  },
  {
    id: 'anem_h_q3',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'What is the pathogenesis, symptoms, and hematological picture of iso-immunohemolytic anemia in the foal?',
    answer: '• **Pathogenesis:** Foal inherits red cell antigens from the stallion that the mare lacks. Focal placental hemorrhages sensitize the mare to these antigens. Foal is normal at birth but develops disease after absorbing hemolytic antibodies from **colostrum**.\n• **Symptoms:** Lethargy, reluctance or inability to stand, infrequent suckling, general signs of anemia.\n• **Hematological Picture:** **Spherocytosis**, **agglutination**, and exaggerated rouleaux formation.'
  },
  {
    id: 'anem_h_q4',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'Describe Equine Infectious Anemia (EIA) (pathogenesis, clinical signs, gross and microscopic features).',
    answer: '• **Pathogenesis:** Virus infects macrophages → viremia. Complement-fixing antibodies bind viral components on the RBC surface → macrophage phagocytosis (intracellular hemolysis).\n• **Clinical Signs:** Recurrent fever, anemia, icterus, and **petechial hemorrhages on the ventral surface of the tongue** (pathognomonic).\n• **Gross Picture:** Enlarged hyperplastic spleen, enlarged liver, enlarged lymph nodes with hemosiderosis.\n• **Microscopic Picture:** Interstitial myocarditis, hemosiderin in alveolar macrophages, peri-acinar liver necrosis, and membranoproliferative glomerulonephritis.'
  },
  {
    id: 'anem_h_q5',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'Describe Clostridial hemolytic anemia (pathogenesis, clinical signs, gross/microscopic picture).',
    answer: '• **Pathogenesis:** Ingested spores reach the liver and remain inactive until liver damage (e.g., Fascioliasis) creates anaerobic conditions. Bacteria release **Beta toxin** (lethal/necrotizing) and **Lecithinase** (hemolytic) → intravascular hemolysis and toxemia.\n• **Clinical Signs:** Sudden death in well-nourished animals, fever, jaundice, **hemoglobinuria (coffee-colored urine)**.\n• **Gross/Microscopic Picture:**\n  - **Liver:** Anemic infarctions and bacterial bacilli in necrotic foci.\n  - **Kidneys:** Spotted brown or reddish appearance.'
  },
  {
    id: 'anem_h_q6',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'Describe Leptospirosis (pathogenesis, clinical signs, gross/microscopic picture).',
    answer: '• **Pathogenesis:** Organisms penetrate the mucosa → liver → septicemia. Hemolysis via **hemolysins** (intravascular) and **immune-mediated mechanisms** (extravascular).\n• **Clinical Signs:** Fever, icterus, hemoglobinuria. In adults: characteristic **bloody milk** and abortion.\n• **Gross Picture:** **White spotted kidney** (focal interstitial nephritis), pale and edematous lungs, enlarged friable liver.\n• **Microscopic Picture:** Organisms visible in renal tubules via **silver stain**, hydropic degeneration and bile pigment casts in kidneys.'
  },
  {
    id: 'anem_h_q7',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'What is the hematological picture of Ehrlichiosis?',
    answer: '• **Morulae** (clusters of coccoid organisms) within cytoplasmic vacuoles of neutrophils or monocytes.\n• **Leukopenia, anemia, thrombocytopenia**, and hypercellular bone marrow.'
  },
  {
    id: 'anem_h_q8',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'What is the pathogenesis of Anaplasmosis / Hemobartonellosis?',
    answer: '• Microorganism is introduced via tick or fly bites → parasitizes red cells.\n• Parasitized RBCs stimulate serum **opsonins (antibodies)** → sensitize cells for phagocytosis by the monocyte-macrophage system in spleen, lymph nodes, and bone marrow (**intracellular hemolysis**).'
  },
  {
    id: 'anem_h_q9',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'Describe Cowdria ruminantium (Heartwater Disease) (pathogenesis, gross is, micro is).',
    answer: '• **Pathogenesis:** Introduced by tick bite → organism multiplies in reticuloendothelial cells → infects **vascular endothelium** → damage → **generalized hemorrhagic edema**.\n• **Gross Appearance:** **Hydropericardium** (sero-hemorrhagic fluid in pericardium), hydrothorax, petechial hemorrhages over cerebellum.\n• **Microscopic Appearance:** Basophilic clusters of coccoid organisms within endothelial cytoplasmic vacuoles (**Giemsa stain**), microcavitation in the brain.'
  },
  {
    id: 'anem_h_q10',
    category: 'Hemolytic Anemia',
    part: 'Section III',
    source: 'Anemia',
    question: 'Describe Babesiosis (pathogenesis, gross and microscopic appearances).',
    answer: '• **Pathogenesis:**\n  - *Babesia* multiply in RBCs → mechanical rupture (**intravascular hemolysis**).\n  - Parasite secretes enzymes that alter fibrinogen → **intravascular agglutination** → capillary plugging and circulatory shock.\n• **Gross Appearance:** **Splenomegaly** (swollen, soft, dark spleen), hemoglobinuric nephrosis, distended gall bladder with dark granular bile.\n• **Microscopic Appearance:** Hypoxic peri-acinar liver necrosis, bile-plugged canaliculi, and **clogged capillaries in the brain** (cerebral babesiosis).'
  },

  // --- PART I: CYTOLOGY ---
  {
    id: 'cyto_q1',
    category: 'Cytology',
    part: 'Part I (Cytology)',
    source: 'Cytology',
    question: 'What are the three primary categories of cytology based on sample collection?',
    answer: '1. **Exfoliative cytology:** Cells shed naturally from a surface.\n2. **Interventional cytology:** A pathologist pierces a concerned organ to collect a sample (e.g. FNAC, Sediment).\n3. **Imprint cytology:** A tissue biopsy is pressed onto a glass slide, leaving a cellular imprint for staining and study.'
  },
  {
    id: 'cyto_q2',
    category: 'Cytology',
    part: 'Part I (Cytology)',
    source: 'Cytology',
    question: 'What is the difference between Spontaneous and Mechanical Exfoliation?',
    answer: '• **Spontaneous Exfoliation:**\n  - *Definition:* Cells shed naturally into body fluids.\n  - *Examples:* Pleural/peritoneal fluids, sputum, urine, orifice discharges.\n• **Mechanical Exfoliation:**\n  - *Definition:* Cells manually scraped or brushed off.\n  - *Examples:* Cervical scraping, endoscopy, buccal scraping, bronchial brushing.'
  },
  {
    id: 'cyto_q3',
    category: 'Cytology',
    part: 'Part I (Cytology)',
    source: 'Cytology',
    question: 'What are the types of Interventional Cytology in detail?',
    answer: 'Interventional cytology involves actively piercing the body for sample collection:\n\n• **Fine-Needle Aspiration Cytology (FNAC):**\n  - Uses a thin needle to collect cells from masses or lesions.\n  - Can be performed with or without suction (aspiration).\n  - Commonly used for breast, thyroid, lymph nodes, and liver lesions.\n• **Sediment Cytology:**\n  - Sample is collected from the sediment of fixatives used during histopathological processing.\n  - Sediment consists of cells shed by tissue samples during processing.'
  },
  {
    id: 'cyto_q4',
    category: 'Cytology',
    part: 'Part I (Cytology)',
    source: 'Cytology',
    question: 'What is the difference between Transudates, Modified Transudates, and Exudates?',
    answer: 'Effusions are classified by protein concentration and nucleated cell count:\n\n• **Transudate:**\n  - *Cause:* ↓ plasma osmotic pressure or lymphatic obstruction.\n  - *Appearance:* Clear, colorless.\n  - *Protein:* < 2.5 g/dl.\n  - *Cells:* Low macrophages, non-degenerate neutrophils, mesothelial cells.\n• **Modified Transudate:**\n  - *Cause:* ↑ hydrostatic pressure, ↑ capillary permeability, organ disease.\n  - *Appearance:* Variable, slightly cloudy.\n  - *Protein:* Moderate.\n  - *Cells:* Non-degenerate neutrophils, macrophages, reactive mesothelial cells, RBCs, small lymphocytes.\n• **Exudate:**\n  - *Cause:* Inflammation-induced vascular permeability.\n  - *Appearance:* Turbid.\n  - *Protein:* High.\n  - *Cells:* High neutrophils (degenerate if septic), macrophages, plasma cells, lymphocytes.'
  },
  {
    id: 'cyto_q5',
    category: 'Cytology',
    part: 'Part I (Cytology)',
    source: 'Cytology',
    question: 'What are the morphological characteristics of Mesothelial Cells?',
    answer: 'Mesothelial cells line the serous membranes (pleura, pericardium, and peritoneum):\n\n• **Morphology:** Round or oval single nucleus with safe/fine chromatin pattern.\n• **Nuclei:** Binucleated and multinucleated cells (mitotic figures) are common.\n• **Cytoplasm:** Dark blue cytoplasm frequently outlined by a **red-pink fringe**.\n• **Arrangement:** Appear singly or in clusters.\n• **Reactive state:** During inflammation → hypertrophy and hyperplasia → **Activated Mesothelial Cells** → become phagocytic and resemble macrophages.'
  },
  {
    id: 'cyto_q6',
    category: 'Cytology',
    part: 'Part I (Cytology)',
    source: 'Cytology',
    question: 'Enumerate the causes and cytological findings of different clinical effusions.',
    answer: '• **Hemorrhagic Effusions:** Caused by trauma or diseases (e.g. *Cowdria ruminantium*). Cytology shows RBCs and macrophages. Within hours, macrophages display **erythrophagia** (ingested RBCs); in older cases, they contain **hemosiderin**.\n• **Chylous Effusions:** Caused by trauma/obstruction of the thoracic duct, cardiac disease, or neoplasms. Milky white to pink fluid containing small lymphocytes, neutrophils, and macrophages.\n• **Neoplasia Effusion:** Caused by tumors in the thorax/abdomen. Diagnostically difficult (tumor cells might not detach). Exceptions are lymphoma, mast cell tumors, and certain carcinomas.\n• **Uroperitoneum:** Caused by bladder, ureter, or urethra rupture. Yellow fluid containing non-degenerate neutrophils, macrophages, and reactive mesothelial cells.\n• **Bile Peritonitis:** Caused by ruptured gallbladder or bile duct. Yellow-green effusion. Macrophages contain **blue-green bile pigment**. Bilirubin is higher than in blood.\n• **Egg Yolk Peritonitis (Birds):** Ruptured ova in older highly productive hens. Contains heterophils and macrophages on an eosinophilic, granular background.'
  },
  {
    id: 'cyto_q7',
    category: 'Cytology',
    part: 'Part I (Cytology)',
    source: 'Cytology',
    question: 'Describe the cytology of the different stages of the Estrus Cycle.',
    answer: 'Vaginal cytology identifies epithelial cell types (basal, parabasal, intermediate, superficial) to find optimal breeding times:\n\n• **Proestrus:** All epithelial types (notably parabasal) are present. RBCs, neutrophils, and bacteria are present.\n• **Estrus:** **≥ 40% keratinized (superficial)** cells. Neutrophils are **absent**; bacteria may heavily coat cells.\n• **Diestrus:** Intermediate and parabasal cells (~50%); superficial cells decrease. Neutrophils increase.\n• **Anestrus:** Parabasal and intermediate cells predominate. Neutrophils and bacteria may be present.'
  },

  // --- PART II: LIVER & KIDNEY FUNCTION TEST ---
  {
    id: 'org_f_q1',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'What is the distinction between Leakage Enzymes and Cholestasis Enzymes with examples?',
    answer: '• **Leakage Enzymes:** Present inside cells in high quantities. Released into the bloodstream via **injurious mechanisms (cell damage)** without requiring increased synthesis. Examples: **ALT, AST, LDH, SDH, GLDH, OCT**.\n• **Cholestasis Enzymes:** Elevation highlights **damage to bile ducts**, which slows or stalls bile flow. Examples: **ALP, GGT**.'
  },
  {
    id: 'org_f_q2',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which clinical cases does ALT (Alanine Aminotransferase) activity increase?',
    answer: '• Alterations in the lipid membrane of hepatocytes.\n• Liver injury, inflammation, or infection.\n• Pregnancy (second trimester), physical trauma, cardiac disease.\n• Chronic use of certain drugs.'
  },
  {
    id: 'org_f_q3',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which clinical cases does AST (Aspartate Aminotransferase) activity increase?',
    answer: '• Liver cell damage (similar to ALT).\n• Diseases affecting the **musculoskeletal system** (trauma, seizures, or muscle damage).\n• Immune-mediated hemolytic anemia.'
  },
  {
    id: 'org_f_q4',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which clinical cases does ALP (Alkaline Phosphatase) activity increase?',
    answer: '• Liver and gallbladder disease.\n• **Hyperadrenocorticism (excess cortisol)** or oral corticosteroid administration.\n• Long-term medications (e.g., prednisone, phenobarbital).\n• Bone growth, bone cancer, or third trimester of pregnancy.'
  },
  {
    id: 'org_f_q5',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which clinical cases does GGT (Gamma-Glutamyl Transferase) activity increase?',
    answer: '• Decreased bile flow (**cholestasis**) or gallbladder obstruction.\n• Diabetes mellitus, acute pancreatitis, myocardial infarction.\n• Anorexia nervosa, hyperthyroidism, and obesity.'
  },
  {
    id: 'org_f_q6',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'Enumerate the major hepatic chemistry parameters.',
    answer: '1. **Blood Urea Nitrogen (BUN)**\n2. **Albumin**\n3. **Bilirubin**\n4. **Bile Acids**'
  },
  {
    id: 'org_f_q7',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which cases does Blood Urea Nitrogen (BUN) increase?',
    answer: '• **High protein meals** (transient rise).\n• Hepatic damage.\n• **Decrease in glomerular filtration** (reduced renal function).\n• Intestinal bleeding.'
  },
  {
    id: 'org_f_q8',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which clinical cases does Albumin decrease (Hypoalbuminemia)?',
    answer: '• When **at least 75% of normal liver function** is lost.\n• **Glomerular damage** (typically seen alongside significant urinary protein/albuminuria).'
  },
  {
    id: 'org_f_q9',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which cases does Bilirubin increase based on its chemical type (Unconjugated vs. Conjugated)?',
    answer: '• **Unconjugated Bilirubin rise:** Hemolytic anemia.\n• **Conjugated Bilirubin rise:** Intrahepatic cholestasis or extra-hepatic bile duct obstruction.\n• **Elevation in both:** Hepatocellular disease.'
  },
  {
    id: 'org_f_q10',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which clinical cases does Bile Acids activity increase?',
    answer: '• Not properly reabsorbed due to **liver disease**.\n• **Biliary obstruction** (causing a continuous increase).\n• Impaired hepatocellular function.'
  },
  {
    id: 'org_f_q11',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'What are the major blood chemistry markers indicating renal diseases?',
    answer: '• **BUN** (Blood Urea Nitrogen)\n• **Albumin**\n• **Creatinine**\n• **Phosphorus**\n• **Potassium**'
  },
  {
    id: 'org_f_q12',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'In which clinical cases does blood Phosphorus increase (Hyperphosphatemia)?',
    answer: '• **Renal damage** (associated directly with elevations in BUN and Creatinine).\n• Diseases affecting the balance of **calcium and phosphorus**.'
  },
  {
    id: 'org_f_q13',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'Discuss the causes of blood Potassium increases (Hyperkalemia) and decreases (Hypokalemia).',
    answer: '• **↑ Increased (Hyperkalemia):**\n  - Decrease in glomerular filtration.\n  - Associated with urinary obstruction or Hypoadrenocorticism.\n• **↓ Decreased (Hypokalemia):**\n  - Chronic renal diseases (increased potassium excretion).\n  - Fluid losses through severe vomiting or diarrhea.'
  },
  {
    id: 'org_f_q14',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'What is the diagnostic interpretation of physical parameters in urinalysis (Color, Foam, Transp., Odor)?',
    answer: '• **Color:**\n  - *Normal:* Straw yellow.\n  - *Abnormal:* Pale yellow (Polyuria); strong yellow (Oliguria); Red/Brown (Hematuria/Hemoglobinuria).\n• **Foam:**\n  - *Normal:* White, quickly disappears.\n  - *Abnormal:* Abundant, slow disappearance (Proteinuria); Green/Yellow (Bile salts).\n• **Transparency:**\n  - *Normal:* Clear.\n  - *Abnormal:* Cloudy (due to Crystals or species-specific normal cloudy urine of horses or rabbits).\n• **Odor:**\n  - *Normal:* Slight ammonia.\n  - *Abnormal:* Strong ammonia (Bacteria); Sweet/Fruity (Ketones/Diabetes).'
  },
  {
    id: 'org_f_q15',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'What is the clinical interpretation of urine Volume and Urine Specific Gravity (USG)?',
    answer: '• **Polyuria:** Increased urine output (seen in Nephritis, diabetes mellitus).\n• **Oliguria:** Decreased urine output (seen in Dehydration, acute nephritis).\n• **Anuria:** Almost no urine output (seen in Obstruction, toxic nephrosis).\n• **↑ USG:** Elevated specific gravity (indicates Dehydration or shock).\n• **↓ USG:** Decreased specific gravity (indicates Excessive fluid intake or Hyperadrenocorticism).'
  },
  {
    id: 'org_f_q16',
    category: 'Liver & Kidney Function Test',
    part: 'Part II (Liver & Kidney)',
    source: 'Cytology',
    question: 'What is the clinical interpretation of chemical parameters in urine (pH, Bilirubin, Glucose, Ketones, Blood, Protein)?',
    answer: '• **pH:** Species-dependent. Acidic → Carnivores/Acidosis. Alkaline → Herbivores/Cystitis/Alkalosis.\n• **Bilirubin:** Low levels normal in dogs; negative in cats. Positive → Hepatic damage or hemolytic disease.\n• **Glucose:** Normally negative. Positive → Excitement (cats), diabetes mellitus, or hyperthyroidism.\n• **Ketones:** Normally negative. Positive → Starvation, diabetes, ketosis, or high-fat diets.\n• **Blood:** Normally negative. Hematuria → Inflammation/Trauma. Hemoglobinuria → Hemolysis. Myoglobinuria → Muscle damage/Azoturia.\n• **Protein:** Normally small amounts. Significant proteinuria → Renal disease, heart failure, or stress.'
  }
];
